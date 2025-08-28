"use client";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  verifyLogin,
  setStep,
  setOtp,
  resendOtp,
  clearError
} from '@/store/slices/authSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import AuthLayout from '../layout';
import { useEffect, useState } from 'react';
import { OtpVerificationForm } from '../components/OtpVerificationForm';
import { ROLES } from '@/Routes/constants';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { verifyAuth } from '@/store/slices/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { step, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: ''
  });

  useEffect(() => {
    dispatch(setStep(1));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user_email || !formData.user_password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Clear previous errors
    dispatch(clearError());

    try {
      await dispatch(loginUser(formData));
    } catch (error) {
      console.error("Login error:", error);
      toast.error('An error occurred during login');
    }
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
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
              {error.includes('Email service') && (
                <div className="mt-2">
                  <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
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
        <Link href="/signup" className="underline text-primary">
          Register
        </Link>
      </div>
    </AuthLayout>
  );
}

const OtpVerification = ({ email, onBack }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { otp, loading, error, user, timeout } = useSelector((state) => state.auth); // Get user from state

  // Add state for timeout scenario
  const [emailTimeout, setEmailTimeout] = useState(false);
  const authState = useSelector(state => state.auth);

  useEffect(() => {
    // Check if we're in a timeout scenario (from login response)
    if (authState.timeout) {
      setEmailTimeout(true);
    }
  }, []);

  // Reset error state when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Debugging
  useEffect(() => {
    console.log('Current OTP state:', {
      email,
      otp,
      loading,
      error
    });
  }, [email, otp, loading, error]);

  // Debug state
  useEffect(() => {
    console.log('OTP Verification State:', { email, otp, loading, error });
  }, [email, otp, loading, error]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    dispatch(setOtp(value));
  };

  // In your login page component
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    dispatch(clearError());
    try {
      const result = await dispatch(verifyLogin({
        user_email: email,
        otp
      }));

      console.log('🔍 Verify login result:', result);

      if (verifyLogin.fulfilled.match(result)) {
        console.log('✅ Login successful, payload:', result.payload);

        // Debug: Check the actual structure
        console.log('📋 User object:', result.payload.user);
        console.log('🎭 User role:', result.payload.user?.user_role);
        console.log('🔑 Token:', result.payload.token);

        toast.success('Login successful!');

        // Use the user data from the verifyLogin response
        const userRole = result.payload.user?.user_role;

        if (!userRole) {
          console.error('❌ No user role found in response');
          // Fallback: try to get user data from state after a short delay
          setTimeout(() => {
            const currentUser = useSelector(state => state.auth.user);
            console.log('🔄 Fallback user from state:', currentUser);
            if (currentUser?.user_role) {
              redirectBasedOnRole(currentUser.user_role);
            } else {
              router.push('/dashboard');
            }
          }, 100);
          return;
        }

        // Redirect based on role
        redirectBasedOnRole(userRole);
      }
    } catch (error) {
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
      if (result.payload) {
        toast.success('New OTP sent to your email!');
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

      {emailTimeout && (
        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Email Service Delay</AlertTitle>
          <AlertDescription>
            Email delivery may be delayed. Your OTP is: <strong>{otp}</strong>
          </AlertDescription>
        </Alert>
      )}

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