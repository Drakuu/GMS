module.exports = {

"[project]/.next-internal/server/app/(api)/auth/login/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/utils/connectDB.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
(()=>{
    const e = new Error("Cannot find module 'mongoose'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
const connectDB = async ()=>{
    if (mongoose.connections[0].readyState) {
        console.log('✅ Already connected to MongoDB');
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};
const __TURBOPACK__default__export__ = connectDB;
}),
"[project]/utils/authUtils.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createAuthToken": ()=>createAuthToken,
    "createTempToken": ()=>createTempToken,
    "decodeToken": ()=>decodeToken,
    "generateOTP": ()=>generateOTP,
    "generateToken": ()=>generateToken
});
(()=>{
    const e = new Error("Cannot find module 'next-auth/jwt'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'jsonwebtoken'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
const generateOTP = ()=>{
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated OTP: ${otp}`);
    return otp;
};
const generateToken = (user)=>{
    const payload = {
        userId: user._id,
        user_email: user.user_email,
        user_role: user.user_role,
        gym_id: user.gym_id
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    console.log('Generated JWT with payload:', payload);
    return token;
};
const createTempToken = async (email)=>{
    return await encode({
        token: {
            email,
            purpose: 'otp_verification'
        },
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 7 * 60 // 7 minutes
    });
};
const decodeToken = async (token)=>{
    return await decode({
        token,
        secret: process.env.NEXTAUTH_SECRET
    });
};
const createAuthToken = async (user)=>{
    return await encode({
        token: {
            userId: user._id,
            email: user.user_email,
            name: user.user_name,
            role: user.user_role // Changed from user.role to user.user_role
        },
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 30 * 24 * 60 * 60 // 30 days
    });
};
}),
"[project]/app/(api)/auth/login/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'bcryptjs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/models/user.model'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$connectDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/connectDB.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$authUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/authUtils.js [app-route] (ecmascript)");
;
;
;
;
;
async function POST(req) {
    try {
        const { user_email, user_password } = await req.json();
        if (!user_email || !user_password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Email and password are required"
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$connectDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // Find user by user_email
        const user = await User.findOne({
            user_email
        });
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Invalid credentials"
            }, {
                status: 400
            });
        }
        if (!user.is_verified) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Please verify your email first"
            }, {
                status: 400
            });
        }
        // Compare passwords
        const match = await bcrypt.compare(user_password, user.user_password);
        if (!match) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Invalid credentials"
            }, {
                status: 400
            });
        }
        // Generate and save OTP
        const otp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$authUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateOTP"])();
        const expiryTime = new Date(Date.now() + 7 * 60 * 1000); // exact date-time for expiry
        user.user_otp = otp;
        user.user_otp_expiry = expiryTime;
        await user.save();
        // Create temp token
        const tempToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$authUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createTempToken"])(user.user_email);
        // Log in console
        console.log(`OTP for ${user_email}: ${otp}, Expires at: ${expiryTime}`);
        // Return response including OTP & expiry (for testing; remove in production)
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "OTP sent to email",
            user_otp: otp,
            user_otp_expiry: expiryTime
        }, {
            status: 200
        });
        // Set cookie
        response.cookies.set('otp-verification-token', tempToken, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            sameSite: 'strict',
            maxAge: 7 * 60 // 7 minutes
        });
        return response;
    } catch (err) {
        console.error("Login error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Server error",
            error: err.message
        }, {
            status: 500
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__f3a916d4._.js.map