import connectDB from "../../../lib/connectDB";
import Trainer from "@/models/trainermodel";
import { NextResponse } from "next/server";
//import { getServerSession } from "next-auth";
//import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Connect to database
await connectDB();

// Helper function to check admin role
//const isAdmin = async (req) => {
//const session = await getServerSession(authOptions);
//return session?.user?.role === "admin";
//};

// GET all trainers
export async function GET(request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const gymId = searchParams.get('gymId');

    let query = {};
    if (gymId) query.gymId = gymId;

    const trainers = await Trainer.find(query)
      .populate("gymId", "name")
      .populate("assignedMembers", "name contact");

    return NextResponse.json(trainers);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST create new trainer
export async function POST(request) {
  //if (!(await isAdmin(request))) {
  // return NextResponse.json(
  //{ error: "Unauthorized access" },
  //{ status: 403 }
  //);
  //}

  try {
    const {
      name,
      contact,
      email,
      userId,
      gymId,
      specialization,
      experience,
      availabilitySchedule,
      status,
    } = await request.json();

    // Validate required fields
    if (!name || !contact || !email || !gymId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTrainer = new Trainer({
      name,
      contact,
      email,
      userId,
      gymId,
      specialization,
      experience,
      availabilitySchedule: availabilitySchedule || [],
      status: status || "Active",
    });

    await newTrainer.save();
    return NextResponse.json(newTrainer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PUT update trainer
export async function PUT(request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const updateData = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Trainer ID is required" },
        { status: 400 }
      );
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTrainer) {
      return NextResponse.json(
        { error: "Trainer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTrainer);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE trainer
export async function DELETE(request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json(
      { error: "Unauthorized access" },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Trainer ID is required" },
        { status: 400 }
      );
    }

    const deletedTrainer = await Trainer.findByIdAndDelete(id);

    if (!deletedTrainer) {
      return NextResponse.json(
        { error: "Trainer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Trainer deleted successfully" }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}