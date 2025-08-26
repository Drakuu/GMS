// app/api/users/update-identifier/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { updateUserId } from '@/utils/userIdGenerator';
import { apiResponse } from '@/utils/responseHelper';

export async function PUT(req) {
   try {
      await connectDB();

      // Check authentication
      const session = await getServerSession();
      if (!session) {
         return apiResponse.error("Unauthorized", {}, 401);
      }

      const { user_name } = await req.json();

      if (!user_name) {
         return apiResponse.error(
            "Validation failed",
            { user_name: "Name is required" },
            400
         );
      }

      // Find the current user
      const user = await User.findOne({ user_email: session.user.email });
      if (!user) {
         return apiResponse.error("User not found", {}, 404);
      }

      // Update the user identifier
      const newUserIdentifier = await updateUserId(user._id, user_name);

      // Also update the user name
      user.user_name = user_name;
      await user.save();

      return apiResponse.success(
         {
            user_identifier: newUserIdentifier,
            user_name: user.user_name
         },
         "User identifier updated successfully"
      );

   } catch (error) {
      console.error("Update identifier error:", error);
      return apiResponse.serverError(error.message);
   }
}