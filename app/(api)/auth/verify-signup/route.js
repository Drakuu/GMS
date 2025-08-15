import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { generateToken } from '@/utils/authUtils';

export async function POST(req) {
  try {
    await connectDB();
    const { user_email, user_otp } = await req.json();

    // Validation
    if (!user_email || !user_otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required",
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
          message: "User not found",
          error: "No account exists with this email"
        },
        { status: 404 }
      );
    }

    // OTP verification
    if (user.user_otp !== user_otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP",
          error: "The OTP you entered is incorrect"
        },
        { status: 400 }
      );
    }

    // OTP expiry check
    if (user.user_otp_expiry < Date.now()) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP expired",
          error: "The OTP has expired. Please request a new one"
        },
        { status: 400 }
      );
    }

    // Update user
    user.is_verified = true;
    user.user_otp = undefined;
    user.user_otp_expiry = undefined;
    await user.save();

    // Generate token
    const token = generateToken(user);

    return NextResponse.json(
      {
        success: true,
        message: "Account verified successfully",
        data: {
          token,
          user: {
            id: user._id,
            user_email: user.user_email,
            user_name: user.user_name,
            user_role: user.user_role,
            is_verified: user.is_verified
          }
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Verification failed",
        error: error.message
      },
      { status: 500 }
    );
  }
}