import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit } from 'lucide-react';

const SubscriptionCard = ({ plan, onViewDetails }) => {
   const getStatusStyle = (status) => {
      switch (status) {
         case 'active':
            return 'bg-green-100 text-green-800';
         case 'inactive':
            return 'bg-red-100 text-red-800';
         default:
            return 'bg-gray-100 text-gray-800';
      }
   };

   return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
         <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(plan.status)}`}>
               {plan.status}
            </span>
         </div>

         <p className="text-gray-600 mb-4 line-clamp-2">{plan.description}</p>

         <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
               <span className="text-sm text-gray-500">Price</span>
               <p className="text-2xl font-bold text-gray-900">
                  {plan.currency} {plan.price}
               </p>
               <span className="text-sm text-gray-500">/{plan.interval}</span>
            </div>

            <div>
               <span className="text-sm text-gray-500">Trial</span>
               <p className="text-lg font-semibold text-gray-900">
                  {plan.trialDays || 0} days
               </p>
            </div>
         </div>

         <div className="flex gap-2">
            <Button
               variant="outline"
               onClick={() => onViewDetails(plan._id)}
               className="flex items-center gap-2 flex-1"
            >
               <Eye size={16} />
               View Details
            </Button>

            <Button
               onClick={() => onViewDetails(plan._id)}
               className="flex items-center gap-2 flex-1"
            >
               <Edit size={16} />
               Edit
            </Button>
         </div>
      </div>
   );
};

export default SubscriptionCard;