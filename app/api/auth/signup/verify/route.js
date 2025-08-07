// app/api/auth/signup/verify/route.js

import { NextResponse } from 'next/server';
import connectDB from '../../../../../utils/connectDB'; // ✅ Your DB connection function
import User from '../../../../../models/usermodel';   // ✅ Your User model

export async function POST(req) {
  try {
    await connectDB(); // ✅ Connect to DB first

    const { email, otp } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    user.isVerified = true;
    await user.save();

    return NextResponse.json({ message: 'Account verified successfully' });
  } catch (error) {
    console.error("Verify Signup Error:", error); // 🔍 Log actual error for debugging
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
