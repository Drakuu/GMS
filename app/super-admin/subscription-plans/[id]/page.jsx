// app/super-admin/subscription-plans/[id]/page.jsx
'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation';
import {
   fetchSubscriptionPlanById,
   selectCurrentSubscriptionPlan,
   selectPlanLoading
} from '@/store/slices/subscriptionPlanSlice';
import SubscriptionHeader from '../components/SubscriptionHeader';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Edit } from 'lucide-react';

const SubscriptionPlanDetailPage = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const params = useParams();
   const plan = useSelector(selectCurrentSubscriptionPlan);
   const loading = useSelector(selectPlanLoading);
   const planId = params.id;

   useEffect(() => {
      if (planId) {
         dispatch(fetchSubscriptionPlanById(planId));
      }
   }, [dispatch, planId]);

   const handleEdit = () => {
      router.push(`/super-admin/subscription-plans/create?id=${planId}`);
   };

   const handleBack = () => {
      router.push('/super-admin/subscription-plans');
   };

   if (loading) {
      return <div className="flex justify-center items-center min-h-64">Loading...</div>;
   }

   if (!plan) {
      return (
         <div className="container mx-auto px-4 py-8">
            <div className="text-center">
               <h1 className="text-2xl font-bold mb-4">Plan not found</h1>
               <Button onClick={handleBack}>Back to Plans</Button>
            </div>
         </div>
      );
   }

   return (
      <div className="container mx-auto px-4 py-8">
         <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
               <ArrowLeft size={16} />
               Back
            </Button>

            <SubscriptionHeader
               title={plan.name}
               description={plan.description}
            />

            <Button onClick={handleEdit} className="flex items-center gap-2 ml-auto">
               <Edit size={16} />
               Edit Plan
            </Button>
         </div>

         <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <h3 className="text-lg font-semibold mb-4">Plan Details</h3>
                  <div className="space-y-3">
                     <div>
                        <span className="text-sm text-gray-500">Status</span>
                        <p className="font-medium">{plan.status}</p>
                     </div>
                     <div>
                        <span className="text-sm text-gray-500">Price</span>
                        <p className="text-xl font-bold">
                           {plan.currency} {plan.price} / {plan.interval}
                        </p>
                     </div>
                     <div>
                        <span className="text-sm text-gray-500">Trial Period</span>
                        <p className="font-medium">{plan.trialDays || 0} days</p>
                     </div>
                  </div>
               </div>

               <div>
                  <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
                  <div className="space-y-3">
                     <div>
                        <span className="text-sm text-gray-500">Stripe Price ID</span>
                        <p className="font-medium">{plan.stripePriceId || 'Not set'}</p>
                     </div>
                     <div>
                        <span className="text-sm text-gray-500">Stripe Product ID</span>
                        <p className="font-medium">{plan.stripeProductId || 'Not set'}</p>
                     </div>
                     <div>
                        <span className="text-sm text-gray-500">Plan Key</span>
                        <p className="font-medium">{plan.key}</p>
                     </div>
                  </div>
               </div>
            </div>

            {plan.features && plan.features.length > 0 && (
               <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                     {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                           <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                           {feature}
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </div>
      </div>
   );
};

export default SubscriptionPlanDetailPage;