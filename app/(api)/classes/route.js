import connectDB from '../../../lib/connectDB';
import Class from '@/models/classmodel';
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

// // GET all class
export async function GET() {
  try {
    const classes = await Class.find(); // Fetch all class
    return NextResponse.json({ data: classes });
  } catch (error) {
    console.error('Error fetching class:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

// POST create new class
export async function POST(req) {
  try {
    const {
     
      gymId,
      trainerId,
      name,
      description,
      schedule,
      slots,
      bookedMembers,
      status
    } = await req.json();

    // Validate required fields
    if (!trainerId || !gymId ) {
      return NextResponse.json(
        { message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Create a new trainer
    const newClass = new Class({
       
      gymId,
      trainerId,
      name,
      description,
      schedule,
      slots,
      bookedMembers,
      status: status || 'Active',
    });

    // Save the class to the database
    await newClass.save();

    return NextResponse.json(
      { message: 'Class created successfully', data: newClass },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating class:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
