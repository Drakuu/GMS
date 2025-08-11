module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/store/slices/authSlice.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
// Helper functions for safe localStorage access
// In your authSlice.js
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return null;
};
// Add this function to check cookies
const getCookieToken = ()=>{
    if (typeof document !== 'undefined') {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; auth-token=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    return null;
};
const setAuthToken = (token)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
const removeAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
// Configure axios instance
const authAxios = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: '/auth',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Update axios headers with token
const updateAxiosHeaders = (token)=>{
    if (token) {
        authAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete authAxios.defaults.headers.common['Authorization'];
    }
};
// Initialize headers
updateAxiosHeaders(getAuthToken());
const signupUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/signup', async (userData, { rejectWithValue })=>{
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
});
const verifySignup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/verifySignup', async ({ user_email, user_otp }, { rejectWithValue })=>{
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
        return rejectWithValue(error.response?.data?.message || error.response?.data?.error || 'Verification failed');
    }
});
const loginUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/login', async (credentials, { rejectWithValue })=>{
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
        return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
});
const verifyLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/verifyLogin', async ({ user_email, otp }, { rejectWithValue })=>{
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
        console.error('VerifyLogin error:', error);
        return rejectWithValue(error.response?.data?.message || 'Verification failed. Please try again.');
    }
});
const resendOtp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/resendOtp', async (email, { rejectWithValue })=>{
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
        return rejectWithValue(error.response?.data?.message || 'Failed to resend OTP');
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
    token: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
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
        }).addCase(signupUser.fulfilled, (state, { payload })=>{
            state.loading = false;
            state.step = 2;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('OTP sent to your email!');
        }).addCase(signupUser.rejected, (state, { payload })=>{
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(payload);
        })// Verify Signup
        .addCase(verifySignup.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(verifySignup.fulfilled, (state, { payload })=>{
            state.loading = false;
            state.user = payload.user;
            state.token = payload.token;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Account verified successfully!');
        }).addCase(verifySignup.rejected, (state, { payload })=>{
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(payload);
        })// Login
        .addCase(loginUser.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(loginUser.fulfilled, (state, { payload })=>{
            state.loading = false;
            state.step = 2;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('OTP sent to your email!');
        }).addCase(loginUser.rejected, (state, { payload })=>{
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(payload);
        })// Verify Login
        .addCase(verifyLogin.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(verifyLogin.fulfilled, (state, { payload })=>{
            state.loading = false;
            state.user = payload.user; // Make sure this is being set
            state.token = payload.token; // And this
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('Login successful!');
        }).addCase(verifyLogin.rejected, (state, { payload })=>{
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(payload);
        })// Resend OTP
        .addCase(resendOtp.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(resendOtp.fulfilled, (state)=>{
            state.loading = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success('New OTP sent to your email!');
        }).addCase(resendOtp.rejected, (state, { payload })=>{
            state.loading = false;
            state.error = payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(payload);
        });
    }
});
const { setStep, updateFormData, setOtp, setToken, logout, resetAuth } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
}),
"[project]/store/store.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// store/store.js
__turbopack_context__.s({
    "store": ()=>store
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/authSlice.js [app-ssr] (ecmascript)");
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$authSlice$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    }
});
}),
"[project]/app/providers.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// app/providers.jsx
__turbopack_context__.s({
    "Providers": ()=>Providers
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/store.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/app/providers.js",
        lineNumber: 7,
        columnNumber: 10
    }, this);
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__fd6f9b01._.js.map