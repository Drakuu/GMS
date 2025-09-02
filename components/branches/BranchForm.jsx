import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

const branchSchema = z.object({
   name: z.string().min(2, 'Name must be at least 2 characters'),
   phone: z.string().optional(),
   email: z.string().email('Invalid email address').optional().or(z.literal('')),
   address: z.object({
      line1: z.string().min(1, 'Address line 1 is required'),
      line2: z.string().optional(),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      country: z.string().min(1, 'Country is required'),
      postalCode: z.string().min(1, 'Postal code is required'),
   }),
   timezone: z.string().default('Asia/Karachi'),
   currency: z.string().default('PKR'),
});

const BranchForm = ({ branch, onSubmit, loading = false }) => {
   const form = useForm({
      resolver: zodResolver(branchSchema),
      defaultValues: branch || {
         name: '',
         phone: '',
         email: '',
         address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            country: 'Pakistan',
            postalCode: '',
         },
         timezone: 'Asia/Karachi',
         currency: 'PKR',
      },
   });

   return (
      <Card>
         <CardHeader>
            <CardTitle>{branch ? 'Edit Branch' : 'Create New Branch'}</CardTitle>
            <CardDescription>
               {branch ? 'Update branch information' : 'Add a new branch to your gym network'}
            </CardDescription>
         </CardHeader>

         <CardContent>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Branch Name *</FormLabel>
                              <FormControl>
                                 <Input placeholder="e.g., Downtown Gym" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                 <Input placeholder="+92 300 1234567" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email Address</FormLabel>
                           <FormControl>
                              <Input type="email" placeholder="branch@example.com" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className="space-y-4">
                     <h4 className="font-medium">Address Information</h4>

                     <FormField
                        control={form.control}
                        name="address.line1"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Address Line 1 *</FormLabel>
                              <FormControl>
                                 <Input placeholder="Street address" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="address.line2"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Address Line 2</FormLabel>
                              <FormControl>
                                 <Input placeholder="Apartment, suite, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                           control={form.control}
                           name="address.city"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>City *</FormLabel>
                                 <FormControl>
                                    <Input placeholder="City" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="address.state"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>State *</FormLabel>
                                 <FormControl>
                                    <Input placeholder="State" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="address.postalCode"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Postal Code *</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Postal code" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>

                     <FormField
                        control={form.control}
                        name="address.country"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Country *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="Pakistan">Pakistan</SelectItem>
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    <SelectItem value="UAE">United Arab Emirates</SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Timezone</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select timezone" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="Asia/Karachi">Pakistan Standard Time</SelectItem>
                                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                                    <SelectItem value="Europe/London">GMT</SelectItem>
                                    <SelectItem value="Asia/Dubai">Gulf Standard Time</SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="PKR">PKR - Pakistani Rupee</SelectItem>
                                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                    <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full md:w-auto">
                     {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                     {branch ? 'Update Branch' : 'Create Branch'}
                  </Button>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};

export default BranchForm;