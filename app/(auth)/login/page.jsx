"use client";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  verifyLogin,
  setStep,
  setOtp,
  resendOtp
} from '@/store/slices/authSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import AuthLayout from '../layout';
import { useEffect, useState } from 'react';
import { OtpVerificationForm } from '../components/OtpVerificationForm';
import { ROLES } from '@/lib/constants';


export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { step, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user_email || !formData.user_password) {
      return;
    }

    await dispatch(loginUser(formData));
  };

  if (step === 2) {
    return <OtpVerification
      email={formData.user_email}
      onBack={() => dispatch(setStep(1))}
    />;
  }

  return (
    <AuthLayout title="Login to your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="user_email">Email</Label>
          <Input
            id="user_email"
            name="user_email"
            type="email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="user_password">Password</Label>
          <Input
            id="user_password"
            name="user_password"
            type="password"
            value={formData.user_password}
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <a href="/signup" className="underline text-primary">
          Register
        </a>
      </div>
    </AuthLayout>
  );
}

// Update your OtpVerification component
const OtpVerification = ({ email, onBack }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { otp, loading, error, user } = useSelector((state) => state.auth);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    dispatch(setOtp(value));
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      dispatch(setError("Please enter a 6-digit code"));
      return;
    }

    try {
      const result = await dispatch(verifyLogin({
        user_email: email,
        otp
      }));

      console.log('Verification result:', result);
      console.log('Full payload:', result.payload); // Add this to inspect the full response

      if (result.type.endsWith('/fulfilled')) {
        const userRole = result.payload.user?.user_role;
        console.log('User role from backend:', userRole);

        // Convert to string for safety and trim whitespace
        const role = String(userRole).trim();

        if (role === ROLES.ADMIN) {
          console.log('Redirecting to admin dashboard');
          await router.push('/admin/dashboard');
        }
        else if (role === ROLES.SUPER_ADMIN) {
          console.log('Redirecting to super admin dashboard');
          await router.push('/super-admin/dashboard');
        }
        else if (role === ROLES.TRAINER) {
          console.log('Redirecting to trainer dashboard');
          await router.push('/trainer/dashboard');
        }
        else if (role === ROLES.MEMBER) {
          console.log('Redirecting to member dashboard');
          await router.push('/member/dashboard');
        }
        else {
          console.warn('Unknown role, redirecting to default dashboard');
          await router.push('/dashboard');
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
    }
  };

  useEffect(() => {
    console.log('Current auth state:', {
      user: user?.user_role,
      // token,
      loading
    });
  }, [user, loading]);

  const handleResend = async () => {
    try {
      const result = await dispatch(resendOtp({ user_email: email }));
      if (result.error) {
        console.error("Resend failed:", result.payload);
      } else {
        console.log("New OTP sent successfully");
      }
    } catch (error) {
      console.error("Resend error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-primary"
      >
        ← Back to login
      </button>

      <OtpVerificationForm
        email={email}
        otp={otp}
        handleOtpChange={handleOtpChange}
        onSubmit={handleVerify}
        onResendOtp={handleResend}
        loading={loading}
        error={error}
      />
    </div>
  );
};