import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getCookieToken,
  setCookieToken,
  removeCookieToken
} from '@/lib/authUtils';
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

// Async thunks
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
      return {
        user_email: userData.user_email,
        otp: response.data.user_otp,
        otp_expiry: response.data.user_otp_expiry
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        'Signup failed. Please try again.'
      );
    }
  }
);

export const verifySignup = createAsyncThunk(
  'auth/verifySignup',
  async ({ user_email, user_otp }, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/verify-signup', {
        user_email,
        user_otp
      });

      const token = response.data.token;
      if (token) {
        setAuthToken(token);
        setCookieToken(token);
      }

      return {
        user: response.data.user,
        token
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        'Verification failed. Please try again.'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAxios.post('/login', {
        user_email: credentials.user_email,
        user_password: credentials.user_password
      });

      if (!response.data.user_otp) {
        throw new Error('OTP not received');
      }

      return {
        user_email: credentials.user_email,
        otp: response.data.user_otp,
        otp_expiry: response.data.user_otp_expiry
      };
    } catch (error) {
    // Mongoose/Mongo connectivity & query errors
    if (
      error instanceof mongoose.Error ||
      error?.name === 'MongoNetworkError' ||
      error?.name === 'MongoServerError'
    ) {
      return res.status(503).json({ message: 'Database service unavailable' });
    }

    // Validation error (e.g., missing fields)
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    // Auth failure you explicitly throw
    if (error?.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed' });
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

      const token = response.data.token || getCookieToken();
      if (token) {
        setAuthToken(token);
        setCookieToken(token);
      }

      return {
        user: response.data.user,
        token
      };
    } catch (error) {
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
  isAuthenticated: !!getAuthToken() || !!getCookieToken()
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
        state.formData.email = payload.user_email;
        toast.success('OTP sent to your email!');
      })
      .addCase(verifyLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        toast.success('Login successful!');
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        toast.success('New OTP sent to your email!');
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
  logout,
} = authSlice.actions;

export default authSlice.reducer;