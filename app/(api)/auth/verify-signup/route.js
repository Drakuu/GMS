// app/api/auth/verify-signup/route.js
import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { generateToken } from '@/utils/authControllerUtils';
import { apiResponse } from '@/utils/responseHelper';

export async function POST(req) {
  try {
    await connectDB();
    const { user_email, user_otp } = await req.json();
    const ip = req.headers['x-forwarded-for'] || req.ip || '127.0.0.1';

    console.log('🔐 Signup OTP verification attempt:', { user_email, user_otp, ip });

    // Standardized validation response
    if (!user_email || !user_otp) {
      return apiResponse.error(
        "Validation failed",
        {
          ...(!user_email && { user_email: "Email is required" }),
          ...(!user_otp && { user_otp: "OTP is required" })
        },
        400
      );
    }

    // Find user with case-insensitive email match
    const user = await User.findOne({
      user_email: { $regex: new RegExp(`^${user_email}$`, 'i') }
    }).select('+user_otp +user_otp_expiry +otp_attempts +is_locked +lock_until');

    if (!user) {
      return apiResponse.error(
        "Authentication failed",
        { error: "User not found" },
        404
      );
    }

    // Check if account is locked
    if (user.is_locked && user.lock_until > new Date()) {
      const remainingTime = Math.ceil((user.lock_until - new Date()) / 1000 / 60);
      return apiResponse.error(
        "Account temporarily locked",
        {
          error: `Too many failed attempts. Try again in ${remainingTime} minutes`,
          lock_until: user.lock_until
        },
        403
      );
    }

    // Initialize otp_attempts if not exists
    if (!user.otp_attempts) {
      user.otp_attempts = { count: 0, last_attempt: null };
    }

    // OTP verification
    if (String(user.user_otp) !== String(user_otp)) {
      // Safely increment failed attempts
      user.otp_attempts.count = (user.otp_attempts.count || 0) + 1;
      user.otp_attempts.last_attempt = new Date();

      // Lock account after 3 failed attempts for 15 minutes
      if (user.otp_attempts.count >= 3) {
        user.is_locked = true;
        user.lock_until = new Date(Date.now() + 15 * 60 * 1000);
      }

      await user.save();

      // Log failed attempt
      user.audit_logs.push({
        action: "failed_otp_attempt",
        ip
      });
      await user.save();

      return apiResponse.error(
        "Authentication failed",
        {
          error: "Invalid OTP",
          attempts_remaining: 3 - user.otp_attempts.count
        },
        401
      );
    }

    // OTP expiry check
    if (new Date(user.user_otp_expiry) < new Date()) {
      return apiResponse.error(
        "Authentication failed",
        { error: "OTP has expired" },
        401
      );
    }

    // Reset OTP attempts on successful verification
    user.otp_attempts = { count: 0, last_attempt: null };
    user.user_otp = undefined;
    user.user_otp_expiry = undefined;
    user.is_verified = true;
    user.is_locked = false;
    user.lock_until = null;
    user.last_login = new Date();

    // Log successful verification
    user.audit_logs.push({
      action: "successful_verification",
      ip
    });

    await user.save();

    // Generate token
    const token = generateToken(user);

    // Security logging
    console.log('✅ Successful signup verification for user:', user_email);
    console.log('📤 Sending response with user:', {
      id: user._id,
      user_email: user.user_email,
      user_name: user.user_name,
      user_role: user.user_role
    });

    return apiResponse.success(
      {
        token,
        user: {
          id: user._id,
          user_email: user.user_email,
          user_name: user.user_name,
          user_role: user.user_role
        }
      },
      "Account verified successfully"
    );

  } catch (err) {
    console.error("Signup verification error:", err);
    return apiResponse.serverError(err.message);
  }
}