// app/api/auth/verify-login/route.js
import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { decodeToken, createAuthToken } from '@/utils/authControllerUtils';
import { securityLogger } from '@/middleware/securityLogger';
import { apiResponse } from '@/utils/responseHelper';

export async function POST(req) {
  try {
    await connectDB();
    const { otp } = await req.json();
    const ip = req.headers['x-forwarded-for'] || req.ip || '127.0.0.1';

    // Get temp token from cookies
    const tempToken = req.cookies.get('otp-verification-token')?.value;
    if (!tempToken) {
      return apiResponse.error(
        "Session expired",
        { error: "Please login again" },
        401
      );
    }

    // Verify temp token
    const token = await decodeToken(tempToken);
    if (!token?.email || token.purpose !== 'otp_verification') {
      return apiResponse.error(
        "Invalid session",
        { error: "Please login again" },
        401
      );
    }

    // Find user
    const user = await User.findOne({
      user_email: token.email
    }).select('+user_otp +user_otp_expiry +otp_attempts +is_locked +lock_until');

    if (!user) {
      await securityLogger(req, null, 'invalid_otp_attempt', { email: token.email });
      return apiResponse.error(
        "Authentication failed",
        { error: "Invalid credentials" },
        401
      );
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

    // Verify OTP
    if (String(user.user_otp) !== String(otp)) {
      // Increment failed attempts
      user.otp_attempts.count += 1;
      user.otp_attempts.last_attempt = new Date();

      // Lock account after 3 failed attempts for 15 minutes
      if (user.otp_attempts.count >= 3) {
        user.is_locked = true;
        user.lock_until = new Date(Date.now() + 15 * 60 * 1000);
      }

      await user.save();
      await securityLogger(req, user, 'failed_otp_attempt', { attempts: user.otp_attempts.count });

      return apiResponse.error(
        "Authentication failed",
        {
          error: "Invalid OTP",
          attempts_remaining: 3 - user.otp_attempts.count
        },
        401
      );
    }

    // Check OTP expiry
    if (!user.user_otp_expiry || new Date(user.user_otp_expiry) < new Date()) {
      await securityLogger(req, user, 'expired_otp_attempt');
      return apiResponse.error(
        "Authentication failed",
        { error: "OTP has expired" },
        401
      );
    }

    // Successful verification
    user.user_otp = undefined;
    user.user_otp_expiry = undefined;
    user.otp_attempts.count = 0;
    user.is_locked = false;
    user.lock_until = undefined;
    user.last_login = new Date();
    user.login_history.push({
      ip_address: ip,
      user_agent: req.headers['user-agent'],
      status: 'success'
    });

    await user.save();
    await securityLogger(req, user, 'successful_login');

    // Generate auth token
    const authToken = await createAuthToken(user);

    // Prepare response
    const response = apiResponse.success(
      {
        user: {
          id: user._id,
          user_email: user.user_email,
          user_name: user.user_name,
          user_role: user.user_role
        },
        token: authToken
      },
      "Login successful"
    );

    // Set auth cookie
    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });

    // Clear temp cookie
    response.cookies.delete('otp-verification-token');

    return response;

  } catch (error) {
    console.error("Verification error:", error);
    await securityLogger(req, null, 'verification_error', { error: error.message });
    return apiResponse.serverError(error.message);
  }
}