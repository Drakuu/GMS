// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

// Helper functions for safe localStorage access
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jwtlogintoken') || null;
  }
  return null;
};

const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwtlogintoken', token);
  }
};

const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwtlogintoken');
  }
};

// Axios headers configuration
const getAuthHeaders = () => {
  const jwtLoginToken = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(jwtLoginToken && { 'Authorization': `Bearer ${jwtLoginToken}` })
  };
};

// Configure axios instance
const authAxios = axios.create({
  baseURL: '/auth',
  headers: getAuthHeaders()
});

// Async thunks using axios
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/signup', userData);
      return { email: userData.email };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const verifySignup = createAsyncThunk(
  'auth/verifySignup',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/verify-signup', { email, otp });
      if (response.data.token) {
        setAuthToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Verification failed');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/login', credentials);
      return { email: credentials.email };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const verifyLogin = createAsyncThunk(
  'auth/verifyLogin',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/verify-login', { email, otp });
      if (response.data.token) {
        setAuthToken(response.data.token);
      }
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Verification failed');
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (email, { rejectWithValue }) => {
    try {
      await authAxios.post('/resend-otp', { email });
      return { email };
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
    role: 'member',
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
      // Update axios headers with new token
      authAxios.defaults.headers = getAuthHeaders();
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeAuthToken();
      // Clear axios auth header
      delete authAxios.defaults.headers['Authorization'];
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