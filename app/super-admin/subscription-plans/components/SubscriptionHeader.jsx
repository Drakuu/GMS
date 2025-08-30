// app/super-admin/subscription-plans/components/SubscriptionHeader.jsx
import React from 'react';



const SubscriptionHeader = ({ title, description }) => {
   return (
      <div className="mb-8">
         <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
         <p className="text-amber-600 text-lg">{description}</p>
      </div>
   );
};

export default SubscriptionHeader;