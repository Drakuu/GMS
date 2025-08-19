import connectDB from "../../../lib/connectDB";
import WorkoutPlan from '@/models/workoutplanmodel';
import { NextResponse } from "next/server";

// Connect to database
await connectDB();



// GET all workout plans
export async function GET() {
  try {
    const workoutPlan = await WorkoutPlan.find(); // Fetch all workoutPlan
    return NextResponse.json({ data: workoutPlan });
  } catch (error) {
    console.error('Error fetching workout plan:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}


// POST create new WorkoutPlan
export async function POST(req) {
  try {
    const { gymId, memberId, trainerId, weekDayWisePlan, notes } =
      await req.json();

    // Validate required fields
    if ( !gymId || !memberId || !trainerId) {
      return NextResponse.json(
        { message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Create a new WorkoutPlan
    const newWorkoutPlan = new WorkoutPlan({
   
      gymId,
      memberId,
      trainerId,
      weekDayWisePlan,
      notes,
    });

    // Save the trainer to the database
    await newWorkoutPlan.save();

    return NextResponse.json(
      { message: 'Trainer created successfully', data: newWorkoutPlan },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}


