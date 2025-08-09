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
import { useState } from 'react';
import { OtpVerificationForm } from '../components/OtpVerificationForm';

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

const OtpVerification = ({ email, onBack }) => {
  const dispatch = useDispatch();
  const { otp, loading, error } = useSelector((state) => state.auth);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    dispatch(setOtp(value));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) return;

    const result = await dispatch(verifyLogin({
      user_email: email,
      otp
    }));

    if (!result.error) {
      router.push('/dashboard'); // Redirect on success
    }
  };

  const handleResend = async () => {
    await dispatch(resendOtp({ user_email: email }));
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack}>← Back to login</button>
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