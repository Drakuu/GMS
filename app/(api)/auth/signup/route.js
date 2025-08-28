// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user.model.js';
import connectDB from '@/lib/connectDB';
import { generateOTP, generateToken } from '@/utils/authControllerUtils';
import { sendOTPEmail } from '@/services/emailService';
import { apiResponse } from '@/utils/responseHelper';
import { generateUserId } from '@/utils/userIdGenerator'; // Import the generator

export async function POST(req) {
  try {
    await connectDB();
    const { user_email, user_password, user_name, user_phone, user_role, gym_id } = await req.json();

    // Validation
    if (!user_email || !user_password || !user_name) {
      return apiResponse.error(
        "Validation failed",
        {
          ...(!user_email && { user_email: "Email is required" }),
          ...(!user_password && { user_password: "Password is required" }),
          ...(!user_name && { user_name: "Name is required" })
        },
        400
      );
    }

    // Check if user already exists
    const existing = await User.findOne({ user_email });
    if (existing) {
      return apiResponse.error(
        "Email already registered",
        { error: "Email already exists" },
        400
      );
    }

    // Hash password and generate OTP
    const hashed = await bcrypt.hash(user_password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Generate unique user identifier
    const user_identifier = await generateUserId(user_name, user_role || 'Admin');

    // Create new user
    const newUser = new User({
      user_identifier,
      user_email,
      user_password: hashed,
      user_name: user_name || '',
      user_phone: user_phone || '',
      user_role: user_role || 'Admin',
      gym_id: gym_id || null,
      user_otp: otp,
      user_otp_expiry: otpExpiry,
      is_verified: false
    });

    // Save user first
    await newUser.save();

    // Send OTP email with better error handling
    const emailResult = await sendOTPEmail(
      newUser.user_email,
      newUser.user_name || 'User',
      otp
    );

    if (!emailResult.success) {
      console.error('Signup email failed:', emailResult.error);

      // For timeout errors, we'll still proceed but warn the user
      if (emailResult.timeoutError) {
        // Don't rollback - just warn that email might not arrive
        console.log('Email timeout, but proceeding with signup');
      } else {
        // For other errors, rollback the user creation
        await User.findByIdAndDelete(newUser._id);
        return apiResponse.error(
          "Email service unavailable",
          { error: "Failed to send OTP email. Please try again." },
          503
        );
      }
    }

    // Generate token
    const token = generateToken(newUser);

    return apiResponse.success(
      {
        message: emailResult.success ? "OTP sent to email" : "Account created but email may not have been sent",
        data: {
          user_identifier: newUser.user_identifier,
          user_email: newUser.user_email,
          user_name: newUser.user_name,
          user_role: newUser.user_role,
          otp: process.env.NODE_ENV === 'development' ? otp : undefined,
          otp_expiry: otpExpiry
        },
        token,
        emailSent: emailResult.success
      },
      emailResult.success ? "OTP sent successfully" : "Account created with email warning",
      201
    );

  } catch (err) {
    console.error("Signup error:", err);
    return apiResponse.serverError(err.message);
  }
}