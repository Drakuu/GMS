import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, MapPin } from 'lucide-react';

const BranchSelector = ({ branches, selectedBranch, onBranchChange, className = '' }) => {
   if (!branches || branches.length === 0) {
      return null;
   }

   return (
      <Select value={selectedBranch?._id} onValueChange={(value) => {
         const branch = branches.find(b => b._id === value);
         onBranchChange(branch);
      }}>
         <SelectTrigger className={`w-[280px] ${className}`}>
            <SelectValue placeholder="Select branch">
               {selectedBranch && (
                  <div className="flex items-center gap-2">
                     <Building2 className="w-4 h-4" />
                     <span>{selectedBranch.name}</span>
                     {selectedBranch.is_main_branch && (
                        <span className="text-xs text-muted-foreground">(Main)</span>
                     )}
                  </div>
               )}
            </SelectValue>
         </SelectTrigger>

         <SelectContent>
            {branches.map((branch) => (
               <SelectItem key={branch._id} value={branch._id}>
                  <div className="flex items-center gap-2">
                     <Building2 className="w-4 h-4" />
                     <div className="flex flex-col">
                        <span>{branch.name}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                           <MapPin className="w-3 h-3" />
                           {branch.address?.city}, {branch.address?.state}
                           {branch.is_main_branch && ' • Main'}
                        </div>
                     </div>
                  </div>
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};

export default BranchSelector;