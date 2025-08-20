// app/(auth)/signup/page.js
"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  signupUser,
  verifySignup,
  resendOtp,
  updateFormData,
  setOtp,
  setStep
} from "@/store/slices/authSlice";
import { UserDetailsForm } from "../components/UserDetailsForm";
import { OtpVerificationForm } from "../components/OtpVerificationForm";
import AuthLayout from '../layout';
import { toast } from 'sonner';
import { ROLES } from '@/Routes/constants';
import { useEffect } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { step, formData, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupData = {
      user_name: formData.name,
      user_email: formData.email,
      user_password: formData.password,
      user_phone: formData.phone
    };

    try {
      const result = await dispatch(signupUser(signupData));

      if (signupUser.fulfilled.match(result)) {
        if (result.payload.emailSent === false) {
          toast.warning('Account created but email may not have been sent. Check your OTP below.');
        } else {
          toast.success('OTP sent to your email! Check your inbox.');
        }
      } else if (signupUser.rejected.match(result)) {
        toast.error(result.payload || 'Signup failed');
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error('An error occurred during signup');
    }
  };

  if (step === 2) {
    return (
      <OtpVerification
        email={formData.email}
        onBack={() => dispatch(setStep(1))}
      />
    );
  }

  return (
    <AuthLayout title="Create an account">
      <UserDetailsForm
        form={formData}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <a href="/login" className="underline text-primary">
          Login
        </a>
      </div>
    </AuthLayout>
  );
}

const OtpVerification = ({ email, onBack }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { otp, loading, error } = useSelector((state) => state.auth);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    dispatch(setOtp(value));
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const result = await dispatch(verifySignup({
        user_email: email,
        user_otp: otp
      }));

      console.log('🔍 Verify signup result:', result);

      if (verifySignup.fulfilled.match(result)) {
        console.log('✅ Signup successful, payload:', result.payload);
        console.log('🎭 User role:', result.payload.user?.user_role);

        toast.success("Account verified successfully!");

        // Use the user data from the verifySignup response
        const userRole = result.payload.user?.user_role;

        if (!userRole) {
          console.error('❌ No user role found in signup response');
          router.push('/dashboard');
          return;
        }

        // Redirect based on role
        redirectBasedOnRole(userRole);
      } else if (verifySignup.rejected.match(result)) {
        toast.error(result.payload || 'Verification failed');
      }
    } catch (error) {
      toast.error('An error occurred during verification');
      console.error("Verification error:", error);
    }
  };

  // Helper function for redirection
  const redirectBasedOnRole = (userRole) => {
    console.log('🔄 Redirecting based on role:', userRole);

    if (userRole === ROLES.ADMIN) {
      router.push('/admin/dashboard');
    } else if (userRole === ROLES.SUPER_ADMIN) {
      router.push('/super-admin/dashboard');
    } else if (userRole === ROLES.TRAINER) {
      router.push('/trainer/dashboard');
    } else if (userRole === ROLES.MEMBER) {
      router.push('/member/dashboard');
    } else {
      console.log('⚠️ Unknown role, redirecting to /dashboard');
      router.push('/dashboard');
    }
  };

  const handleResend = async () => {
    try {
      const result = await dispatch(resendOtp({ user_email: email }));

      if (resendOtp.fulfilled.match(result)) {
        toast.success("New OTP sent to your email! Check your inbox.");
      } else if (resendOtp.rejected.match(result)) {
        toast.error(result.payload || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error("Resend error:", error);
      toast.error('An error occurred while resending OTP');
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-primary"
      >
        ← Back to signup
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