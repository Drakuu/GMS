import { encode, decode as nextAuthDecode } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

const isProd = process.env.NODE_ENV === 'production';
function assertSecret(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not defined`);
  return v;
}

/** Compact, safe profile for the auth token */
export function pickUserForToken(u = {}) {
  const user = u.toObject ? u.toObject() : u;
  return {
    id: user._id ? String(user._id) : '',
    user_identifier: user.user_identifier ?? null,
    user_email: user.user_email ?? null,
    user_name: user.user_name ?? null,
    user_role: user.user_role ?? null,
    gym_id: user.gym_id ? String(user.gym_id) : null,
    is_verified: !!user.is_verified,
    isDeleted: !!user.isDeleted,
    last_login: user.last_login ?? null,
    v: 1,
    iat_ms: Date.now(),
  };
}

// OTP
export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  if (!isProd) console.log(`Generated OTP: ${otp}`); // avoid logging in prod
  return otp;
};

// Bearer JWT (HS256)
export const generateToken = (user) => {
  const payload = pickUserForToken(user);
  const secret = assertSecret('JWT_SECRET');
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

// Temp token for OTP flow (NextAuth JWE)
export const createTempToken = async (email) => {
  assertSecret('NEXTAUTH_SECRET');
  return encode({
    token: { email, purpose: 'otp_verification' },
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 7 * 60,
  });
};

export const decodeToken = async (token) => {
  assertSecret('NEXTAUTH_SECRET');
  return nextAuthDecode({ token, secret: process.env.NEXTAUTH_SECRET });
};

// Main auth token (NextAuth JWE)
export const createAuthToken = async (user) => {
  assertSecret('NEXTAUTH_SECRET');
  const t = pickUserForToken(user);
  return encode({
    token: { ...t, sub: t.id },  // optional: include subject
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  });
};

/** Decode and normalize shapes for downstream use */
export async function getRequester(req) {
  try {
    const authHeader = req.headers.get('authorization') || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const cookieToken = req.cookies.get('auth-token')?.value || null;
    const token = bearerToken || cookieToken;
    if (!token) return null;

    // Try NextAuth JWE
    try {
      assertSecret('NEXTAUTH_SECRET');
      const decoded = await nextAuthDecode({ token, secret: process.env.NEXTAUTH_SECRET });
      if (decoded) {
        const id = decoded.id || decoded.userId || decoded._id || decoded?.user?.id || decoded?.user?._id;
        const role = decoded.role || decoded.user_role;
        const gymId = decoded.gym_id || decoded.gymId;
        return {
          ...decoded,
          id: id ? String(id) : undefined,
          role: role || undefined,
          user_role: role || decoded.user_role,
          gym_id: gymId ? String(gymId) : decoded.gym_id
        };
      }
    } catch (e) {
      if (!isProd) console.log('NextAuth decode failed:', e.message);
    }

    // Fallback: HS256 JWT
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id || decoded.userId || decoded._id;
      const role = decoded.role || decoded.user_role;
      const gymId = decoded.gym_id || decoded.gymId;
      return {
        ...decoded,
        id: id ? String(id) : undefined,
        role: role || undefined,
        user_role: role || decoded.user_role,
        gym_id: gymId ? String(gymId) : decoded.gym_id
      };
    } catch (e) {
      if (!isProd) console.log('JWT verification failed:', e.message);
      return null;
    }
  } catch (error) {
    console.error('Error in getRequester:', error);
    return null;
  }
}
