// app/super-admin/subscription-plans/components/SubscriptionForm.jsx
import React from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';


const SubscriptionForm = ({
   formData,
   onChange,
   onSubmit,
   isEditMode,
   loading
}) => {
   const handleInputChange = (field, value) => {
      onChange({ ...formData, [field]: value });
   };

   const handleFeatureChange = (index, value) => {
      const newFeatures = [...formData.features];
      newFeatures[index] = value;
      onChange({ ...formData, features: newFeatures });
   };

   const addFeature = () => {
      onChange({ ...formData, features: [...formData.features, ''] });
   };

   const removeFeature = (index) => {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      onChange({ ...formData, features: newFeatures });
   };

   return (
      <form onSubmit={onSubmit} className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
               <h3 className="text-lg font-semibold">Basic Information</h3>

               <div>
                  <Label htmlFor="key">Plan Key *</Label>
                  <Input
                     id="key"
                     value={formData.key}
                     onChange={(e) => handleInputChange('key', e.target.value)}
                     placeholder="e.g., premium-monthly"
                     required
                     disabled={isEditMode}
                  />
                  <p className="text-sm text-gray-500 mt-1">Unique identifier for the plan (cannot be changed)</p>
               </div>

               <div>
                  <Label htmlFor="name">Plan Name *</Label>
                  <Input
                     id="name"
                     value={formData.name}
                     onChange={(e) => handleInputChange('name', e.target.value)}
                     placeholder="e.g., Premium Monthly"
                     required
                  />
               </div>

               <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                     id="description"
                     value={formData.description}
                     onChange={(e) => handleInputChange('description', e.target.value)}
                     placeholder="Describe what this plan includes..."
                     rows={3}
                  />
               </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
               <h3 className="text-lg font-semibold">Pricing & Billing</h3>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <Label htmlFor="currency">Currency *</Label>
                     <Select
                        id="currency"
                        value={formData.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        options={[
                           { value: 'USD', label: 'USD' },
                           { value: 'EUR', label: 'EUR' },
                           { value: 'GBP', label: 'GBP' },
                           { value: 'INR', label: 'INR' }
                        ]}
                        required
                     />
                  </div>

                  <div>
                     <Label htmlFor="price">Price *</Label>
                     <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                     />
                  </div>
               </div>

               <div>
                  <Label htmlFor="interval">Billing Interval *</Label>
                  <Select
                     id="interval"
                     value={formData.interval}
                     onChange={(e) => handleInputChange('interval', e.target.value)}
                     options={[
                        { value: 'day', label: 'Daily' },
                        { value: 'week', label: 'Weekly' },
                        { value: 'month', label: 'Monthly' },
                        { value: 'year', label: 'Yearly' }
                     ]}
                     required
                  />
               </div>

               <div>
                  <Label htmlFor="trialDays">Trial Days</Label>
                  <Input
                     id="trialDays"
                     type="number"
                     value={formData.trialDays}
                     onChange={(e) => handleInputChange('trialDays', parseInt(e.target.value))}
                     placeholder="0"
                     min="0"
                  />
               </div>
            </div>
         </div>

         {/* Stripe Integration */}
         <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stripe Integration</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <Label htmlFor="stripePriceId">Stripe Price ID</Label>
                  <Input
                     id="stripePriceId"
                     value={formData.stripePriceId}
                     onChange={(e) => handleInputChange('stripePriceId', e.target.value)}
                     placeholder="price_xxxxxxxxxxxxxx"
                  />
               </div>

               <div>
                  <Label htmlFor="stripeProductId">Stripe Product ID</Label>
                  <Input
                     id="stripeProductId"
                     value={formData.stripeProductId}
                     onChange={(e) => handleInputChange('stripeProductId', e.target.value)}
                     placeholder="prod_xxxxxxxxxxxxxx"
                  />
               </div>
            </div>
         </div>

         {/* Features */}
         <div className="space-y-4">
            <div className="flex items-center justify-between">
               <h3 className="text-lg font-semibold">Features</h3>
               <button
                  type="button"
                  onClick={addFeature}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
               >
                  + Add Feature
               </button>
            </div>

            <div className="space-y-2">
               {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                     <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                     />
                     <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-700 p-2"
                     >
                        ×
                     </button>
                  </div>
               ))}
            </div>
         </div>

         {/* Status */}
         <div className="flex items-center gap-2">
            <Switch
               id="status"
               checked={formData.status === 'active'}
               onCheckedChange={(checked) =>
                  handleInputChange('status', checked ? 'active' : 'inactive')
               }
            />
            <Label htmlFor="status" className="cursor-pointer">
               {formData.status === 'active' ? 'Active' : 'Inactive'}
            </Label>
         </div>
      </form>
   );
};

export default SubscriptionForm;