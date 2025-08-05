'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dumbbell, Users, Trophy, Star, Clock, MapPin, Phone, Mail } from "lucide-react";

const GymLanding = () => {
  return (
    < section className = "py-20 bg-background" >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-foreground">
          Choose Your <span className="text-primary">Plan</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Basic", price: "$29", features: ["Gym Access", "Locker Room", "Basic Support"] },
            { name: "Premium", price: "$59", features: ["Everything in Basic", "Group Classes", "Personal Trainer Session"], popular: true },
            { name: "Elite", price: "$99", features: ["Everything in Premium", "Unlimited PT Sessions", "Nutrition Consultation", "Priority Booking"] },
          ].map((plan, index) => (
            <Card key={index} className={`p-8 relative ${plan.popular ? 'border-primary shadow-glow' : 'border-border'} bg-card`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-black px-4 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <div className="text-4xl font-black text-primary mb-2">{plan.price}</div>
                <div className="text-muted-foreground">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Star className="w-5 h-5 text-primary mr-3" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? "gym" : "gymOutline"} className="w-full">
                Choose Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
      </section >
  );
};

export default GymLanding;