import connectDB from '../../../lib/connectDB';
import Member from '@/models/membermodel';
import { NextResponse } from 'next/server';
//import { getServerSession } from "next-auth";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Connect to database
await connectDB();

// Helper function to check admin role
//const isAdmin = async (req) => {
//const session = await getServerSession(authOptions);
//return session?.user?.role === "admin";
//};

// // GET all members
export async function GET() {
  try {
    const members = await Member.find(); // Fetch all members
    return NextResponse.json({ data: members });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

// POST create new trainer
export async function POST(req) {
  try {
    const {
      userId,
      gymId,
      membershipStatus,
      membershipType,
      startDate,
      bmi,
      height,
      weight,
      age,
      gender,
      goal,
      emergencyContactName,
      emergencyContactPhone,
      memberemail,
      gaurdian_name,
      status,
    } = await req.json();

    // Validate required fields
    if (!userId || !gymId || !membershipStatus) {
      return NextResponse.json(
        { message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Create a new trainer
    const newMember = new Member({
      userId,
      gymId,
      membershipStatus,
      membershipType,
      startDate,
      bmi,
      height,
      weight,
      age,
      gender,
      goal,
      emergencyContactName,
      emergencyContactPhone,
      memberemail,
      gaurdian_name,
      status: status || 'Active',
    });

    // Save the trainer to the database
    await newMember.save();

    return NextResponse.json(
      { message: 'Member created successfully', data: newMember },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating trainer:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
