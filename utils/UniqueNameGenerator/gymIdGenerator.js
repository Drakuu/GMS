// utils/gymIdGenerator.js
import Gym from '@/models/gym.model';

/**
 * Generates a unique gym identifier based on gym name.
 * Format: [Initials]G-[Random4Digits]
 * Examples:
 * - "Iron Forge Gym"  -> IFG-4821
 * - "FitLab"          -> FLG-9350
 */
export const generateGymId = async (gymName) => {
   try {
      const nameParts = gymName.trim().split(/\s+/);
      let initials = '';

      if (nameParts.length === 1) {
         initials = nameParts[0].substring(0, 2).toUpperCase();
      } else {
         // first letter of first word + first letter of last word
         initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
      }

      const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
      const baseId = `${initials}G-${randomDigits}`;

      const existing = await Gym.findOne({ gym_identifier: baseId });
      if (existing) {
         return await generateGymIdWithRetry(gymName, 5);
      }
      return baseId;
   } catch (err) {
      console.error('Error generating gym ID:', err);
      return `GYM-${Math.floor(1000 + Math.random() * 9000)}`;
   }
};

const generateGymIdWithRetry = async (gymName, retries) => {
   if (retries <= 0) {
      const ts = Date.now().toString().slice(-6);
      return `GID-${ts}`;
   }
   const nameParts = gymName.trim().split(/\s+/);
   let initials = '';
   if (nameParts.length === 1) {
      initials = nameParts[0].substring(0, 2).toUpperCase();
   } else {
      initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
   }
   const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
   const candidate = `${initials}G-${randomDigits}`;

   const existing = await Gym.findOne({ gym_identifier: candidate });
   if (!existing) return candidate;
   return generateGymIdWithRetry(gymName, retries - 1);
};

/** Regenerate if the gym name is changed (optional utility) */
export const updateGymId = async (gymId, newGymName) => {
   const gym = await Gym.findById(gymId);
   if (!gym) throw new Error('Gym not found');
   const newId = await generateGymId(newGymName);
   gym.gym_identifier = newId;
   await gym.save();
   return newId;
};

/** Migration helper */
export const generateGymIdForExistingGym = async (gymId) => {
   const gym = await Gym.findById(gymId);
   if (!gym) throw new Error('Gym not found');
   if (!gym.name) throw new Error('Gym name is required');
   const newId = await generateGymId(gym.name);
   gym.gym_identifier = newId;
   await gym.save();
   return newId;
};
