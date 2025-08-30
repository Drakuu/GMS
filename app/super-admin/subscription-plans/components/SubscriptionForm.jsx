// app/super-admin/subscription-plans/components/SubscriptionForm.jsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

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

   const handleFeatureToggle = (feature, value) => {
      onChange({
         ...formData,
         features: {
            ...formData.features,
            [feature]: value
         }
      });
   };

   const handleLimitChange = (limit, value) => {
      onChange({
         ...formData,
         limits: {
            ...formData.limits,
            [limit]: parseInt(value) || 0
         }
      });
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
                     value={formData.key || ''}
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
                     value={formData.name || ''}
                     onChange={(e) => handleInputChange('name', e.target.value)}
                     placeholder="e.g., Premium Monthly"
                     required
                  />
               </div>

               <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                     id="description"
                     value={formData.description || ''}
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
                        value={formData.currency || 'USD'}
                        onValueChange={(value) => handleInputChange('currency', value)}
                        required
                     >
                        <SelectTrigger>
                           <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="USD">USD</SelectItem>
                           <SelectItem value="EUR">EUR</SelectItem>
                           <SelectItem value="GBP">GBP</SelectItem>
                           <SelectItem value="INR">INR</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div>
                     <Label htmlFor="price">Price *</Label>
                     <Input
                        id="price"
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
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
                     value={formData.interval || 'month'}
                     onValueChange={(value) => handleInputChange('interval', value)}
                     required
                  >
                     <SelectTrigger>
                        <SelectValue placeholder="Select interval" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="month">Monthly</SelectItem>
                        <SelectItem value="year">Yearly</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div>
                  <Label htmlFor="trialDays">Trial Days</Label>
                  <Input
                     id="trialDays"
                     type="number"
                     value={formData.trialDays || 0}
                     onChange={(e) => handleInputChange('trialDays', parseInt(e.target.value) || 0)}
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
                     value={formData.stripePriceId || ''}
                     onChange={(e) => handleInputChange('stripePriceId', e.target.value)}
                     placeholder="price_xxxxxxxxxxxxxx"
                  />
               </div>

               <div>
                  <Label htmlFor="stripeProductId">Stripe Product ID</Label>
                  <Input
                     id="stripeProductId"
                     value={formData.stripeProductId || ''}
                     onChange={(e) => handleInputChange('stripeProductId', e.target.value)}
                     placeholder="prod_xxxxxxxxxxxxxx"
                  />
               </div>
            </div>
         </div>

         {/* Features */}
         <div className="space-y-4">
            <h3 className="text-lg font-semibold">Features</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="flex items-center gap-2">
                  <Switch
                     id="pos"
                     checked={formData.features?.pos || false}
                     onCheckedChange={(checked) => handleFeatureToggle('pos', checked)}
                  />
                  <Label htmlFor="pos" className="cursor-pointer">Point of Sale (POS)</Label>
               </div>

               <div className="flex items-center gap-2">
                  <Switch
                     id="classes"
                     checked={formData.features?.classes || false}
                     onCheckedChange={(checked) => handleFeatureToggle('classes', checked)}
                  />
                  <Label htmlFor="classes" className="cursor-pointer">Classes Management</Label>
               </div>

               <div className="flex items-center gap-2">
                  <Switch
                     id="crm"
                     checked={formData.features?.crm || false}
                     onCheckedChange={(checked) => handleFeatureToggle('crm', checked)}
                  />
                  <Label htmlFor="crm" className="cursor-pointer">CRM</Label>
               </div>

               <div className="flex items-center gap-2">
                  <Switch
                     id="checkin"
                     checked={formData.features?.checkin || false}
                     onCheckedChange={(checked) => handleFeatureToggle('checkin', checked)}
                  />
                  <Label htmlFor="checkin" className="cursor-pointer">Check-in System</Label>
               </div>

               <div className="flex items-center gap-2">
                  <Switch
                     id="reports"
                     checked={formData.features?.reports || false}
                     onCheckedChange={(checked) => handleFeatureToggle('reports', checked)}
                  />
                  <Label htmlFor="reports" className="cursor-pointer">Reports</Label>
               </div>

               <div className="flex items-center gap-2">
                  <Switch
                     id="apiAccess"
                     checked={formData.features?.apiAccess || false}
                     onCheckedChange={(checked) => handleFeatureToggle('apiAccess', checked)}
                  />
                  <Label htmlFor="apiAccess" className="cursor-pointer">API Access</Label>
               </div>
            </div>
         </div>

         {/* Limits */}
         <div className="space-y-4">
            <h3 className="text-lg font-semibold">Limits</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div>
                  <Label htmlFor="maxStaff">Max Staff</Label>
                  <Input
                     id="maxStaff"
                     type="number"
                     value={formData.limits?.maxStaff || 0}
                     onChange={(e) => handleLimitChange('maxStaff', e.target.value)}
                     min="0"
                  />
               </div>

               <div>
                  <Label htmlFor="maxMembers">Max Members</Label>
                  <Input
                     id="maxMembers"
                     type="number"
                     value={formData.limits?.maxMembers || 0}
                     onChange={(e) => handleLimitChange('maxMembers', e.target.value)}
                     min="0"
                  />
               </div>

               <div>
                  <Label htmlFor="branches">Max Branches</Label>
                  <Input
                     id="branches"
                     type="number"
                     value={formData.limits?.branches || 0}
                     onChange={(e) => handleLimitChange('branches', e.target.value)}
                     min="0"
                  />
               </div>
            </div>
         </div>

         {/* Status */}
         <div className="flex items-center gap-2">
            <Switch
               id="status"
               checked={formData.status === 'Active'}
               onCheckedChange={(checked) =>
                  handleInputChange('status', checked ? 'Active' : 'Archived')
               }
            />
            <Label htmlFor="status" className="cursor-pointer">
               {formData.status === 'Active' ? 'Active' : 'Archived'}
            </Label>
         </div>
      </form>
   );
};

export default SubscriptionForm;