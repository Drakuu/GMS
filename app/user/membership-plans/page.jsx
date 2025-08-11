'use client';

import { useState } from 'react';
import { Check, Crown, Dumbbell, Star, Users, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for beginners starting their fitness journey',
    monthlyPrice: 29,
    yearlyPrice: 290,
    icon: Dumbbell,
    features: [
      'Access to gym equipment',
      'Locker room access',
      'Basic workout plans',
      'Mobile app access',
      'Community support',
    ],
    popular: false,
    color: 'from-gray-500 to-gray-600',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Most popular choice for serious fitness enthusiasts',
    monthlyPrice: 59,
    yearlyPrice: 590,
    icon: Star,
    features: [
      'Everything in Basic',
      'Personal trainer sessions (2/month)',
      'Group fitness classes',
      'Nutrition consultation',
      'Priority booking',
      'Guest passes (2/month)',
      'Sauna & steam room access',
    ],
    popular: true,
    color: 'from-primary/50 to-primary',
  },
  {
    id: 'elite',
    name: 'Elite',
    description: 'Ultimate fitness experience with premium amenities',
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Crown,
    features: [
      'Everything in Premium',
      'Unlimited personal training',
      'VIP locker room',
      'Massage therapy (2/month)',
      'Meal prep service',
      '24/7 gym access',
      'Unlimited guest passes',
      'Recovery suite access',
      'Dedicated parking',
    ],
    popular: false,
    color: 'from-purple-500 to-purple-600',
  },
];

const additionalServices = [
  {
    name: 'Personal Training',
    price: 75,
    unit: 'per session',
    icon: Users,
    description: 'One-on-one training with certified professionals',
  },
  {
    name: 'Nutrition Coaching',
    price: 120,
    unit: 'per month',
    icon: Zap,
    description: 'Personalized meal plans and dietary guidance',
  },
];

export default function MembershipPlans() {
  const [isYearly, setIsYearly] = useState(false);

  const handlePurchase = (planId, planName) => {
    // Handle purchase logic here
    console.log(`Purchasing ${planName} plan (${planId})`);
    // You would integrate with your payment system here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br 8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold  mb-4">
            Choose Your <span className="text-primary">Fitness Journey</span>
          </h1>
          <p className="text-md text-muted-foreground  max-w-3xl mx-auto mb-8">
            Transform your body and mind with our comprehensive membership
            plans. Each plan is designed to help you achieve your fitness goals.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Label htmlFor="billing-toggle" className="text-sm font-medium">
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className="text-sm font-medium">
              Yearly
            </Label>
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          </div>
        </div>

        {/* Membership Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const period = isYearly ? 'year' : 'month';

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.popular
                    ? 'ring-2 ring-primary shadow-xl'
                    : 'hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div
                      className={`bg-gradient-to-r ${plan.color}  text-center py-2 text-sm font-semibold`}
                    >
                      🔥 MOST POPULAR
                    </div>
                  </div>
                )}

                <CardHeader
                  className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 " />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className=" mt-2 text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold ">
                      ${price}
                    </span>
                    <span className="text-muted-foreground ml-1">/{period}</span>
                    {isYearly && (
                      <div className="text-sm text-primary font-medium mt-1">
                        Save ${plan.monthlyPrice * 12 - plan.yearlyPrice} per
                        year
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="px-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-md">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="px-6 pb-6">
                  <Button
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'text-black hover:from-primary hover:to-primary shadow-lg'
                        : 'bg-gray-900 hover:bg-gray-800 '
                    }`}
                    onClick={() => handlePurchase(plan.id, plan.name)}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground ">
              Enhance your fitness journey with our premium add-on services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        ${service.price}
                      </span>
                      <span className="text-gray-600 ml-1">{service.unit}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="hover:bg-orange-50 hover:border-orange-300"
                    >
                      Add Service
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my membership anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your membership at any time. Monthly
                memberships can be cancelled with 30 days notice.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are there any setup fees?
              </h3>
              <p className="text-gray-600">
                No setup fees! The price you see is exactly what you pay. We
                believe in transparent pricing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600">
                You can change your plan at any time. Changes take effect at
                your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer corporate memberships?
              </h3>
              <p className="text-gray-600">
                Yes, we offer special corporate rates for companies. Contact us
                for custom pricing and packages.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-gray-600 mb-6">
            Our fitness consultants are here to help you find the perfect plan
            for your goals.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            Contact Our Team
          </Button>
        </div>
      </div>
    </div>
  );
}
