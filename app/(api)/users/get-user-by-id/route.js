// app/(api)/users/get-user-by-id/route.js
import connectDB from '@/lib/connectDB';
import User from '@/models/user.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';

export async function GET(req) {
   try {
      await connectDB();

      console.log('=== GET /api/users/get-user-by-id ===');
      console.log('Request URL:', req.url);
      console.log('Authorization header:', req.headers.get('authorization'));

      // Get the authenticated user making the request
      const requester = await getRequester(req);
      console.log('Requester:', requester);

      if (!requester) {
         console.log('No requester found - returning 401');
         return apiResponse.error('Unauthorized', { error: 'Authentication required' }, 401);
      }

      // Extract user ID from query parameters
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get('id');

      console.log('Requested user ID:', userId);

      if (!userId) {
         return apiResponse.error('Bad Request', { error: 'User ID is required' }, 400);
      }

      // Check permissions - users can only view their own profile unless they're admin/superadmin
      const isOwnProfile = requester.id === userId || requester._id === userId;
      const isAdmin = ['SuperAdmin', 'Admin'].includes(requester.role || requester.user_role);

      console.log('Is own profile:', isOwnProfile);
      console.log('Is admin:', isAdmin);

      if (!isOwnProfile && !isAdmin) {
         return apiResponse.error('Forbidden', { error: 'Insufficient privileges' }, 403);
      }

      // Find user by ID
      const user = await User.findById(userId)
         .select('-password -otp -otpExpiry -tempToken')
         .lean();

      if (!user) {
         return apiResponse.error('Not Found', { error: 'User not found' }, 404);
      }

      console.log('User found:', user);
      return apiResponse.success({ user }, 'User retrieved successfully');
   } catch (err) {
      console.error('GET /api/users/get-user-by-id error:', err);
      return apiResponse.serverError(err.message);
   }
}