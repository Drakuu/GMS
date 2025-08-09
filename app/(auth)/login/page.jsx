"use client";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, verifyLogin } from '@/store/slices/authSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import AuthLayout from '../layout';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { step, loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  if (step === 2) {
    return <OtpVerification 
      email={formData.email} 
      onBack={() => dispatch(setStep(1))}
    />;
  }

  return (
    <AuthLayout title="Login to your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
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
  const { otp, loading } = useSelector((state) => state.auth);
  
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    dispatch(setOtp(value));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    await dispatch(verifyLogin({ email, otp }));
  };

  const handleResend = async () => {
    await dispatch(resendOtp(email));
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
      />
    </div>
  );
};