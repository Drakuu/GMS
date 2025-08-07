// app/api/test/route.js
import connectDB from '@/utils/connectDB';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ success: true, message: 'Database connected!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
