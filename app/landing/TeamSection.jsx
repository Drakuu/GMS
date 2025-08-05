'use client';
import Image from "next/image";

// Import all images
import trainer1 from "@/public/landing-page/trainer-1.jpg";
import trainer2 from "@/public/landing-page/trainer-2.jpg";
import trainer3 from "@/public/landing-page/trainer-3.jpg";
import trainer4 from "@/public/landing-page/trainer-4.jpg";

const GymLanding = () => {
    return (
        < section className = "py-20 bg-secondary" >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-foreground">
                    Meet Our <span className="text-primary">Trainers</span>
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { image: trainer1, name: "Mike Johnson", role: "Head Trainer" },
                        { image: trainer2, name: "Sarah Wilson", role: "Fitness Coach" },
                        { image: trainer3, name: "David Brown", role: "Strength Coach" },
                        { image: trainer4, name: "Lisa Garcia", role: "Wellness Expert" },
                    ].map((trainer, index) => (
                        <div key={index} className="text-center">
                            <div className="relative mb-6 group">
                                <Image
                                    src={trainer.image}
                                    alt={trainer.name}
                                    width={200}
                                    height={200}
                                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-card group-hover:shadow-glow transition-all duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-foreground">{trainer.name}</h3>
                            <p className="text-primary font-semibold">{trainer.role}</p>
                        </div>
                    ))}
                </div>
            </div>
            </section >
    );
};

export default GymLanding;