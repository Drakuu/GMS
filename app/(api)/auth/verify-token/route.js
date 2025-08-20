import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { apiResponse } from '@/utils/responseHelper';

export async function GET(req) {
   try {
      await connectDB();

      const authHeader = req.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return apiResponse.error("No token provided", {}, 401);
      }

      const token = authHeader.substring(7);

      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         const user = await User.findById(decoded.userId).select('-user_password -user_otp');
         if (!user || user.isDeleted) {
            return apiResponse.error("User not found", {}, 404);
         }

         return apiResponse.success(
            { user },
            "Token verified successfully"
         );
      } catch (jwtError) {
         return apiResponse.error("Invalid token", { error: jwtError.message }, 401);
      }
   } catch (error) {
      console.error("Token verification error:", error);
      return apiResponse.serverError(error.message);
   }
}