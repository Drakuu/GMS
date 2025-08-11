module.exports = {

"[project]/.next-internal/server/app/(api)/auth/signup/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

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
"[externals]/crypto [external] (crypto, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/models/user.model.js [app-route] (ecmascript)": ((__turbopack_context__) => {
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
const userSchema = new mongoose.Schema({
    user_name: {
        type: String
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_phone: {
        type: String
    },
    user_password: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        enum: [
            "SuperAdmin",
            "Admin",
            "Trainer",
            "Member"
        ]
    },
    gym_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gym"
    },
    user_otp: {
        type: String
    },
    user_otp_expiry: {
        type: Date
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date
    },
    isDeleted: {
        type: Boolean
    }
}, {
    timestamps: true
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
const __TURBOPACK__default__export__ = User;
}),
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
"[externals]/buffer [external] (buffer, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-route] (ecmascript)");
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
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].sign(payload, process.env.JWT_SECRET, {
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
"[project]/app/(api)/auth/signup/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$user$2e$model$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/user.model.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$connectDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/connectDB.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$authUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/authUtils.js [app-route] (ecmascript)");
;
;
;
;
;
async function POST(req) {
    try {
        const { user_email, user_password, user_name, user_phone, user_role, gym_id } = await req.json();
        // Validation
        if (!user_email || !user_password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Email and password are required"
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$connectDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // Check if user already exists
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$user$2e$model$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            user_email
        });
        if (existing) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Email already registered"
            }, {
                status: 400
            });
        }
        // Hash password and generate OTP
        const hashed = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(user_password, 10);
        const otp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$authUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateOTP"])();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
        // Create new user
        const newUser = new __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$user$2e$model$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"]({
            user_email,
            user_password: hashed,
            user_name: user_name || '',
            user_phone: user_phone || '',
            user_role: user_role || 'Admin',
            gym_id: gym_id || null,
            user_otp: otp,
            user_otp_expiry: otpExpiry,
            is_verified: false
        });
        // Save user
        await newUser.save();
        // Generate proper JWT token
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$authUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateToken"])(newUser);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "OTP sent to email",
            data: {
                user_email: newUser.user_email,
                user_name: newUser.user_name,
                user_role: newUser.user_role,
                // For development only - remove in production:
                otp: ("TURBOPACK compile-time truthy", 1) ? otp : "TURBOPACK unreachable",
                otp_expiry: otpExpiry.toISOString()
            },
            token
        }, {
            status: 201
        });
    } catch (err) {
        console.error("Signup error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Server error",
            error: err.message
        }, {
            status: 500
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__edea9369._.js.map