module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
(()=>{
    const e = new Error("Cannot find module 'axios'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
;
;
;
// Helper functions for safe localStorage access
const getAuthToken = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
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
// Axios headers configuration
const getAuthHeaders = ()=>{
    const jwtLoginToken = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...jwtLoginToken && {
            'Authorization': `Bearer ${jwtLoginToken}`
        }
    };
};
// Configure axios instance
const authAxios = axios.create({
    baseURL: '/auth',
    headers: getAuthHeaders()
});
const signupUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/signup', async (userData, { rejectWithValue })=>{
    try {
        const response = await authAxios.post('/signup', userData);
        return {
            email: userData.email
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
});
const verifySignup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/verifySignup', async ({ email, otp }, { rejectWithValue })=>{
    try {
        const response = await authAxios.post('/verify-signup', {
            email,
            otp
        });
        if (response.data.token) {
            setAuthToken(response.data.token);
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Verification failed');
    }
});
const loginUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/login', async (credentials, { rejectWithValue })=>{
    try {
        const response = await authAxios.post('/login', credentials);
        return {
            email: credentials.email
        };
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});
const verifyLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/verifyLogin', async ({ email, otp }, { rejectWithValue })=>{
    try {
        const response = await authAxios.post('/verify-login', {
            email,
            otp
        });
        if (response.data.token) {
            setAuthToken(response.data.token);
        }
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Verification failed');
    }
});
const resendOtp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/resendOtp', async (email, { rejectWithValue })=>{
    try {
        await authAxios.post('/resend-otp', {
            email
        });
        return {
            email
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
        role: 'member',
        gymId: null
    },
    otp: '',
    token: getAuthToken()
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
            // Update axios headers with new token
            authAxios.defaults.headers = getAuthHeaders();
        },
        logout: (state)=>{
            state.user = null;
            state.token = null;
            removeAuthToken();
            // Clear axios auth header
            delete authAxios.defaults.headers['Authorization'];
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
            state.user = payload;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__8ab51576._.js.map