// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { generateOTP, createTempToken } from '@/utils/authControllerUtils';
import { sendOTPEmail } from '@/services/emailService';
import { rateLimitLogin } from '@/middleware/rateLimiter';
import { securityLogger } from '@/middleware/securityLogger';
import { apiResponse } from '@/utils/responseHelper';

export async function POST(req) {
  try {
    await connectDB();

    // Apply rate limiting
    // const rateLimitResponse = await rateLimitLogin(req);
    // if (rateLimitResponse) return rateLimitResponse;

    const { user_email: rawEmail, user_password: rawPassword } = await req.json();
    const user_email = (rawEmail || '').trim().toLowerCase();
    const user_password = String(rawPassword || '').trim();
   const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // Validation
    if (!user_email || !user_password) {
      return apiResponse.error(
        "Validation failed",
        {
          ...(!user_email && { user_email: "Email is required" }),
          ...(!user_password && { user_password: "Password is required" })
        },
        400
      );
    }

    // Find user with sensitive fields
    const user = await User.findOne({ user_email })
    .select('+user_password +login_attempts +is_locked +lock_until');

    if (!user) {
      await securityLogger(req, null, 'failed_login_attempt', { user_email });
      return apiResponse.error(
        "Authentication failed",
        { error: "Invalid credentials" },
        401
      );
    }

    // Ensure login_attempts exists to avoid NaN increments
     if (!user.login_attempts || typeof user.login_attempts.count !== 'number') {
         user.login_attempts = { count: 0, last_attempt: null };
       }

    // Check account lock
    if (user.is_locked && user.lock_until > new Date()) {
      const remainingMinutes = Math.ceil((user.lock_until - new Date()) / (1000 * 60));
      return apiResponse.error(
        "Account temporarily locked",
        {
          error: `Too many failed attempts. Try again in ${remainingMinutes} minutes`,
          lock_until: user.lock_until
        },
        403
      );
    }

    // Verify password
    const match = await bcrypt.compare(user_password, user.user_password);
    if (!match) {
      // Track failed attempts
      user.login_attempts.count = (user.login_attempts.count || 0) + 1;;
      user.login_attempts.last_attempt = new Date();

      // Lock account after 5 failed attempts for 1 hour
      if (user.login_attempts.count >= 5) {
        user.is_locked = true;
        user.lock_until = new Date(Date.now() + 60 * 60 * 1000);
      }

      user.login_history.push({
        ip_address: ip,
        user_agent: req.headers['user-agent'],
        status: 'failed'
      });

      await user.save();
      await securityLogger(req, user, 'failed_login_attempt', { attempts: user.login_attempts.count });

      return apiResponse.error(
        "Authentication failed",
        {
          error: "Invalid credentials",
          attempts_remaining: Math.max(0, 5 - user.login_attempts.count)
        },
        401
      );
    }

    // Reset login attempts on success
    user.login_attempts.count = 0;
    user.login_attempts.last_attempt = new Date();
    await user.save();

    // Generate OTP
    const otp = generateOTP();
    const expiryTime = new Date(Date.now() + 7 * 60 * 1000);

    user.user_otp = otp;
    user.user_otp_expiry = expiryTime;
    await user.save();

    // Create temp token
    const tempToken = await createTempToken(user.user_email);

    // Send OTP email
    const emailResult = await sendOTPEmail(
      user.user_email,
      user.user_name || 'User',
      otp
    );

    if (!emailResult.success) {
      // Don't rollback immediately - give user a chance to request again
      console.error('Email sending failed:', emailResult.error);

      // If it's a connection error, suggest retry
      if (emailResult.error.includes('ETIMEDOUT') || emailResult.error.includes('ECONNREFUSED')) {
        return apiResponse.error(
          "Email service temporarily unavailable",
          {
            error: "Could not connect to email service. Please try again in a moment.",
            retry_suggested: true
          },
          503
        );
      }

      return apiResponse.error(
        "Email service unavailable",
        {
          error: emailResult.error || "Failed to send OTP. Please try again later.",
          debug: process.env.NODE_ENV === 'development' ? emailResult : undefined
        },
        503
      );
    }

    // Log OTP generation
    await securityLogger(req, user, 'otp_generated');

    // Prepare response
    const response = apiResponse.success(
      {
        message: "OTP sent to email",
        user_email: user.user_email,
        user_otp: process.env.NODE_ENV === 'development' ? otp : undefined,
        user_otp_expiry: expiryTime
      }
    );

    // Set temp cookie - FIXED version
    response.cookies.set('otp-verification-token', tempToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax'
      maxAge: 7 * 60, // 7 minutes in seconds
      path: '/'
    });

    return response;

  } catch (error) {
    console.error("Login error:", error);
    await securityLogger(req, null, 'login_error', { error: error.message });
    return apiResponse.serverError(error.message);
  }
}