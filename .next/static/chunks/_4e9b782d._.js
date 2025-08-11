(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/store/slices/authSlice.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// store/slices/authSlice.js
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__,
    "loginUser": ()=>loginUser,
    "logout": ()=>logout,
    "resendOtp": ()=>resendOtp,
    "resetAuth": ()=>resetAuth,
    "setOtp": ()=>setOtp,
    "setStep": ()=>setStep,
    "setToken": ()=>setToken,
    "signupUser": ()=>signupUser,
    "updateFormData": ()=>updateFormData,
    "verifyLogin": ()=>verifyLogin,
    "verifySignup": ()=>verifySignup
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
;
;
// Helper functions for safe localStorage access
// In your authSlice.js
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const token = localStorage.getItem('auth-token');
        console.log('Retrieved token from localStorage:', token);
        return token;
    }
    //TURBOPACK unreachable
    ;
};
// Add this function to check cookies
const getCookieToken = ()=>{
    if (typeof document !== 'undefined') {
        const value = "; ".concat(document.cookie);
        const parts = value.split("; auth-token=");
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    return null;
};
const setAuthToken = (token)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        console.log('Saving token to localStorage:', token);
        localStorage.setItem('auth-token', token);
    }
};
const removeAuthToken = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('otp-verification-token');
    }
};
// Configure axios instance
const authAxios = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: '/auth',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Update axios headers with token
const updateAxiosHeaders = (token)=>{
    if (token) {
        authAxios.defaults.headers.common['Authorization'] = "Bearer ".concat(token);
    } else {
        delete authAxios.defaults.headers.common['Authorization'];
    }
};
// Initialize headers
updateAxiosHeaders(getAuthToken());
const signupUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/signup', async (userData, param)=>{
    let { rejectWithValue } = param;
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
        var _error_response, _error_response_data, _error_response1;
        console.error("Signup error details:", (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.data);
        return rejectWithValue(((_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : (_error_response_data = _error_response1.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || 'Signup failed');
    }
});
const verifySignup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/verifySignup', async (param, param1)=>{
    let { user_email, user_otp } = param, { rejectWithValue } = param1;
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
        var _error_response, _error_response_data, _error_response1, _error_response_data1, _error_response2;
        console.error("Verification error:", (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.data);
        return rejectWithValue(((_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : (_error_response_data = _error_response1.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || ((_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : (_error_response_data1 = _error_response2.data) === null || _error_response_data1 === void 0 ? void 0 : _error_response_data1.error) || 'Verification failed');
    }
});
const loginUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/login', async (credentials, param)=>{
    let { rejectWithValue } = param;
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
        var _error_response_data, _error_response;
        return rejectWithValue(((_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || error.message || 'Login failed');
    }
});
const verifyLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/verifyLogin', async (param, param1)=>{
    let { user_email, otp } = param, { rejectWithValue } = param1;
    try {
        const response = await authAxios.post('/verify-login', {
            user_email,
            otp
        }, {
            withCredentials: true // Crucial for cookies
        });
        // Debugging logs
        console.log('VerifyLogin response:', {
            data: response.data,
            headers: response.headers,
            cookies: document.cookie
        });
        const token = response.data.token || getCookieToken();
        if (token) {
            setAuthToken(token); // Save to localStorage
            updateAxiosHeaders(token);
        }
        return {
            user: response.data.user,
            token: token
        };
    } catch (error) {
        var _error_response_data, _error_response;
        console.error('VerifyLogin error:', error);
        return rejectWithValue(((_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || 'Verification failed. Please try again.');
    }
});
const resendOtp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/resendOtp', async (email, param)=>{
    let { rejectWithValue } = param;
    try {
        const response = await authAxios.post('/resend-otp', {
            user_email: email
        });
        return {
            email,
            otp: response.data.user_otp,
            otp_expiry: response.data.user_otp_expiry
        };
    } catch (error) {
        var _error_response_data, _error_response;
        return rejectWithValue(((_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || 'Failed to resend OTP');
    }
});
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
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        setStep: (state, action)=>{
            state.step = action.payload;
        },
        updateFormData: (state, action)=>{
            state.formData = {
                ...state.formData,
                ...action.payload
            };
        },
        setOtp: (state, action)=>{
            state.otp = action.payload;
        },
        setToken: (state, action)=>{
            state.token = action.payload;
            setAuthToken(action.payload);
            updateAxiosHeaders(action.payload);
        },
        logout: (state)=>{
            state.user = null;
            state.token = null;
            removeAuthToken();
        },
        resetAuth: ()=>initialState
    },
    extraReducers: (builder)=>{
        builder// Signup
        .addCase(signupUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(signupUser.fulfilled, (state, param)=>{
            let { payload } = param;
            state.loading = false;
            state.step = 2;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('OTP sent to your email!');
        }).addCase(signupUser.rejected, (state, param)=>{
            let { payload } = param;
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(payload);
        })// Verify Signup
        .addCase(verifySignup.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(verifySignup.fulfilled, (state, param)=>{
            let { payload } = param;
            state.loading = false;
            state.user = payload.user;
            state.token = payload.token;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Account verified successfully!');
        }).addCase(verifySignup.rejected, (state, param)=>{
            let { payload } = param;
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(payload);
        })// Login
        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(loginUser.fulfilled, (state, param)=>{
            let { payload } = param;
            state.loading = false;
            state.step = 2;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('OTP sent to your email!');
        }).addCase(loginUser.rejected, (state, param)=>{
            let { payload } = param;
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(payload);
        })// Verify Login
        .addCase(verifyLogin.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(verifyLogin.fulfilled, (state, param)=>{
            let { payload } = param;
            state.loading = false;
            state.user = payload.user;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Login successful!');
        }).addCase(verifyLogin.rejected, (state, param)=>{
            let { payload } = param;
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(payload);
        })// Resend OTP
        .addCase(resendOtp.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(resendOtp.fulfilled, (state)=>{
            state.loading = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('New OTP sent to your email!');
        }).addCase(resendOtp.rejected, (state, param)=>{
            let { payload } = param;
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(payload);
        });
    }
});
const { setStep, updateFormData, setOtp, setToken, logout, resetAuth } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/store/store.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// store/store.js
__turbopack_context__.s({
    "store": ()=>store
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/authSlice.js [app-client] (ecmascript)");
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/providers.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/providers.jsx
__turbopack_context__.s({
    "Providers": ()=>Providers
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/store.js [app-client] (ecmascript)");
'use client';
;
;
;
function Providers(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/app/providers.js",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_4e9b782d._.js.map