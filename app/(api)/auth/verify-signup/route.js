import User from '@/models/user.model';
import connectDB from '@/lib/connectDB';
import { apiResponse } from '@/utils/responseHelper';
import { createAuthToken, pickUserForToken } from '@/utils/authControllerUtils';

export async function POST(req) {
  try {
    await connectDB();
    const { user_email, user_otp } = await req.json();

    // In Next.js Request, use headers.get(...)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    // Basic validation
    if (!user_email || !user_otp) {
      return apiResponse.error(
        'Validation failed',
        {
          ...(!user_email && { user_email: 'Email is required' }),
          ...(!user_otp && { user_otp: 'OTP is required' }),
        },
        400
      );
    }

    // Case-insensitive email lookup
    const user = await User.findOne({
      user_email: { $regex: new RegExp(`^${user_email}$`, 'i') },
    }).select('+user_otp +user_otp_expiry +otp_attempts +is_locked +lock_until');

    if (!user) {
      return apiResponse.error('Authentication failed', { error: 'User not found' }, 404);
    }

    // Check lock
    if (user.is_locked && user.lock_until > new Date()) {
      const remainingTime = Math.ceil((user.lock_until - new Date()) / 60000);
      return apiResponse.error(
        'Account temporarily locked',
        {
          error: `Too many failed attempts. Try again in ${remainingTime} minutes`,
          lock_until: user.lock_until,
        },
        403
      );
    }

    // Init attempts if missing
    if (!user.otp_attempts) user.otp_attempts = { count: 0, last_attempt: null };

    // OTP mismatch
    if (String(user.user_otp) !== String(user_otp)) {
      user.otp_attempts.count = (user.otp_attempts.count || 0) + 1;
      user.otp_attempts.last_attempt = new Date();
      if (user.otp_attempts.count >= 3) {
        user.is_locked = true;
        user.lock_until = new Date(Date.now() + 15 * 60 * 1000);
      }
      user.audit_logs.push({ action: 'failed_otp_attempt', ip });
      await user.save();

      return apiResponse.error(
        'Authentication failed',
        { error: 'Invalid OTP', attempts_remaining: Math.max(0, 3 - (user.otp_attempts.count || 0)) },
        401
      );
    }

    // OTP expired
    if (!user.user_otp_expiry || new Date(user.user_otp_expiry) < new Date()) {
      user.audit_logs.push({ action: 'expired_otp_attempt', ip });
      await user.save();
      return apiResponse.error('Authentication failed', { error: 'OTP has expired' }, 401);
    }

    // Success: clear OTP state, mark verified, log
    user.otp_attempts = { count: 0, last_attempt: null };
    user.user_otp = undefined;
    user.user_otp_expiry = undefined;
    user.is_verified = true;
    user.is_locked = false;
    user.lock_until = null;
    user.last_login = new Date();
    user.audit_logs.push({ action: 'successful_verification', ip });

    await user.save();

    // Issue auth token with your compact payload
    const authToken = await createAuthToken(user);
    const safeUser = pickUserForToken(user);

    const res = apiResponse.success(
      { token: authToken, user: safeUser },
      'Account verified successfully'
    );

    // Set cookie for authenticated session
    res.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return res;
  } catch (err) {
    console.error('Signup verification error:', err);
    return apiResponse.serverError(err.message);
  }
}
