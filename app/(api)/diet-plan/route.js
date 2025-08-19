import connectDB from "../../../lib/connectDB";
import DietPlan from '@/models/dietplanmodel';
import { NextResponse } from "next/server";

await connectDB();


// GET all dietPlans
export async function GET() {
  try {
    const dietPlans = await DietPlan.find(); // Fetch all dietPlans
    return NextResponse.json({ data: dietPlans });
  } catch (error) {
    console.error('Error fetching diet plans:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}


// POST create new diet plan
export async function POST(req) {
  try {
    const {

      gymId,
      memberId,
      trainerId,
      dailyMealPlan,
      calories,
      macros,
     
    } = await req.json();

    // Validate required fields
    if (!gymId || !memberId || !trainerId) {
      return NextResponse.json(
        { message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Create a new diet plan
    const newDietPlan = new DietPlan({
      gymId,
      memberId,
      trainerId,
      dailyMealPlan,
      calories,
      macros,
    });

    // Save the diet plan to the database
    await newDietPlan.save();

    return NextResponse.json(
      { message: 'diet plan created successfully', data: newDietPlan },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating diet plan:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}



