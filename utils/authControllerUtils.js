// utils/authControllerUtils.js
import { encode ,decode as nextAuthDecode } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

// Generate 6-digit OTP
export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Generated OTP: ${otp}`);
  return otp;
};

// JWT Token Generator (using jsonwebtoken)
export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    user_email: user.user_email,
    user_identifier: user.user_identifier,
    user_role: user.user_role,
    gym_id: user.gym_id
  };

  // Make sure JWT_SECRET is set and proper
  if (!process.env.JWT_SECRET) {
    console.log('JWT_SECRET is not defined')
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  console.log('Generated JWT with payload:', payload);
  return token;
};

// Next-auth token functions
export const createTempToken = async (email) => {
  return await encode({
    token: { email, purpose: 'otp_verification' },
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 7 * 60 // 7 minutes
  });
};

export const decodeToken = async (token) => {
  return await nextAuthDecode({
    token,
    secret: process.env.NEXTAUTH_SECRET
  });
};

export const createAuthToken = async (user) => {
  return await encode({
    token: {
      userId: user._id,
      email: user.user_email,
      name: user.user_name,
      role: user.user_role
    },
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  });
};

export async function getRequester(req) {
  try {
    // Get token from headers or cookies
    const authHeader = req.headers.get('authorization') || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const cookieToken = req.cookies.get('auth-token')?.value || null;
    const token = bearerToken || cookieToken;

    console.log('Auth header:', authHeader);
    console.log('Bearer token exists:', !!bearerToken);
    console.log('Cookie token exists:', !!cookieToken);
    console.log('Token to verify:', token ? `${token.substring(0, 20)}...` : 'null');

    if (!token) {
      console.log('No token found in request');
      return null;
    }

    // Try to decode with next-auth first
    try {
      console.log('Attempting NextAuth decode...');
      const decoded = await nextAuthDecode({
        token,
        secret: process.env.NEXTAUTH_SECRET
      });
      console.log('NextAuth decode successful:', decoded);
      if (decoded) return decoded;
    } catch (nextAuthError) {
      console.log('NextAuth decode failed:', nextAuthError.message);
    }

    // Fallback to JWT verification
    try {
      console.log('Attempting JWT verification...');
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined');
        return null;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('JWT verification successful:', decoded);
      return decoded;
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError.message);
      return null;
    }
  } catch (error) {
    console.error('Error in getRequester:', error);
    return null;
  }
}