// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

// Helper functions for safe localStorage access
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token') || null;
  }
  return null;
};

const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth-token', token);
  }
};

const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('otp-verification-token');
  }
};

// Configure axios instance
const authAxios = axios.create({
  baseURL: '/auth',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Update axios headers with token
const updateAxiosHeaders = (token) => {
  if (token) {
    authAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete authAxios.defaults.headers.common['Authorization'];
  }
};

// Initialize headers
updateAxiosHeaders(getAuthToken());

// Async thunks using axios
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      // Create clean payload with only defined values
      const payload = {
        user_name: userData.user_name,
        user_email: userData.user_email,
        user_password: userData.user_password,
        user_phone: userData.user_phone
      };

      // Only add optional fields if they exist
      if (userData.user_role) payload.user_role = userData.user_role;
      if (userData.gym_id) payload.gym_id = userData.gym_id;

      console.log("Final signup payload:", payload);

      const response = await authAxios.post('/signup', payload);
      return {
        user_email: userData.user_email,
        otp: response.data.user_otp,
        otp_expiry: response.data.user_otp_expiry
      };
    } catch (error) {
      console.error("Signup error details:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const verifySignup = createAsyncThunk(
  'auth/verifySignup',
  async ({ user_email, user_otp }, { rejectWithValue }) => {
    try {
      console.log("Verifying OTP for:", user_email, "with OTP:", user_otp);

      const response = await authAxios.post('/verify-signup', {
        user_email,
        user_otp
      });

      console.log("Verification response:", response.data);

      if (response.data.token) {
        setAuthToken(response.data.token);
        updateAxiosHeaders(response.data.token);
      }
      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      console.error("Verification error:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Verification failed'
      );
    }
  }
);

// Update the loginUser thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/login', {
        user_email: credentials.user_email,
        user_password: credentials.user_password
      }, {
        withCredentials: true // Required for cookies
      });

      // Check for OTP in response (for development)
      if (!response.data.user_otp) {
        throw new Error('No OTP received');
      }

      return {
        user_email: credentials.user_email,
        otp: response.data.user_otp,
        otp_expiry: response.data.user_otp_expiry
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Login failed'
      );
    }
  }
);

// Enhanced verifyLogin thunk
export const verifyLogin = createAsyncThunk(
  'auth/verifyLogin',
  async ({ user_email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/verify-login', {
        user_email,
        otp
      }, {
        withCredentials: true // Required for cookies
      });

      if (!response.data.token) {
        throw new Error('No authentication token received');
      }

      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      console.error('Verification error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      return rejectWithValue(
        error.response?.data?.message ||
        'Verification failed. Please try again.'
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/resend-otp', {
        user_email: email
      });
      return {
        email,
        otp: response.data.user_otp, // For development only
        otp_expiry: response.data.user_otp_expiry
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to resend OTP');
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  step: 1,
  formData: {
    name: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    gymId: null
  },
  otp: '',
  token: getAuthToken()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      setAuthToken(action.payload);
      updateAxiosHeaders(action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeAuthToken();
    },
    resetAuth: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.step = 2;
        toast.success('OTP sent to your email!');
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      })

      // Verify Signup
      .addCase(verifySignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifySignup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
        toast.success('Account verified successfully!');
      })
      .addCase(verifySignup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.step = 2;
        toast.success('OTP sent to your email!');
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      })

      // Verify Login
      .addCase(verifyLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        toast.success('Login successful!');
      })
      .addCase(verifyLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      })

      // Resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        toast.success('New OTP sent to your email!');
      })
      .addCase(resendOtp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        toast.error(payload);
      });
  }
});

export const {
  setStep,
  updateFormData,
  setOtp,
  setToken,
  logout,
  resetAuth
} = authSlice.actions;

export default authSlice.reducer;