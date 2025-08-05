'use client';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Import all images
import stretchingRecovery from "@/public/landing-page/stretching-recovery.jpg";

const GymLanding = () => {
    return (
        < section className = "py-32 relative" >
                <div className="absolute inset-0">
                    <Image
                        src={stretchingRecovery}
                        alt="Stretching recovery"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/80" />
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 text-white">
                        Ready to Transform Your Life?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of members who have already transformed their bodies and minds
                    </p>
                    <Button variant="gym" size="lg" className="text-lg px-8 py-6">
                        Get Started Today
                    </Button>
                </div>
            </section >
    );
};

export default GymLanding;