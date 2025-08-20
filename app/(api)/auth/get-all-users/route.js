import connectDB from '@/lib/connectDB';
import User from '@/models/user.model';
import { apiResponse } from '@/utils/responseHelper';
import { decode as nextAuthDecode } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

// Extract requester from Bearer token or cookie
async function getRequester(req) {
   const auth = req.headers.get('authorization') || '';
   const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : null;
   const cookieToken = req.cookies.get('auth-token')?.value || null;
   const token = bearer || cookieToken;
   if (!token) return null;

   // Try next-auth token first
   try {
      const decoded = await nextAuthDecode({ token, secret: process.env.NEXTAUTH_SECRET });
      if (decoded) return decoded;
   } catch (_) { }

   // Fallback to plain JWT (if you used jsonwebtoken somewhere)
   try {
      return jwt.verify(token, process.env.JWT_SECRET);
   } catch (_) {
      return null;
   }
}

export async function GET(req) {
   try {
      await connectDB();

      // AuthZ: only SuperAdmin/Admin
      const requester = await getRequester(req);
      const role = requester?.role || requester?.user_role;
      if (!['SuperAdmin', 'Admin'].includes(role)) {
         return apiResponse.error('Forbidden', { error: 'Insufficient privileges' }, 403);
      }

      // Query params
      const params = Object.fromEntries(req.nextUrl.searchParams);
      const {
         page = '1',
         limit = '10',
         search = '',
         role: roleFilter,
         is_verified,
         sort = '-createdAt', // e.g. -createdAt, user_name
      } = params;

      // Filters
      const filter = { isDeleted: { $ne: true } };
      if (roleFilter) filter.user_role = roleFilter;
      if (typeof is_verified !== 'undefined') filter.is_verified = is_verified === 'true';
      if (search) {
         filter.$or = [
            { user_name: { $regex: search, $options: 'i' } },
            { user_email: { $regex: search, $options: 'i' } },
            { user_phone: { $regex: search, $options: 'i' } },
         ];
      }

      // Pagination + sort
      const pageNum = Math.max(parseInt(page) || 1, 1);
      const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
      const allowedSort = ['createdAt', 'updatedAt', 'user_name', 'user_email', 'last_login'];
      let sortObj = { createdAt: -1 };
      if (sort) {
         const dir = sort.startsWith('-') ? -1 : 1;
         const field = sort.replace(/^-/, '');
         if (allowedSort.includes(field)) sortObj = { [field]: dir };
      }

      // Return only safe fields
      const projection =
         'user_name user_email user_phone user_role gym_id is_verified last_login createdAt updatedAt';

      const [total, users] = await Promise.all([
         User.countDocuments(filter),
         User.find(filter, projection)
            .sort(sortObj)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum)
            .lean(),
      ]);

      return apiResponse.success({
         users,
         pagination: {
            total,
            page: pageNum,
            limit: limitNum,
            pages: Math.ceil(total / limitNum),
         },
      });
   } catch (err) {
      console.error('GET /api/users error:', err);
      return apiResponse.serverError(err.message);
   }
}
