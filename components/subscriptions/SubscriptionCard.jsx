import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, CrownIcon, StarIcon } from 'lucide-react';

const SubscriptionCard = ({ plan, currentPlan, onSelect, loading = false }) => {
   const isCurrentPlan = currentPlan?.stripePriceId === plan.stripePriceId;
   const isPopular = plan.isPopular;

   const features = [
      { name: 'Members', value: plan.limits.maxMembers.toLocaleString() },
      { name: 'Trainers', value: plan.limits.maxTrainers },
      { name: 'Branches', value: plan.limits.maxBranches },
      { name: 'Member Management', enabled: plan.features.memberManagement },
      { name: 'Attendance Tracking', enabled: plan.features.attendanceTracking },
      { name: 'Payment Tracking', enabled: plan.features.paymentTracking },
      { name: 'Reports', enabled: plan.features.reports },
      { name: 'Multi-Branch', enabled: plan.features.multiBranch },
   ];

   return (
      <Card className={`relative overflow-hidden ${isPopular ? 'border-2 border-primary' : ''}`}>
         {isPopular && (
            <div className="absolute top-4 right-4">
               <Badge variant="secondary" className="flex items-center gap-1">
                  <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  Most Popular
               </Badge>
            </div>
         )}

         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               {plan.name}
               {isCurrentPlan && (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                     Current Plan
                  </Badge>
               )}
            </CardTitle>
            <CardDescription>{plan.description}</CardDescription>

            <div className="mt-4">
               <div className="text-3xl font-bold">
                  ${plan.price}
                  <span className="text-sm font-normal text-muted-foreground">/{plan.interval}</span>
               </div>
               {plan.trialDays > 0 && (
                  <div className="text-sm text-muted-foreground">
                     {plan.trialDays}-day free trial
                  </div>
               )}
            </div>
         </CardHeader>

         <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
               {features.slice(0, 3).map((feature) => (
                  <div key={feature.name} className="flex items-center gap-2">
                     <CheckIcon className="w-4 h-4 text-green-500" />
                     <span>
                        {feature.value} {feature.name}
                     </span>
                  </div>
               ))}
            </div>

            <div className="space-y-2">
               {features.slice(3).map((feature) => (
                  <div key={feature.name} className="flex items-center gap-2 text-sm">
                     {feature.enabled ? (
                        <CheckIcon className="w-4 h-4 text-green-500" />
                     ) : (
                        <span className="w-4 h-4 text-gray-400">×</span>
                     )}
                     <span className={!feature.enabled ? 'text-muted-foreground' : ''}>
                        {feature.name}
                     </span>
                  </div>
               ))}
            </div>
         </CardContent>

         <CardFooter>
            <Button
               className="w-full"
               variant={isPopular ? 'default' : 'outline'}
               onClick={() => onSelect(plan)}
               disabled={isCurrentPlan || loading}
            >
               {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
               {isPopular && <CrownIcon className="w-4 h-4 ml-2" />}
            </Button>
         </CardFooter>
      </Card>
   );
};

export default SubscriptionCard;