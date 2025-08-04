// app/page.jsx
// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
//       {/* Header */}
//       <header className="p-6 flex justify-between items-center">
//         <div className="text-2xl font-bold text-sky-600">YourSaaS</div>
//         <Link 
//           href="/auth/login" 
//           className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
//         >
//           Login
//         </Link>
//       </header>

//       {/* Hero Section */}
//       <section className="container mx-auto px-6 py-20 text-center">
//         <h1 className="text-5xl font-bold text-gray-800 mb-6">
//           Welcome to YourSaaS
//         </h1>
//         <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
//           The best solution for your business needs. Get started today.
//         </p>
//         <div className="flex justify-center gap-4">
//           <Link 
//             href="/auth/login" 
//             className="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition text-lg"
//           >
//             Get Started
//           </Link>
//           <Link 
//             href="#features" 
//             className="px-8 py-3 border border-sky-600 text-sky-600 rounded-lg hover:bg-sky-50 transition text-lg"
//           >
//             Learn More
//           </Link>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-white">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
//           {/* Add your features here */}
//         </div>
//       </section>
//     </div>
//   );
// }

'use client';
import Link from 'next/link';

export default function HeaderSection() {
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-blue-600">My SaaS App</h1>
      <div>
        <Link href="/login">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Login
          </button>
        </Link>
      </div>
    </header>
  );
}
