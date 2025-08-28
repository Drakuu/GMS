// components/ui/FilterDropdown.jsx
'use client';

import React from 'react';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';


export const FilterDropdown = ({
   options,
   value,
   onChange,
   placeholder = "Select...",
   className,
   icon
}) => {
   return (
      <Select value={value} onValueChange={onChange}>
         <SelectTrigger className={cn("w-[180px]", className)}>
            <div className="flex items-center gap-2">
               {icon}
               <SelectValue placeholder={placeholder} />
            </div>
         </SelectTrigger>
         <SelectContent>
            {options.map((option) => (
               <SelectItem key={option.value} value={option.value}>
                  {option.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};

export default FilterDropdown;