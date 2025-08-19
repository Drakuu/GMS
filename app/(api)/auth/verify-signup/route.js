import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { generateToken } from '@/utils/authUtils';

export async function POST(req) {
  try {
    await connectDB();
    const { user_email, user_otp } = await req.json();

    // Standardized validation response
    if (!user_email || !user_otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: {
            ...(!user_email && { user_email: "Email is required" }),
            ...(!user_otp && { user_otp: "OTP is required" })
          }
        },
        { status: 400 }
      );
    }

    // Find user with case-insensitive email match
    const user = await User.findOne({
      user_email: { $regex: new RegExp(`^${user_email}$`, 'i') }
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication failed",
          error: "Invalid credentials"
        },
        { status: 401 }
      );
    }

    // Check if account is locked
    if (user.is_locked && user.lock_until > new Date()) {
      const remainingTime = Math.ceil((user.lock_until - new Date()) / 1000 / 60);
      return NextResponse.json(
        {
          success: false,
          message: "Account temporarily locked",
          error: `Too many failed attempts. Try again in ${remainingTime} minutes`
        },
        { status: 429 }
      );
    }

    // OTP verification
    if (String(user.user_otp) !== String(user_otp)) {
      // Increment failed attempts
      user.otp_attempts.count += 1;
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

      return NextResponse.json(
        {
          success: false,
          message: "Authentication failed",
          error: "Invalid OTP",
          attempts_remaining: 3 - user.otp_attempts.count
        },
        { status: 401 }
      );
    }

    // OTP expiry check
    if (new Date(user.user_otp_expiry) < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication failed",
          error: "OTP has expired"
        },
        { status: 401 }
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
    console.log(`Successful OTP verification for user: ${user_email}`);

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
        data: {
          token,
          user: {
            id: user._id,
            user_email: user.user_email,
            user_name: user.user_name,
            user_role: user.user_role
          }
        }
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("Login error:", err);
    return apiResponse.serverError(err.message);
  }
}