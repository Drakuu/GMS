// middleware/securityLogger.js
export const securityLogger = async (req, user, action, metadata = {}) => {
   const ip = req.headers['x-forwarded-for'] || req.ip || '127.0.0.1';
   const userAgent = req.headers['user-agent'] || 'unknown';

   const logEntry = {
      action,
      ip,
      user_agent: userAgent,
      metadata,
      timestamp: new Date()
   };

   try {
      // Log to user's audit trail if user exists
      if (user) {
         if (!user.audit_logs) user.audit_logs = [];
         user.audit_logs.push(logEntry);
         await user.save();
      }

      // Log to external service or console
      console.log(`[SECURITY] ${new Date().toISOString()} - ${action} - IP: ${ip} - User: ${user?._id || 'unknown'}`);

      // You can add external logging services here (Sentry, Loggly, etc.)

   } catch (error) {
      console.error('Security logging failed:', error);
   }
};