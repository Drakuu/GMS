// // app/(auth)/login/page.jsx
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export default function LoginPage() {
//   return (
//     <Card>
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl">Login to your account</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="email">Email</Label>
//             <Input id="email" type="email" placeholder="you@example.com" />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" type="password" />
//           </div>
//           <Button className="w-full">Sign In</Button>
//         </form>
        
//         <div className="mt-4 text-center text-sm">
//           Don't have an account?{' '}
//           <a href="/auth/register" className="underline text-primary">
//             Register
//           </a>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// app/(auth)/login/page.jsx
'use client';
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('super-admin');

  const handleLogin = () => {
    // Simulate login and redirect based on role
    if (role === 'super-admin') router.push('/super-admin/dashboard');
    else if (role === 'admin') router.push('/admin/dashboard');
    else router.push('/user/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="super-admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
