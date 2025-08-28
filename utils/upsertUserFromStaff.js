// utils/upsertUserFromStaff.js
import User from '@/models/user.model';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { generateUserId } from '@/utils/userIdGenerator';
import { httpError } from '@/utils/apiHelpers';

function pickUserFieldKey(model, canonical, legacy) {
   if (model.schema.path(legacy)) return legacy;
   if (model.schema.path(canonical)) return canonical;
   return legacy;
}

/**
 * Upserts a user to the given role, ensuring:
 * - new users MUST provide password (it will be hashed)
 * - user is marked verified
 * - user is attached to gym_id
 * - login_attempts initialized to avoid NaN later
 */
export async function upsertUserForStaff(inputUser, role, gymId) {
   if (!inputUser) throw httpError(400, 'user payload is required');

   const incoming = {
      name: (inputUser.user_name ?? inputUser.name ?? '').trim(),
      email: (inputUser.user_email ?? inputUser.email ?? '')?.trim().toLowerCase(),
      phone: (inputUser.user_phone ?? inputUser.phone ?? '')?.trim(),
      password: (inputUser.user_password ?? inputUser.password ?? ''),
   };

   if (!incoming.name) throw httpError(400, 'user.user_name is required');
   if (!incoming.email && !incoming.phone) throw httpError(400, 'user.email or user.phone is required');

   const NAME_KEY = pickUserFieldKey(User, 'name', 'user_name');
   const EMAIL_KEY = pickUserFieldKey(User, 'email', 'user_email');
   const PHONE_KEY = pickUserFieldKey(User, 'phone', 'user_phone');
   const PASSWORD_KEY = pickUserFieldKey(User, 'password', 'user_password');
   const ROLE_KEY = pickUserFieldKey(User, 'role', 'user_role');
   const IDENT_KEY = pickUserFieldKey(User, 'identifier', 'user_identifier');

   // Prefer email; fallback phone
   const query = incoming.email ? { [EMAIL_KEY]: incoming.email } : { [PHONE_KEY]: incoming.phone };
   let user = await User.findOne(query);

   // Role conflict?
   if (user && user[ROLE_KEY] && user[ROLE_KEY] !== role) {
      throw httpError(409, `User already exists with role ${user[ROLE_KEY]}`);
   }

   if (!user) {
      // For creation, enforce password
      const rawPass = String(incoming.password || '').trim();
      if (!rawPass) throw httpError(400, 'user.user_password is required');

      const hash = await bcrypt.hash(rawPass, 10);

      user = new User({
         [NAME_KEY]: incoming.name,
         [EMAIL_KEY]: incoming.email || undefined,
         [PHONE_KEY]: incoming.phone || undefined,
         [ROLE_KEY]: role,
         [PASSWORD_KEY]: hash,
         gym_id: gymId,            // link to gym
         is_verified: true,        // mark verified
         login_attempts: { count: 0, last_attempt: null }, // avoid NaN later
      });

      user[IDENT_KEY] = await generateUserId(user[NAME_KEY], role);
      await user.save();
   } else {
      let changed = false;

      if (incoming.name && user[NAME_KEY] !== incoming.name) {
         user[NAME_KEY] = incoming.name;
         user[IDENT_KEY] = await generateUserId(user[NAME_KEY], role);
         changed = true;
      }
      if (incoming.email && user[EMAIL_KEY] !== incoming.email) { user[EMAIL_KEY] = incoming.email; changed = true; }
      if (incoming.phone && user[PHONE_KEY] !== incoming.phone) { user[PHONE_KEY] = incoming.phone; changed = true; }
      if (!user[ROLE_KEY]) { user[ROLE_KEY] = role; changed = true; }

      // Hash if password provided
      if (incoming.password && String(incoming.password).trim()) {
         const hash = await bcrypt.hash(String(incoming.password).trim(), 10);
         user[PASSWORD_KEY] = hash;
         changed = true;
      }

      // ensure verified and gym linked
      if (!user.is_verified) { user.is_verified = true; changed = true; }
      if (gymId && String(user.gym_id || '') !== String(gymId)) { user.gym_id = gymId; changed = true; }

      // init login_attempts if missing
      if (!user.login_attempts || typeof user.login_attempts.count !== 'number') {
         user.login_attempts = { count: 0, last_attempt: null };
         changed = true;
      }

      if (changed) await user.save();
   }

   return { userId: user._id, user_identifier: user[IDENT_KEY] };
}
