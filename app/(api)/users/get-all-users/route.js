import connectDB from '@/lib/connectDB';
import User from '@/models/user.model';
import { apiResponse } from '@/utils/responseHelper';
import { getRequester } from '@/utils/authControllerUtils';

export async function GET(req) {
   try {
      await connectDB();

      const requester = await getRequester(req);
      if (!requester) {
         return apiResponse.error('Unauthorized', { error: 'Authentication required' }, 401);
      }

      const isAdmin = ['SuperAdmin', 'Admin'].includes(requester.role || requester.user_role);
      if (!isAdmin) {
         return apiResponse.error('Forbidden', { error: 'Insufficient privileges' }, 403);
      }

      const { searchParams } = new URL(req.url);
      const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
      const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
      const q = (searchParams.get('q') || '').trim();
      const role = (searchParams.get('role') || '').trim();

      const filter = {};
      if (q) {
         // adjust fields to your schema
         filter.$or = [
            { user_name: { $regex: q, $options: 'i' } },
            { email: { $regex: q, $options: 'i' } },
            { phone: { $regex: q, $options: 'i' } },
         ];
      }
      if (role) {
         filter.$or = [
            { role },
            { user_role: role },
         ];
      }

      const total = await User.countDocuments(filter);
      const users = await User.find(filter)
         .select('-password -otp -otpExpiry -tempToken')
         .sort({ createdAt: -1 })
         .skip((page - 1) * limit)
         .limit(limit)
         .lean();

      return apiResponse.success(
         { users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
         'Users retrieved successfully'
      );
   } catch (err) {
      console.error('GET /users/get-all-users error:', err);
      return apiResponse.serverError(err.message);
   }
}
