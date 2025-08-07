// app/api/auth/login/verify/route.js
import { NextResponse } from 'next/server';
import User from '../../../../../models/usermodel'; // Import your User model
import connectDB from '../../../../../utils/connectDB' // Import your database connection

export async function POST(req) {
  try {
    await connectDB(); // Connect to database first

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp) {
      return NextResponse.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    if (user.otpExpiry < Date.now()) {
      return NextResponse.json(
        { message: 'OTP has expired' },
        { status: 400 }
      );
    }

    // Clear OTP and generate auth token
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // In a real app, you would generate and return a proper auth token here
    return NextResponse.json(
      { 
        message: 'Login verified successfully',
        // Include user data or auth token as needed
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { 
        message: 'Verification failed',
        error: error.message 
      },
      { status: 500 }
    );
  }
}