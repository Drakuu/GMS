"use client";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { 
  signupUser, 
  verifySignup,  // Changed from verifyOtp to verifySignup
  resendOtp,
  updateFormData,
  setOtp,
  setStep
} from "@/store/slices/authSlice";
import { UserDetailsForm } from "../components/UserDetailsForm";
import { OtpVerificationForm } from "../components/OtpVerificationForm";
import AuthLayout from '../layout';

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { step, formData, loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signupUser(formData));
  };

  if (step === 2) {
    return <OtpVerification 
      email={formData.email} 
      onBack={() => dispatch(setStep(1))}
    />;
  }

  return (
    <AuthLayout title="Create an account">
      <UserDetailsForm 
        form={formData}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <a href="/auth/login" className="underline text-primary">
          Login
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
    await dispatch(verifySignup({ email, otp }));  // Changed to verifySignup
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
        ← Back to signup
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