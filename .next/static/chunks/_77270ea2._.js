(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/constants.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "ROLES": ()=>ROLES
});
const ROLES = {
    SUPER_ADMIN: 'super-admin',
    ADMIN: 'admin',
    USER: 'user'
}; // export const PERMISSIONS = {
 //   [ROLES.SUPER_ADMIN]: ['*'],
 //   [ROLES.ADMIN]: ['dashboard', 'users', 'settings'],
 //   [ROLES.USER]: ['dashboard', 'profile']
 // };
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/routes.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SIDEBAR_ROUTES": ()=>SIDEBAR_ROUTES
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants.js [app-client] (ecmascript)");
;
;
;
const SIDEBAR_ROUTES = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].SUPER_ADMIN]: [
        {
            name: 'Dashboard',
            path: '/super-admin/dashboard',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/lib/routes.js",
                lineNumber: 9,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            name: 'User Management',
            path: '/super-admin/users',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/lib/routes.js",
                lineNumber: 14,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            children: [
                {
                    name: 'Admins',
                    path: '/super-admin/users/admins'
                },
                {
                    name: 'Customers',
                    path: '/super-admin/users/customers'
                }
            ]
        }
    ],
    [__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].ADMIN]: [
        {
            name: 'Dashboard',
            path: '/admin/dashboard',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/lib/routes.js",
                lineNumber: 25,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        }
    ],
    [__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLES"].USER]: [
        {
            name: 'Dashboard',
            path: '/user/dashboard',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"], {
                size: 18
            }, void 0, false, {
                fileName: "[project]/lib/routes.js",
                lineNumber: 32,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "cn": ()=>cn
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/ui/accordion.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Accordion": ()=>Accordion,
    "AccordionContent": ()=>AccordionContent,
    "AccordionItem": ()=>AccordionItem,
    "AccordionTrigger": ()=>AccordionTrigger
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-accordion/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function Accordion(param) {
    let { ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "accordion",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/accordion.jsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Accordion;
function AccordionItem(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "accordion-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b last:border-b-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/accordion.jsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = AccordionItem;
function AccordionTrigger(param) {
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
        className: "flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
            "data-slot": "accordion-trigger",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
                }, void 0, false, {
                    fileName: "[project]/components/ui/accordion.jsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/accordion.jsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/accordion.jsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = AccordionTrigger;
function AccordionContent(param) {
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "accordion-content",
        className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pt-0 pb-4", className),
            children: children
        }, void 0, false, {
            fileName: "[project]/components/ui/accordion.jsx",
            lineNumber: 59,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/accordion.jsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c3 = AccordionContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Accordion");
__turbopack_context__.k.register(_c1, "AccordionItem");
__turbopack_context__.k.register(_c2, "AccordionTrigger");
__turbopack_context__.k.register(_c3, "AccordionContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/layout/SuperAdminSidebar.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/layout/SuperAdminSidebar.jsx
__turbopack_context__.s({
    "default": ()=>SuperAdminSidebar
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$routes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/routes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/accordion.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function SuperAdminSidebar() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const role = "super-admin";
    const routes = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$routes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIDEBAR_ROUTES"][role] || [];
    console.log("the routes are", routes);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "w-64 h-full px-3 py-6 bg-background border-r z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-1",
            children: routes.map((route)=>route.children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Accordion"], {
                    type: "single",
                    collapsible: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                        value: route.name,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                className: "flex items-center gap-2 p-2 hover:bg-accent rounded-md",
                                children: [
                                    route.icon,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: route.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/layout/SuperAdminSidebar.jsx",
                                        lineNumber: 23,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/layout/SuperAdminSidebar.jsx",
                                lineNumber: 21,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$accordion$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                className: "ml-6 pl-2 border-l",
                                children: route.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: child.path,
                                        className: "block p-2 rounded-md ".concat(pathname === child.path ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'),
                                        children: child.name
                                    }, child.path, false, {
                                        fileName: "[project]/components/layout/SuperAdminSidebar.jsx",
                                        lineNumber: 27,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/layout/SuperAdminSidebar.jsx",
                                lineNumber: 25,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/layout/SuperAdminSidebar.jsx",
                        lineNumber: 20,
                        columnNumber: 15
                    }, this)
                }, route.path, false, {
                    fileName: "[project]/components/layout/SuperAdminSidebar.jsx",
                    lineNumber: 19,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: route.path,
                    className: "flex items-center gap-2 p-2 rounded-md ".concat(pathname === route.path ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'),
                    children: [
                        route.icon,
                        route.name
                    ]
                }, route.path, true, {
                    fileName: "[project]/components/layout/SuperAdminSidebar.jsx",
                    lineNumber: 39,
                    columnNumber: 13
                }, this))
        }, void 0, false, {
            fileName: "[project]/components/layout/SuperAdminSidebar.jsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/SuperAdminSidebar.jsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(SuperAdminSidebar, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = SuperAdminSidebar;
var _c;
__turbopack_context__.k.register(_c, "SuperAdminSidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/layout/Header.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// // components/layout/Header.jsx
// 'use client';
// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import { useSelector } from 'react-redux';
// import { 
//   Bell, 
//   Menu, 
//   Search, 
//   User, 
//   ChevronDown,
//   LogOut,
//   Settings,
//   LifeBuoy
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';
// import { ROLES } from '@/lib/constants';
// export default function Header() {
//   const pathname = usePathname();
//   const { user, role } = useSelector(state => state.auth);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const getHeaderTitle = () => {
//     if (pathname.includes('super-admin')) return 'Super Admin Dashboard';
//     if (pathname.includes('admin')) return 'Admin Dashboard';
//     if (pathname.includes('user')) return 'User Dashboard';
//     return 'Dashboard';
//   };
//   return (
//     <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between px-4">
//         {/* Left side - Mobile menu and title */}
//         <div className="flex items-center gap-4">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="md:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <Menu className="h-5 w-5" />
//             <span className="sr-only">Toggle menu</span>
//           </Button>
//           <h1 className="text-lg font-semibold">{getHeaderTitle()}</h1>
//         </div>
//         {/* Middle - Search (desktop only) */}
//         <div className="hidden md:flex flex-1 max-w-md mx-4">
//           <div className="relative w-full">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search..."
//               className="w-full pl-10"
//             />
//           </div>
//         </div>
//         {/* Right side - User controls */}
//         <div className="flex items-center gap-2">
//           <Button variant="ghost" size="icon" className="rounded-full">
//             <Bell className="h-5 w-5" />
//             <span className="sr-only">Notifications</span>
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className="flex items-center gap-2 px-2"
//               >
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
//                     <User className="h-4 w-4 text-primary" />
//                   </div>
//                   <div className="hidden md:flex flex-col items-start">
//                     <span className="text-sm font-medium">
//                       {user?.name || 'User'}
//                     </span>
//                     <span className="text-xs text-muted-foreground">
//                       {role ? ROLES[role.toUpperCase()] : 'Guest'}
//                     </span>
//                   </div>
//                 </div>
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-56">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <LifeBuoy className="mr-2 h-4 w-4" />
//                 <span>Support</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem className="text-destructive focus:text-destructive">
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// }
// components/Header.jsx
__turbopack_context__.s({
    "default": ()=>Header
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
'use client';
;
;
function Header(param) {
    let { role } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "bg-white shadow p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto flex justify-between items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "font-bold text-xl",
                    children: [
                        role === 'super-admin' && 'Super Admin Dashboard',
                        role === 'admin' && 'Admin Dashboard',
                        role === 'user' && 'User Dashboard'
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/layout/Header.jsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "flex gap-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "text-blue-600 hover:underline",
                        children: "Logout"
                    }, void 0, false, {
                        fileName: "[project]/components/layout/Header.jsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/layout/Header.jsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/layout/Header.jsx",
            lineNumber: 136,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/layout/Header.jsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/super-admin/layout.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/super-admin/layout.jsx
__turbopack_context__.s({
    "default": ()=>SuperAdminLayout
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$SuperAdminSidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/SuperAdminSidebar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/Header.jsx [app-client] (ecmascript)");
'use client';
;
;
;
function SuperAdminLayout(param) {
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$SuperAdminSidebar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/super-admin/layout.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col overflow-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$Header$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        role: "super-admin"
                    }, void 0, false, {
                        fileName: "[project]/app/super-admin/layout.jsx",
                        lineNumber: 11,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 p-4 overflow-auto",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/app/super-admin/layout.jsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/super-admin/layout.jsx",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/super-admin/layout.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = SuperAdminLayout;
var _c;
__turbopack_context__.k.register(_c, "SuperAdminLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_77270ea2._.js.map