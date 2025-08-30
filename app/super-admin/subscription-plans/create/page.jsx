// app/super-admin/subscription-plans/create/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import {
   createSubscriptionPlan,
   updateSubscriptionPlan,
   fetchSubscriptionPlanById,
} from '@/store/slices/subscriptionPlanSlice';
import { selectCurrentPlan, selectPlanLoading } from '@/store/selectors/subscriptionPlanSelectors';
import SubscriptionHeader from '../components/SubscriptionHeader';
import SubscriptionForm from '../components/SubscriptionForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

const CreateSubscriptionPlanPage = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const searchParams = useSearchParams();
   const plan = useSelector(selectCurrentPlan);
   const loading = useSelector(selectPlanLoading);
   const planId = searchParams.get('id');
   const isEditMode = Boolean(planId);

   const [formData, setFormData] = useState({
      key: '',
      name: '',
      description: '',
      currency: 'USD',
      price: 0,
      interval: 'month',
      trialDays: 14,
      stripePriceId: '',
      stripeProductId: '',
      features: {
         pos: true,
         classes: true,
         crm: false,
         checkin: true,
         reports: true,
         apiAccess: false,
      },
      limits: {
         maxStaff: 10,
         maxMembers: 1000,
         branches: 1,
      },
      status: 'Active'
   });

   useEffect(() => {
      if (planId) {
         dispatch(fetchSubscriptionPlanById(planId));
      }
   }, [dispatch, planId]);

   useEffect(() => {
      if (plan && isEditMode) {
         setFormData({
            key: plan.key || '',
            name: plan.name || '',
            description: plan.description || '',
            currency: plan.currency || 'USD',
            price: plan.price || 0,
            interval: plan.interval || 'month',
            trialDays: plan.trialDays || 0,
            stripePriceId: plan.stripePriceId || '',
            stripeProductId: plan.stripeProductId || '',
            features: plan.features || {
               pos: true,
               classes: true,
               crm: false,
               checkin: true,
               reports: true,
               apiAccess: false,
            },
            limits: plan.limits || {
               maxStaff: 10,
               maxMembers: 1000,
               branches: 1,
            },
            status: plan.status || 'Active'
         });
      }
   }, [plan, isEditMode]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         if (isEditMode && planId) {
            await dispatch(updateSubscriptionPlan({ id: planId, updateData: formData })).unwrap();
         } else {
            await dispatch(createSubscriptionPlan(formData)).unwrap();
         }

         router.push('/super-admin/subscription-plans');
      } catch (error) {
         console.error('Failed to save plan:', error);
      }
   };

   const handleBack = () => {
      router.push('/super-admin/subscription-plans');
   };

   return (
      <div className="container mx-auto px-4 py-8">
         <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
               <ArrowLeft size={16} />
               Back
            </Button>

            <SubscriptionHeader
               title={isEditMode ? `Edit ${plan?.name}` : 'Create New Plan'}
               description={isEditMode ? 'Update your subscription plan details' : 'Create a new subscription plan for your users'}
            />
         </div>

         <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <SubscriptionForm
               formData={formData}
               onChange={setFormData}
               onSubmit={handleSubmit}
               isEditMode={isEditMode}
               loading={loading}
            />

            <div className="flex gap-4 justify-end mt-6">
               <Button variant="outline" onClick={handleBack}>
                  Cancel
               </Button>
               <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2"
               >
                  <Save size={16} />
                  {loading ? 'Saving...' : isEditMode ? 'Update Plan' : 'Create Plan'}
               </Button>
            </div>
         </div>
      </div>
   );
};

export default CreateSubscriptionPlanPage;