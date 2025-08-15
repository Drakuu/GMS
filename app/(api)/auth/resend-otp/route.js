import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { generateOTP } from '@/utils/authUtils';
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

    // After generating OTP and before saving user
    await sendOTPEmail(
      user.user_email,
      user.user_name || 'User',
      otp
    );

    // Remove the console.log for OTP in production
    if (process.env.NODE_ENV !== 'production') {
      console.log(`New OTP for ${user_email}: ${otp}`);
    }

    return NextResponse.json(
      {
        message: "New OTP generated successfully",
        user_otp: otp,
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
