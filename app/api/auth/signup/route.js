import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../../models/usermodel';
import connectDB from '../../../../utils/connectDB';
import generateToken from '../../../../utils/generatetoken';

// 6-digit OTP generator
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req) {
  try {
    const { email, password, name, phone, role, gymId } = await req.json();

    await connectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    const user = await User.create({
      email,
      password: hashed,
      name,
      phone,
      role,
      gymId,
      otp,
      otpExpiry,
      isVerified: false,
    });

    console.log(`📨 OTP for signup to ${email}: ${otp}`);

    return NextResponse.json({ message: 'OTP sent to email', email });

  } catch (err) {
    return NextResponse.json({ message: 'Server error', error: err.message }, { status: 500 });
  }
}
