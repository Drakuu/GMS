export default function Register() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input 
            type="text" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <a href="/auth/login" className="text-blue-600 hover:underline">
          Already have an account? Login
        </a>
      </div>
    </>
  );
}