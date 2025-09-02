import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Receipt, Download } from 'lucide-react';

const BillingPortal = ({ gym, onManageBilling }) => {
   const [loading, setLoading] = useState(false);

   const handleBillingPortal = async () => {
      setLoading(true);
      try {
         await onManageBilling();
      } catch (error) {
         console.error('Error opening billing portal:', error);
      } finally {
         setLoading(false);
      }
   };

   if (!gym?.subscription?.stripeCustomerId) {
      return null;
   }

   return (
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <CreditCard className="w-5 h-5" />
               Billing Information
            </CardTitle>
            <CardDescription>
               Manage your subscription and payment methods
            </CardDescription>
         </CardHeader>

         <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
               <div>
                  <div className="font-medium">Current Plan</div>
                  <div className="text-muted-foreground">
                     {gym.subscription.planId?.name || 'No active plan'}
                  </div>
               </div>

               <div>
                  <div className="font-medium">Billing Cycle</div>
                  <div className="text-muted-foreground">
                     {gym.subscription.currentPeriodEnd
                        ? `Renews on ${new Date(gym.subscription.currentPeriodEnd).toLocaleDateString()}`
                        : 'No active subscription'
                     }
                  </div>
               </div>

               <div>
                  <div className="font-medium">Status</div>
                  <div className="text-muted-foreground capitalize">
                     {gym.subscription.status}
                  </div>
               </div>

               <div>
                  <div className="font-medium">Customer ID</div>
                  <div className="text-muted-foreground font-mono text-xs">
                     {gym.subscription.stripeCustomerId}
                  </div>
               </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
               <Button
                  onClick={handleBillingPortal}
                  disabled={loading}
                  variant="outline"
               >
                  {loading ? (
                     <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                     <CreditCard className="w-4 h-4 mr-2" />
                  )}
                  Manage Billing
               </Button>

               <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Invoice History
               </Button>
            </div>
         </CardContent>
      </Card>
   );
};

export default BillingPortal;