import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Models from '@/models';
import { generateOTP, createTempToken } from '@/utils/authUtils';
import connectDB from '@/lib/connectDB'; // Add this import

export async function POST(req) {
  try {
    await connectDB();
    const { user_email, user_password } = await req.json();

    if (!user_email || !user_password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    // Find user by user_email
    const user = await Models.User.findOne({ user_email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    if (!user.is_verified) {
      return NextResponse.json(
        { message: "Please verify your email first" },
        { status: 400 }
      );
    }

    // Compare passwords
    const match = await bcrypt.compare(user_password, user.user_password);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Generate and save OTP
    const otp = generateOTP();
    const expiryTime = new Date(Date.now() + 7 * 60 * 1000); // exact date-time for expiry
    user.user_otp = otp;
    user.user_otp_expiry = expiryTime;
    await user.save();

    // Create temp token
    const tempToken = await createTempToken(user.user_email);

    // Log in console
    console.log(`OTP for ${user_email}: ${otp}, Expires at: ${expiryTime}`);

    // Return response including OTP & expiry (for testing; remove in production)
    const response = NextResponse.json(
      {
        message: "OTP sent to email",
        user_otp: otp,
        user_otp_expiry: expiryTime
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('otp-verification-token', tempToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 60 // 7 minutes
    });

    return response;

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
