import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Calendar, Users, Edit, Trash2 } from 'lucide-react';

const BranchCard = ({ branch, onEdit, onDelete, isMainBranch = false }) => {
   const handleEdit = () => onEdit(branch);
   const handleDelete = () => onDelete(branch);

   return (
      <Card className="hover:shadow-md transition-shadow">
         <CardHeader>
            <div className="flex items-start justify-between">
               <div>
                  <CardTitle className="flex items-center gap-2">
                     {branch.name}
                     {isMainBranch && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                           Main Branch
                        </Badge>
                     )}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                     <MapPin className="w-4 h-4" />
                     {branch.address?.city}, {branch.address?.state}
                  </CardDescription>
               </div>

               <Badge variant={branch.status === 'Active' ? 'success' : 'secondary'}>
                  {branch.status}
               </Badge>
            </div>
         </CardHeader>

         <CardContent className="space-y-3 text-sm">
            {branch.phone && (
               <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {branch.phone}
               </div>
            )}

            {branch.email && (
               <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {branch.email}
               </div>
            )}

            {branch.address && (
               <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                     {branch.address.line1 && <div>{branch.address.line1}</div>}
                     {branch.address.line2 && <div>{branch.address.line2}</div>}
                     <div>
                        {branch.address.city}, {branch.address.state} {branch.address.postalCode}
                     </div>
                     {branch.address.country && <div>{branch.address.country}</div>}
                  </div>
               </div>
            )}

            <div className="flex items-center gap-4 pt-2 text-xs">
               <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {branch.usage?.members || 0} members
               </div>
               <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Joined {new Date(branch.createdAt).toLocaleDateString()}
               </div>
            </div>
         </CardContent>

         <CardFooter className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleEdit}>
               <Edit className="w-4 h-4 mr-1" />
               Edit
            </Button>
            <Button variant="outline" size="sm" onClick={handleDelete}>
               <Trash2 className="w-4 h-4 mr-1" />
               Delete
            </Button>
         </CardFooter>
      </Card>
   );
};

export default BranchCard;