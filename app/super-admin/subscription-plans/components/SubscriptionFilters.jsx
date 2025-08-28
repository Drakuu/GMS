import React from 'react';
import SearchBar from '@/components/shared/SearchBar';
import FilterDropdown from '@/components/shared/FilterDropdown';
import DateRangePicker from '@/components/shared/DateRangePicker';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

const SubscriptionFilters = ({
   searchTerm,
   onSearch,
   filters,
   onFilterChange,
   onResetFilters
}) => {
   const sortOptions = [
      { value: 'name-asc', label: 'Name (A-Z)' },
      { value: 'name-desc', label: 'Name (Z-A)' },
      { value: 'price-asc', label: 'Price (Low to High)' },
      { value: 'price-desc', label: 'Price (High to Low)' },
      { value: 'date-asc', label: 'Date (Oldest First)' },
      { value: 'date-desc', label: 'Date (Newest First)' }
   ];

   const statusOptions = [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'draft', label: 'Draft' }
   ];

   return (
      <div className="flex flex-wrap items-center gap-4">
         <SearchBar
            value={searchTerm}
            onChange={onSearch}
            placeholder="Search plans..."
            className="w-64"
         />

         <FilterDropdown
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => onFilterChange({ sortBy: value })}
            placeholder="Sort by"
            icon={<Filter size={16} />}
         />

         <FilterDropdown
            options={statusOptions}
            value={filters.status}
            onChange={(value) => onFilterChange({ status: value })}
            placeholder="Status"
         />

         <DateRangePicker
            startDate={filters.startDate}
            endDate={filters.endDate}
            onChange={(start, end) => onFilterChange({ startDate: start, endDate: end })}
         />

         {(filters.sortBy || filters.status || filters.startDate || filters.endDate) && (
            <Button
               variant="outline"
               onClick={onResetFilters}
               className="flex items-center gap-2"
            >
               <X size={16} />
               Clear Filters
            </Button>
         )}
      </div>
   );
};

export default SubscriptionFilters;