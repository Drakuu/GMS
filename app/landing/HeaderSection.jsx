'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import logo from '@/public/landing-page/logo.png'; // Replace with your actual logo path

export default function Header() {
  return (
    <header className="absolute top-0 z-30 w-full px-8 py-6 flex justify-around items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={logo} alt="Logo" width={70} height={70} />
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-white font-medium">
        <Link href="#" className="hover:text-primary transition">Home</Link>
        <Link href="#" className="hover:text-primary transition">About</Link>
        <Link href="#" className="hover:text-primary transition">Services</Link>
        <Link href="#" className="hover:text-primary transition">Trainers</Link>
        <Link href="#" className="hover:text-primary transition">Pricing</Link>
        <Link href="#" className="hover:text-primary transition">Coming Soon</Link>
      </nav>

      {/* Contact CTA */}
      <Button className="bg-primary text-black font-semibold rounded-full hover:bg-white transition px-6">
        Contact
      </Button>
    </header>
  );
}
