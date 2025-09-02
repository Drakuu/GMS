import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import SubscriptionCard from './SubscriptionCard';

const PlanSelector = ({ plans, currentPlan, onPlanSelect, loading = false }) => {
   const [selectedPlan, setSelectedPlan] = useState(null);

   const handleSelect = (plan) => {
      setSelectedPlan(plan);
      onPlanSelect(plan);
   };

   if (loading) {
      return (
         <Card>
            <CardContent className="flex items-center justify-center p-8">
               <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </CardContent>
         </Card>
      );
   }

   return (
      <div className="space-y-6">
         <Card>
            <CardHeader>
               <CardTitle>Choose Your Plan</CardTitle>
               <CardDescription>
                  Select the subscription plan that best fits your gym's needs
               </CardDescription>
            </CardHeader>
         </Card>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans
               .filter(plan => plan.status === 'Active')
               .sort((a, b) => a.displayOrder - b.displayOrder)
               .map((plan) => (
                  <SubscriptionCard
                     key={plan._id}
                     plan={plan}
                     currentPlan={currentPlan}
                     onSelect={handleSelect}
                     loading={loading}
                  />
               ))}
         </div>

         {selectedPlan && (
            <Card className="bg-muted/50">
               <CardHeader>
                  <CardTitle>Selected: {selectedPlan.name}</CardTitle>
                  <CardDescription>
                     ${selectedPlan.price}/{selectedPlan.interval}
                     {selectedPlan.trialDays > 0 && ` with ${selectedPlan.trialDays}-day free trial`}
                  </CardDescription>
               </CardHeader>
            </Card>
         )}
      </div>
   );
};

export default PlanSelector;