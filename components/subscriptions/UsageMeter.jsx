import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Users, UserCheck, Building2 } from 'lucide-react';

const UsageMeter = ({ gym, plan }) => {
   if (!gym || !plan) return null;

   const usage = gym.usage || {};
   const limits = plan.limits || {};

   const metrics = [
      {
         name: 'Members',
         current: usage.members || 0,
         max: limits.maxMembers || 1,
         icon: Users,
         color: 'bg-blue-500'
      },
      {
         name: 'Trainers',
         current: usage.trainers || 0,
         max: limits.maxTrainers || 1,
         icon: UserCheck,
         color: 'bg-green-500'
      },
      {
         name: 'Branches',
         current: usage.branches || 0,
         max: limits.maxBranches || 1,
         icon: Building2,
         color: 'bg-purple-500'
      }
   ];

   const exceededMetrics = metrics.filter(metric => metric.current > metric.max);

   return (
      <Card>
         <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>
               Current usage against your plan limits
            </CardDescription>
         </CardHeader>

         <CardContent className="space-y-6">
            {exceededMetrics.length > 0 && (
               <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                     You have exceeded limits for: {exceededMetrics.map(m => m.name).join(', ')}.
                     Please upgrade your plan.
                  </AlertDescription>
               </Alert>
            )}

            <div className="space-y-4">
               {metrics.map((metric) => {
                  const percentage = Math.min((metric.current / metric.max) * 100, 100);
                  const isNearLimit = percentage > 80;
                  const isOverLimit = metric.current > metric.max;

                  return (
                     <div key={metric.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                           <div className="flex items-center gap-2">
                              <metric.icon className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{metric.name}</span>
                           </div>
                           <div className={isOverLimit ? 'text-destructive font-medium' : ''}>
                              {metric.current} / {metric.max}
                              {isOverLimit && ' (Exceeded)'}
                           </div>
                        </div>

                        <Progress
                           value={percentage}
                           className={isOverLimit ? 'bg-destructive' : isNearLimit ? 'bg-amber-500' : ''}
                        />

                        {isNearLimit && !isOverLimit && (
                           <div className="text-xs text-amber-600">
                              Approaching limit - consider upgrading your plan
                           </div>
                        )}
                     </div>
                  );
               })}
            </div>

            <div className="text-xs text-muted-foreground">
               Last updated: {gym.usage?.lastUpdated
                  ? new Date(gym.usage.lastUpdated).toLocaleDateString()
                  : 'Never'
               }
            </div>
         </CardContent>
      </Card>
   );
};

export default UsageMeter;