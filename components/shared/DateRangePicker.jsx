// components/ui/DateRangePicker.jsx
'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const DateRangePicker = ({
   startDate,
   endDate,
   onChange,
   className
}) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleSelect = (date) => {
      if (!date) return;

      if (!startDate && !endDate) {
         onChange(date, undefined);
      } else if (startDate && !endDate) {
         if (date < startDate) {
            onChange(date, startDate);
         } else {
            onChange(startDate, date);
         }
         setIsOpen(false);
      } else {
         onChange(date, undefined);
      }
   };

   const displayText = startDate && endDate
      ? `${format(startDate, 'MMM dd, yyyy')} - ${format(endDate, 'MMM dd, yyyy')}`
      : startDate
         ? `${format(startDate, 'MMM dd, yyyy')} - `
         : 'Pick a date range';

   return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !startDate && !endDate && "text-muted-foreground",
                  className
               )}
            >
               <CalendarIcon className="mr-2 h-4 w-4" />
               {displayText}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0" align="start">
            <Calendar
               mode="single"
               selected={startDate}
               onSelect={handleSelect}
               initialFocus
            />
            {startDate && !endDate && (
               <div className="p-3 border-t">
                  <p className="text-sm text-muted-foreground">
                     Select end date
                  </p>
               </div>
            )}
         </PopoverContent>
      </Popover>
   );
};

export default DateRangePicker;