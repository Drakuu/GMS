import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/user.model.js';
import connectDB from '@/lib/connectDB';
import { generateOTP, generateToken } from '@/utils/authUtils';

export async function POST(req) {
  try {
    const { user_email, user_password, user_name, user_phone, user_role, gym_id } = await req.json();

    // Validation
    if (!user_email || !user_password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existing = await User.findOne({ user_email });
    if (existing) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password and generate OTP
    const hashed = await bcrypt.hash(user_password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    // Create new user
    const newUser = new User({
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

    // Save user
    await newUser.save();

    // Generate proper JWT token
    const token = generateToken(newUser);

    return NextResponse.json(
      {
        success: true,
        message: "OTP sent to email",
        data: {
          user_email: newUser.user_email,
          user_name: newUser.user_name,
          user_role: newUser.user_role,
          // For development only - remove in production:
          otp: process.env.NODE_ENV === 'development' ? otp : undefined,
          otp_expiry: otpExpiry.toISOString()
        },
        token
      },
      { status: 201 }
    );

  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: err.message
      },
      { status: 500 }
    );
  }
}