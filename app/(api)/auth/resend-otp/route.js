// app/api/auth/resend-otp/route.js
import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { generateOTP } from '@/utils/authControllerUtils';
import { sendOTPEmail } from '@/services/emailService';

export async function POST(req) {
  try {
    const { user_email } = await req.json();
    await connectDB();

    if (!user_email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ user_email, isDeleted: { $ne: true } });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    user.user_otp = otp;
    user.user_otp_expiry = otpExpiry;
    await user.save();

    // Send OTP email
    const emailResult = await sendOTPEmail(
      user.user_email,
      user.user_name || 'User',
      otp
    );

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to resend OTP",
          error: emailResult.error || "Email service unavailable"
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "New OTP sent successfully",
        user_otp: process.env.NODE_ENV === 'development' ? otp : undefined,
        user_otp_expiry: otpExpiry
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}