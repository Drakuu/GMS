(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__92caf4cc._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/lib/constants.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "PERMISSIONS": ()=>PERMISSIONS,
    "ROLES": ()=>ROLES
});
const ROLES = {
    SUPER_ADMIN: 'super-admin',
    ADMIN: 'admin',
    USER: 'user'
};
const PERMISSIONS = {
    [ROLES.SUPER_ADMIN]: [
        '*'
    ],
    [ROLES.ADMIN]: [
        'dashboard',
        'users',
        'settings'
    ],
    [ROLES.USER]: [
        'dashboard',
        'profile'
    ]
};
}),
"[project]/middleware.js [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "middleware": ()=>middleware
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.js [middleware-edge] (ecmascript)");
;
;
function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('accessToken')?.value;
    const role = request.cookies.get('role')?.value;
    // Redirect unauthenticated users
    if (!token && !pathname.startsWith('/auth')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/auth/login', request.url));
    }
    // Role-based access control
    if (token) {
        if (pathname.startsWith('/super-admin') && role !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ROLES"].SUPER_ADMIN) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/not-found', request.url));
        }
        if (pathname.startsWith('/admin') && role !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ROLES"].ADMIN) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/not-found', request.url));
        }
        if (pathname.startsWith('/user') && role !== __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["ROLES"].USER) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/not-found', request.url));
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__92caf4cc._.js.map