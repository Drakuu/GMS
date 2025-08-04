// app/(auth)/layout.jsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        {children}
      </div>
    </div>
  );
}