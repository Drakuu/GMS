// app/super-admin/subscription-plans/components/SubscriptionList.jsx
import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationPrevious,
   PaginationNext,
   PaginationEllipsis,
} from '@/components/ui/pagination';

const SubscriptionList = ({
   plans,
   loading,
   onViewDetails,
   pagination,
   onPageChange
}) => {
   if (plans.length === 0 && !loading) {
      return (
         <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No subscription plans found.</p>
         </div>
      );
   }

   return (
      <div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
               <SubscriptionCard
                  key={plan._id}
                  plan={plan}
                  onViewDetails={onViewDetails}
               />
            ))}
         </div>

         {pagination.pages > 1 && (
            <PaginationComponent
               currentPage={pagination.page}
               totalPages={pagination.pages}
               onPageChange={onPageChange}
            />
         )}
      </div>
   );
};

// Create a separate PaginationComponent that uses shadcn's pagination
const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
   const maxVisiblePages = 5;
   const pages = [];

   // Calculate visible page range
   let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
   let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

   if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
   }

   for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
   }

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
               />
            </PaginationItem>

            {startPage > 1 && (
               <>
                  <PaginationItem>
                     <PaginationLink
                        onClick={() => onPageChange(1)}
                        className="cursor-pointer"
                     >
                        1
                     </PaginationLink>
                  </PaginationItem>
                  {startPage > 2 && (
                     <PaginationItem>
                        <PaginationEllipsis />
                     </PaginationItem>
                  )}
               </>
            )}

            {pages.map((page) => (
               <PaginationItem key={page}>
                  <PaginationLink
                     isActive={page === currentPage}
                     onClick={() => onPageChange(page)}
                     className="cursor-pointer"
                  >
                     {page}
                  </PaginationLink>
               </PaginationItem>
            ))}

            {endPage < totalPages && (
               <>
                  {endPage < totalPages - 1 && (
                     <PaginationItem>
                        <PaginationEllipsis />
                     </PaginationItem>
                  )}
                  <PaginationItem>
                     <PaginationLink
                        onClick={() => onPageChange(totalPages)}
                        className="cursor-pointer"
                     >
                        {totalPages}
                     </PaginationLink>
                  </PaginationItem>
               </>
            )}

            <PaginationItem>
               <PaginationNext
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
};

export default SubscriptionList;