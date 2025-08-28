// utils/userIdGenerator.js
import User from '@/models/user.model';

/**
 * Generates a unique user identifier based on name and role
 * Format: [Initials][RoleInitial][Random4Digits]
 * Examples: 
 * - Fahad Rashid (Admin) → FRA-4216
 * - Ali (Member) → ALM-5832 (if single name, use first 2 letters)
 * - John Doe (Trainer) → JDT-1234
 */
export const generateUserId = async (userName, userRole) => {
   try {
      // Get initials from name
      const nameParts = userName.trim().split(/\s+/);
      let initials = '';

      if (nameParts.length === 1) {
         // Single name: use first 2 characters, uppercase
         initials = nameParts[0].substring(0, 2).toUpperCase();
      } else {
         // Multiple names: use first letter of first name and first letter of last name
         initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
      }

      // Get role initial (first letter of role)
      const roleInitial = userRole.substring(0, 1).toUpperCase();

      // Generate random 4-digit number
      const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();

      // Create the base ID
      const baseId = `${initials}${roleInitial}-${randomDigits}`;

      // Check if this ID already exists in the database
      const existingUser = await User.findOne({ user_identifier: baseId });

      if (existingUser) {
         // If ID exists, generate a new one with different random digits
         return await generateUserIdWithRetry(userName, userRole, 5); // Retry 5 times
      }

      return baseId;
   } catch (error) {
      console.error('Error generating user ID:', error);
      // Fallback: generate a completely random ID
      const randomFallback = `USR-${Math.floor(1000 + Math.random() * 9000)}`;
      return randomFallback;
   }
};

/**
 * Recursive function to generate user ID with retries
 */
const generateUserIdWithRetry = async (userName, userRole, retries) => {
   if (retries <= 0) {
      // If all retries fail, use timestamp-based ID
      const timestamp = Date.now().toString().slice(-6);
      return `UID-${timestamp}`;
   }

   const nameParts = userName.trim().split(/\s+/);
   let initials = '';

   if (nameParts.length === 1) {
      initials = nameParts[0].substring(0, 2).toUpperCase();
   } else {
      initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
   }

   const roleInitial = userRole.substring(0, 1).toUpperCase();
   const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
   const newId = `${initials}${roleInitial}-${randomDigits}`;

   // Check if this new ID exists
   const existingUser = await User.findOne({ user_identifier: newId });

   if (!existingUser) {
      return newId;
   }

   // If still exists, try again with one less retry
   return generateUserIdWithRetry(userName, userRole, retries - 1);
};

/**
 * Updates user identifier when user name changes
 */
export const updateUserId = async (userId, newUserName) => {
   try {
      const user = await User.findById(userId);
      if (!user) {
         throw new Error('User not found');
      }

      // Generate new ID based on new name but same role
      const newUserIdentifier = await generateUserId(newUserName, user.user_role);

      // Update the user
      user.user_identifier = newUserIdentifier;
      await user.save();

      return newUserIdentifier;
   } catch (error) {
      console.error('Error updating user ID:', error);
      throw error;
   }
};

/**
 * Generates user ID from existing user (for migration purposes)
 */
export const generateUserIdForExistingUser = async (userId) => {
   try {
      const user = await User.findById(userId);
      if (!user) {
         throw new Error('User not found');
      }

      if (!user.user_name) {
         throw new Error('User name is required');
      }

      const newUserIdentifier = await generateUserId(user.user_name, user.user_role);

      user.user_identifier = newUserIdentifier;
      await user.save();

      return newUserIdentifier;
   } catch (error) {
      console.error('Error generating ID for existing user:', error);
      throw error;
   }
};