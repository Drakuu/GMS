import { NextResponse } from 'next/server';
import User from '@/models/user.model';
import connectDB from '@/utils/connectDB';
import { decodeToken, createAuthToken } from '@/utils/authUtils';

export async function POST(req) {
  try {
    // 1. Get the temporary token from cookies
    const cookies = req.cookies;
    const tempToken = cookies.get('otp-verification-token')?.value;

    if (!tempToken) {
      return NextResponse.json(
        { message: "Session expired. Please login again." },
        { status: 401 }
      );
    }

    // 2. Verify the temporary token
    const token = await decodeToken(tempToken);
    if (!token || token.purpose !== 'otp_verification') {
      return NextResponse.json(
        { message: "Invalid session. Please login again." },
        { status: 401 }
      );
    }

    // 3. Get OTP from request body
    const { otp } = await req.json();
    if (!otp) {
      return NextResponse.json(
        { message: "OTP is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // 4. Find user and verify OTP
    const user = await User.findOne({ user_email: token.email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Type-safe OTP comparison
    if (String(user.user_otp) !== String(otp)) {
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // Check OTP expiration
    if (user.user_otp_expiry && new Date(user.user_otp_expiry) < new Date()) {
      return NextResponse.json(
        { message: "OTP has expired" },
        { status: 400 }
      );
    }

    // 5. Update user and generate auth token
    user.user_otp = undefined;
    user.user_otp_expiry = undefined;
    user.last_login = new Date();
    await user.save();

    const authToken = await createAuthToken(user);

    // 6. Prepare response with new auth cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        user_email: user.user_email,
        user_name: user.user_name,
        user_role: user.user_role
      },
      token: authToken // Explicitly include token in response
    });

    // Set secure auth cookie
    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    // Clear the temporary verification cookie
    response.cookies.delete('otp-verification-token');

    return response;

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}