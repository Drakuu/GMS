'use client';

import Image from 'next/image';
import heroImage from '@/public/landing-page/hero-bg.png';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen text-white overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Gym Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-sky-950/40" />
      </div>

      {/* Social Icons - Vertical on left */}
      <div className="absolute top-1/3 left-6 z-10 flex flex-col gap-6 bg-accent p-2 rounded-b-2xl">
        {[
          { icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
          { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
          { icon: <Mail className="w-5 h-5" />, label: 'Email' },
          { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
        ].map((social, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-black transition-colors"
            aria-label={social.label}
          >
            {social.icon}
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto h-full px-6 flex flex-col justify-center items-start max-w-4xl pt-28">
        <p className="uppercase text-sm tracking-[0.3em] font-semibold mb-2 text-primary">
          XTREME FITNESS
        </p>
        
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-4">
          BE <span className="text-primary">STRONG</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-muted-foreground">
          Best GYM & Fitness Center Build Your Health.
        </p>

        <Button
          variant="outline"
          className="group border-white text-white px-6 py-4 rounded-full hover:bg-primary hover:text-black transition-all flex items-center gap-3"
        >
          Join us now
          <span className="bg-primary group-hover:bg-white p-2 rounded-full transition-colors">
            <Play className="w-4 h-4 text-black group-hover:text-primary" />
          </span>
        </Button>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 right-10 z-10 flex gap-2 items-center">
        <span className="w-3 h-3 rounded-full bg-primary" />
        <span className="w-2 h-2 rounded-full bg-white/40" />
        <span className="w-2 h-2 rounded-full bg-white/40" />
      </div>
    </section>
  );
}