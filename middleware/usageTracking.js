// middleware/usageTracking.js
import Gym from '../models/Gym.js';

const trackUsage = async (req, res, next) => {
   try {
      // Only track for gym-specific routes
      if (req.gymId) {
         const gym = await Gym.findById(req.gymId);

         if (gym) {
            // Update last usage timestamp
            gym.usage.lastUpdated = new Date();
            await gym.save();
         }
      }

      next();
   } catch (error) {
      console.error('Error tracking usage:', error);
      next();
   }
};

export default trackUsage;