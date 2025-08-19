// middleware/rateLimiter.js
import { RateLimiterMemory, RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';

// For production, use MongoDB store
const mongoConn = mongoose.connection;

const otpLimiter = process.env.NODE_ENV === 'production'
   ? new RateLimiterMongo({
      storeClient: mongoConn,
      points: 5, // 5 OTP requests
      duration: 15 * 60, // per 15 minutes
      keyPrefix: 'otp_limiter'
   })
   : new RateLimiterMemory({
      points: 5,
      duration: 15 * 60
   });

const loginLimiter = process.env.NODE_ENV === 'production'
   ? new RateLimiterMongo({
      storeClient: mongoConn,
      points: 10, // 10 login attempts
      duration: 60 * 60, // per hour
      keyPrefix: 'login_limiter'
   })
   : new RateLimiterMemory({
      points: 10,
      duration: 60 * 60
   });

export const rateLimitOTP = async (req) => {
   const ip = req.headers['x-forwarded-for'] || req.ip || '127.0.0.1';
   try {
      await otpLimiter.consume(ip);
      return null;
   } catch (err) {
      return NextResponse.json({
         success: false,
         message: "Too many OTP requests",
         error: "Please wait 15 minutes before requesting another OTP"
      }, { status: 429 });
   }
};

export const rateLimitLogin = async (req) => {
   const ip = req.headers['x-forwarded-for'] || req.ip || '127.0.0.1';
   try {
      await loginLimiter.consume(ip);
      return null;
   } catch (err) {
      return NextResponse.json({
         success: false,
         message: "Too many login attempts",
         error: "Please wait 1 hour before trying again"
      }, { status: 429 });
   }
};