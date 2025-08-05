'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Import all images
import strengthTraining from "@/public/landing-page/strength-training.jpg";
import cardioWorkout from "@/public/landing-page/cardio-workout.jpg";

const GymLanding = () => {
    return (
        < section className = "py-20 bg-secondary" >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-foreground">
                    Latest <span className="text-primary">Blog Posts</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <Card className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300">
                        <div className="relative h-48">
                            <Image
                                src={strengthTraining}
                                alt="Blog post"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="text-primary text-sm font-semibold mb-2">January 15, 2024</div>
                            <h3 className="text-xl font-bold mb-4 text-foreground">5 Essential Strength Training Tips for Beginners</h3>
                            <p className="text-muted-foreground mb-4">
                                Discover the fundamental principles of strength training that will help you build muscle safely and effectively.
                            </p>
                            <Button variant="gym" size="sm">
                                Read More
                            </Button>
                        </div>
                    </Card>
                    <Card className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300">
                        <div className="relative h-48">
                            <Image
                                src={cardioWorkout}
                                alt="Blog post"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <div className="text-primary text-sm font-semibold mb-2">January 10, 2024</div>
                            <h3 className="text-xl font-bold mb-4 text-foreground">The Ultimate Guide to Cardio Training</h3>
                            <p className="text-muted-foreground mb-4">
                                Learn how to maximize your cardiovascular fitness with these proven cardio techniques and strategies.
                            </p>
                            <Button variant="gym" size="sm">
                                Read More
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
            </section >
    );
};

export default GymLanding;