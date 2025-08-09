import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import connectDB from '@/utils/connectDB';
import { decodeToken, createAuthToken } from '@/utils/authUtils';

export async function POST(req) {
  try {
    const cookies = req.cookies;
    const tempToken = cookies.get('otp-verification-token')?.value;

    if (!tempToken) {
      return NextResponse.json(
        { message: "Session expired. Please login again." },
        { status: 401 }
      );
    }

    const token = await decodeToken(tempToken);
    if (!token || token.purpose !== 'otp_verification') {
      return NextResponse.json(
        { message: "Invalid session. Please login again." },
        { status: 401 }
      );
    }

    const { otp } = await req.json();
    if (!otp) {
      return NextResponse.json(
        { message: "OTP is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ user_email: token.email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Convert both to strings for a type-safe comparison
    if (String(user.user_otp) !== String(otp)) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Compare expiry as Date
    if (user.user_otp_expiry && user.user_otp_expiry.getTime() < Date.now()) {
      return NextResponse.json(
        { message: "OTP has expired" },
        { status: 400 }
      );
    }

    // Clear OTP fields and update last login
    user.user_otp = undefined;
    user.user_otp_expiry = undefined;
    user.last_login = new Date();
    await user.save();

    const authToken = await createAuthToken(user);

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        user_email: user.user_email,
        user_name: user.user_name,
        user_role: user.user_role
      }
    });

    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    response.cookies.delete('otp-verification-token');

    return response;

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
