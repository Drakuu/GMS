'use client';

import Image from 'next/image';

import {
  BatteryFull,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

import Chest from "@/public/landing-page/features/Chest.svg";
import DumbleLifting from "@/public/landing-page/features/Dumble-Liftting.svg";
import FlexingMuscle from "@/public/landing-page/features/Flexing-Musle.svg";

const features = [
  {
    title: 'Powerful Vitamins',
    description:
      'Auia voluptas sit asper natur aut odit aut fugi sed quia consequanta magni dolores eos',
    icon: <BatteryFull className="w-10 h-10 text-primary" />,
  },
  {
    title: 'Abdominal Sessions',
    description:
      'Ruia voluptas sit asper natur aut odit aut fugi sed quia consequanta magni dolores eos',
    icon: <Image src={Chest} alt="Chest Icon" className="w-10 h-10" />,
  },
  {
    title: 'Weight Lifting',
    description:
      'Duia voluptas sit asper natur aut odit aut fugi sed quia consequanta magni dolores eos',
    icon: <Image src={DumbleLifting} alt="Dumbbell Lifting" className="w-10 h-10" />,
  },
  {
    title: 'Flex Muscle',
    description:
      'Quia voluptas sit asper natur aut odit aut fugi sed quia consequanta magni dolores eos',
    icon: <Image src={FlexingMuscle} alt="Flexing Muscle Icon" className="w-10 h-10" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-background py-20 text-center">
      <div className="container mx-auto">
        <p className="text-primary tracking-widest font-semibold uppercase mb-2 text-sm">
          Why Choose Us
        </p>
        <h2 className="text-4xl font-extrabold text-foreground mb-12">
          Build Your Best Body
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="flex flex-col items-center gap-4 text-center bg-[#1c1c2e] text-white rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-primary">{feature.icon}</div>
              <CardTitle className="uppercase text-lg font-bold">
                {feature.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                {feature.description}
              </CardDescription>
              <p className="text-primary text-sm font-medium mt-4 cursor-pointer hover:underline">
                Read more
              </p>
            </Card>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-10">
          <button className="w-10 h-10 rounded-full bg-white text-black hover:bg-muted shadow flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white text-black hover:bg-muted shadow flex items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
