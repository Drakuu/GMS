// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../../models/usermodel'; // Make sure you have this model imported
import connectDB from '../../../../utils/connectDB'; // Adjust path as needed

// OTP generation function
function generateOTP() {
  // Generate a 6-digit numeric OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { message: "Please verify your email first" },
        { status: 400 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Generate and save OTP
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
    await user.save();

    // In a real application, you would send this OTP to the user's email
    console.log(`🔐 OTP for login to ${email}: ${otp}`);
    
    return NextResponse.json(
      { 
        message: "OTP sent to email", 
        email,
        // Note: In production, don't send the OTP back in the response
        // This is just for development/testing
        otp: process.env.NODE_ENV === 'development' ? otp : undefined
      },
      { status: 200 }
    );

  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}