'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dumbbell, Users, Trophy, Star, Clock, MapPin, Phone, Mail } from "lucide-react";

// Import all images
import stretchingRecovery from "@/public/landing-page/stretching-recovery.jpg";

const GymLanding = () => {
    return (
        < section className = "py-20 bg-background" >
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image
                            src={stretchingRecovery}
                            alt="Fitness consultation"
                            width={800}
                            height={600}
                            className="rounded-lg shadow-card"
                        />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black mb-8 text-foreground">
                            Get In <span className="text-primary">Touch</span>
                        </h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input placeholder="Full Name" className="bg-secondary border-border" />
                                <Input placeholder="Email" type="email" className="bg-secondary border-border" />
                            </div>
                            <Input placeholder="Phone Number" className="bg-secondary border-border" />
                            <Textarea placeholder="Message" rows={5} className="bg-secondary border-border" />
                            <Button variant="gym" size="lg" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            </section >
    );
};

export default GymLanding;