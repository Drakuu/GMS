// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@/services/authApi';
import { toast } from 'sonner';
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  getCookieToken,
  setCookieToken,
  removeCookieToken
} from '@/utils/authSliceUtils';


export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.signup(userData);
      return {
        user_email: userData.user_email,
        otp: response.data?.otp || response.user_otp,
        otp_expiry: response.data?.otp_expiry || response.user_otp_expiry,
        emailSent: response.emailSent !== false
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);

      // Handle timeout scenario - check if OTP was generated but email failed
      if (response.timeout === true) {
        // Server indicates timeout but OTP was generated
        return {
          user_email: credentials.user_email,
          otp: response.otp, // Server should send OTP in timeout response
          otp_expiry: response.otp_expiry,
          timeout: true // Flag to indicate email may not have been sent
        };
      }

      if (!response.data?.user_otp && !response.user_otp) {
        throw new Error('OTP not received in response');
      }

      return {
        user_email: credentials.user_email,
        otp: response.data?.user_otp || response.user_otp,
        otp_expiry: response.data?.user_otp_expiry || response.user_otp_expiry
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyLogin = createAsyncThunk(
  'auth/verifyLogin',
  async ({ user_email, otp }, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyLogin({ user_email, otp });

      const userData = response.user || response.data?.user;
      const token = response.token || response.data?.token;

      if (!userData) {
        throw new Error('No user data received');
      }

      return { user: userData, token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyAuth();
      return response.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authApi.resendOtp(email);
      return {
        email,
        otp: response.user_otp,
        otp_expiry: response.user_otp_expiry
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
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
  authChecked: false
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
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      removeAuthToken();
      removeCookieToken();
      Object.assign(state, {
        ...initialState,
        token: null,
        isAuthenticated: false,
        authChecked: state.authChecked // Keep authChecked state
      });
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.step = 2;
        state.formData.email = payload.user_email;
        toast.success('OTP sent to your email!');
      })

      // Login
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.step = 2;
        state.formData.email = payload.user_email;
        state.otp = payload.otp;
        state.error = null;
        toast.success('OTP sent to your email! Check your inbox.');
      })

      // Verify Login
      .addCase(verifyLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        state.otp = '';
        state.authChecked = true;
        state.error = null;
        toast.success('Login successful!');
      })

      // Verify Auth
      .addCase(verifyAuth.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.authChecked = true;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.authChecked = true;
      })

      // Resend OTP
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success('New OTP sent to your email! Check your inbox.');
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.step = 1;
        state.loading = false;
        toast.success('Logged out successfully!');
      })

      // Pending matcher
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // Rejected matcher
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
          if (payload) {
            toast.error(payload);
          }
        }
      );
  }
});

export const {
  setStep,
  updateFormData,
  setOtp,
  setToken,
  setUser,
  resetAuth,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;