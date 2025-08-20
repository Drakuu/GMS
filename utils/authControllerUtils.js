import { encode, decode } from 'next-auth/jwt';
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
  return await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET
  });
};

export const createAuthToken = async (user) => {
  return await encode({
    token: {
      userId: user._id,
      email: user.user_email,  // Changed from user.email to user.user_email
      name: user.user_name,    // Changed from user.name to user.user_name
      role: user.user_role     // Changed from user.role to user.user_role
    },
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  });
};