// utils/responseHelper.js
export const apiResponse = {
   success: (data = {}, message = "Success", status = 200) => {
      return NextResponse.json({
         success: true,
         status,
         message,
         data,
         timestamp: new Date().toISOString()
      }, { status });
   },

   error: (message = "Error", errors = {}, status = 400) => {
      return NextResponse.json({
         success: false,
         status,
         message,
         errors,
         timestamp: new Date().toISOString()
      }, { status });
   },

   serverError: (error = "Server error", status = 500) => {
      return NextResponse.json({
         success: false,
         status,
         message: "Internal server error",
         error: process.env.NODE_ENV === 'production' ? undefined : error,
         timestamp: new Date().toISOString()
      }, { status });
   },

   rateLimitError: (message = "Too many requests", status = 429) => {
      return NextResponse.json({
         success: false,
         status,
         message,
         error: "Please try again later",
         timestamp: new Date().toISOString()
      }, { status });
   }
};