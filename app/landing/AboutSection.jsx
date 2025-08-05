'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Import all images
import gymInterior from "@/public/landing-page/gym-interior.jpg";

const GymLanding = () => {
    return (
        < section className = "py-20 bg-background" >
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image
                            src={gymInterior}
                            alt="Modern gym interior"
                            width={800}
                            height={600}
                            className="rounded-lg shadow-card grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">
                            About Our <span className="text-primary">Gym</span>
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            Transform your body and mind at our world-class fitness facility. With cutting-edge equipment,
                            expert trainers, and a supportive community, we're here to help you achieve your fitness goals.
                        </p>
                        <Button variant="gym" size="lg" className="mr-4">
                            Learn More
                        </Button>
                        <Button variant="gymOutline" size="lg">
                            Contact Us
                        </Button>
                    </div>
                </div>
            </div>
            </section >
    );
};

export default GymLanding;