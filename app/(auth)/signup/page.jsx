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

      if (result.payload) {
        toast.success('OTP sent to your email! Check your inbox.');
      } else if (result.error) {
        toast.error(result.error.message || 'Signup failed');
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

      if (result.payload) {
        toast.success("Account verified successfully!");
        router.push('/dashboard');
      } else if (result.error) {
        toast.error(result.error.message || 'Verification failed');
      }
    } catch (error) {
      toast.error('An error occurred during verification');
      console.error("Verification error:", error);
    }
  };

  const handleResend = async () => {
    try {
      const result = await dispatch(resendOtp({ user_email: email }));

      if (result.payload) {
        toast.success("New OTP sent to your email! Check your inbox.");
      } else if (result.error) {
        toast.error(result.error.message || 'Failed to resend OTP');
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