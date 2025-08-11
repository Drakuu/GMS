module.exports = {

"[project]/.next-internal/server/app/(api)/auth/verify-signup/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {

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
"[externals]/mongoose [external] (mongoose, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/models/user.model.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const userSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
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
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
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
const User = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.User || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('User', userSchema);
const __TURBOPACK__default__export__ = User;
}),
"[project]/utils/connectDB.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const connectDB = async ()=>{
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connections[0].readyState) {
        console.log('✅ Already connected to MongoDB');
        return;
    }
    try {
        const conn = await __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(process.env.MONGODB_URI, {
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
"[externals]/crypto [external] (crypto, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

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
"[externals]/events [external] (events, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt/index.js [app-route] (ecmascript)");
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
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])({
        token: {
            email,
            purpose: 'otp_verification'
        },
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 7 * 60 // 7 minutes
    });
};
const decodeToken = async (token)=>{
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decode"])({
        token,
        secret: process.env.NEXTAUTH_SECRET
    });
};
const createAuthToken = async (user)=>{
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encode"])({
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
"[project]/app/(api)/auth/verify-signup/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "POST": ()=>POST
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$user$2e$model$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/user.model.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$connectDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/connectDB.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$authUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/authUtils.js [app-route] (ecmascript)");
;
;
;
;
async function POST(req) {
    try {
        const { user_email, user_otp } = await req.json();
        // Validation
        if (!user_email || !user_otp) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Email and OTP are required",
                errors: {
                    ...!user_email && {
                        user_email: "Email is required"
                    },
                    ...!user_otp && {
                        user_otp: "OTP is required"
                    }
                }
            }, {
                status: 400
            });
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$connectDB$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // Find user with case-insensitive email match
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$user$2e$model$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
            user_email: {
                $regex: new RegExp(`^${user_email}$`, 'i')
            }
        });
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "User not found",
                error: "No account exists with this email"
            }, {
                status: 404
            });
        }
        // OTP verification
        if (user.user_otp !== user_otp) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "Invalid OTP",
                error: "The OTP you entered is incorrect"
            }, {
                status: 400
            });
        }
        // OTP expiry check
        if (user.user_otp_expiry < Date.now()) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                message: "OTP expired",
                error: "The OTP has expired. Please request a new one"
            }, {
                status: 400
            });
        }
        // Update user
        user.is_verified = true;
        user.user_otp = undefined;
        user.user_otp_expiry = undefined;
        await user.save();
        // Generate token
        const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$authUtils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateToken"])(user);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Account verified successfully",
            data: {
                token,
                user: {
                    id: user._id,
                    user_email: user.user_email,
                    user_name: user.user_name,
                    user_role: user.user_role,
                    is_verified: user.is_verified
                }
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Verification error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: "Verification failed",
            error: error.message
        }, {
            status: 500
        });
    }
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__0d45c0da._.js.map