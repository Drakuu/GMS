import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import connectDB from '@/utils/connectDB';
import { generateOTP } from '@/utils/authUtils';

export async function POST(req) {
  try {
    const { user_email } = await req.json();

    if (!user_email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

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

    console.log(`New OTP for ${user_email}: ${otp}`);

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
