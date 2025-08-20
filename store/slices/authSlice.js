import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getCookieToken,
  setCookieToken,
  removeCookieToken
} from '@/utils/authSliceUtils';
import axios from 'axios';
import { toast } from 'sonner';

// Axios instance with interceptors
const authAxios = axios.create({
  baseURL: '/auth',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor for auth token
authAxios.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Response interceptor for error handling
authAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      removeAuthToken();
      removeCookieToken();
    }
    return Promise.reject(error);
  }
);


//  signupUser thunk
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const payload = {
        user_name: userData.user_name,
        user_email: userData.user_email,
        user_password: userData.user_password,
        user_phone: userData.user_phone,
        ...(userData.user_role && { user_role: userData.user_role }),
        ...(userData.gym_id && { gym_id: userData.gym_id })
      };

      const response = await authAxios.post('/signup', payload);

      console.log('🔍 Signup response:', response.data);

      return {
        user_email: userData.user_email,
        otp: response.data.data?.otp || response.data.user_otp,
        otp_expiry: response.data.data?.otp_expiry || response.data.user_otp_expiry,
        emailSent: response.data.emailSent !== false // Default to true if not specified
      };
    } catch (error) {
      console.error('❌ Signup error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Signup failed. Please try again.'
      );
    }
  }
);

// verifySignup thunk
export const verifySignup = createAsyncThunk(
  'auth/verifySignup',
  async ({ user_email, user_otp }, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/verify-signup', {
        user_email,
        user_otp
      });

      console.log('🔍 Verify signup response:', response.data);

      const token = response.data.token || response.data.data?.token;
      if (token) {
        setAuthToken(token);
        setCookieToken(token);
      }

      // Handle different response structures
      const userData = response.data.user || response.data.data?.user;

      if (!userData) {
        console.error('❌ No user data in signup response:', response.data);
        throw new Error('No user data received');
      }

      return {
        user: userData,
        token
      };
    } catch (error) {
      console.error('❌ Verify signup error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message ||
        'Verification failed. Please try again.'
      );
    }
  }
);

// In your authSlice.js
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/login', {
        user_email: credentials.user_email,
        user_password: credentials.user_password
      });

      // FIX: Check the actual response structure
      const responseData = response.data;

      if (!responseData.data?.user_otp && !responseData.user_otp) {
        throw new Error('OTP not received in response');
      }

      return {
        user_email: credentials.user_email,
        otp: responseData.data?.user_otp || responseData.user_otp,
        otp_expiry: responseData.data?.user_otp_expiry || responseData.user_otp_expiry
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.'
      );
    }
  }
);

export const verifyLogin = createAsyncThunk(
  'auth/verifyLogin',
  async ({ user_email, otp }, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/verify-login', {
        user_email,
        otp
      });

      console.log('🔍 Backend verify-login response:', response.data);

      const token = response.data.token || response.data.data?.token || getCookieToken();
      if (token) {
        setAuthToken(token);
        setCookieToken(token);
      }
      // Handle different response structures
      const userData = response.data.user || response.data.data?.user;

      if (!userData) {
        console.error('❌ No user data in response:', response.data);
        throw new Error('No user data received');
      }

      return {
        user: userData,
        token
      };
    } catch (error) {
      console.error('❌ Verify login error:', error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.message ||
        'Verification failed. Please try again.'
      );
    }
  }
);

// In your authSlice.js - verifyAuth thunk
export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken() || getCookieToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await authAxios.get('/verify-token', {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data.user;
    } catch (error) {
      removeAuthToken();
      removeCookieToken();
      return rejectWithValue(
        error.response?.data?.message || 'Authentication failed'
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/resend-otp', { user_email: email });
      return {
        email,
        otp: response.data.user_otp,
        otp_expiry: response.data.user_otp_expiry
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Failed to resend OTP. Please try again.'
      );
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
  token: getAuthToken(),
  isAuthenticated: !!getAuthToken() || !!getCookieToken(),
  authChecked: false // Add this flag
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
      state.isAuthenticated = !!action.payload;
      setAuthToken(action.payload);
      setCookieToken(action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      removeAuthToken();
      removeCookieToken();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.step = 1; // Reset to login step 1
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // First add all .addCase() handlers
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.step = 2;
        state.formData.email = payload.user_email;
        toast.success('OTP sent to your email!');
      })
      .addCase(verifySignup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        toast.success('Account verified successfully!');
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.step = 2;
        state.formData.email = payload.data?.user_email || payload.user_email;
        state.otp = payload.data?.user_otp || payload.otp || '';
        state.error = null;
        toast.success('OTP sent to your email! Check your inbox.');
      })
      .addCase(verifyLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        state.otp = '';
        state.error = null;
        toast.success('Login successful!');
      })
      .addCase(verifyAuth.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success('New OTP sent to your email! Check your inbox.');
      })
      // Then add .addMatcher() handlers
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
          toast.error(payload);
        }
      );
  }
});

export const {
  setStep,
  updateFormData,
  setOtp,
  setToken,
  setUser,  // Add this to exports
  resetAuth,
  clearError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;