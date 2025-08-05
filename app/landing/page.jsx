'use client';
import HeaderSection from './HeaderSection';
import HeroSection from './HeroSection';
import WhyChooseUs from "./WhyChooseUs";
import AboutSection from "./AboutSection";
import ProgramSection from "./ProgramsSection";
import CTASection from "./CTASection";
import PricingSrction from "./PricingSection";
import TeamSection from "./TeamSection";
import ContactSection from "./ContactSection";
import BlogSection from "./BlogSection";
import FooterSection from "./FooterSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background font-display divide-y-2 divide-gray-400">
      <HeaderSection />
      <HeroSection />
      < WhyChooseUs />
      <AboutSection />
      <ProgramSection />
      <CTASection />
      <PricingSrction />
      <TeamSection />
      <ContactSection />
      <BlogSection />
      <FooterSection />
    </main >
  );
}
