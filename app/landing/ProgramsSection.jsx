'use client';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Import all images
import strengthTraining from "@/public/landing-page/strength-training.jpg";
import cardioWorkout from "@/public/landing-page/cardio-workout.jpg";
import weightLoss from "@/public/landing-page/weight-loss.jpg";
import functionalTraining from "@/public/landing-page/functional-training.jpg";

const GymLanding = () => {
  return (
    < section className = "py-20 bg-secondary" >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-foreground">
          Our <span className="text-primary">Programs</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { image: strengthTraining, title: "Strength Training", description: "Build muscle and power" },
            { image: cardioWorkout, title: "Cardio", description: "Improve endurance" },
            { image: weightLoss, title: "Weight Loss", description: "Burn fat effectively" },
            { image: functionalTraining, title: "Functional", description: "Real-world movements" },
          ].map((program, index) => (
            <Card key={index} className="overflow-hidden bg-card border-border hover:shadow-card transition-all duration-300 group">
              <div className="relative overflow-hidden h-48">
                <Image
                  src={program.image}
                  alt={program.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{program.title}</h3>
                <p className="text-muted-foreground mb-4">{program.description}</p>
                <Button variant="gym" size="sm">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      </section >
  );
};

export default GymLanding;