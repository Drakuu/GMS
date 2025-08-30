// app/super-admin/subscription-plans/components/SubscriptionList.jsx
'use client';

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
   plans = [],                 // ✅ default to []
   loading = false,            // ✅ default to false
   onViewDetails = () => { },
   pagination = { page: 1, pages: 1 }, // ✅ safe default
   onPageChange = () => { },    // ✅ no-op default
}) => {
   const hasPlans = Array.isArray(plans) && plans.length > 0;

   if (!loading && !hasPlans) {
      return (
         <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No subscription plans found.</p>
         </div>
      );
   }

   return (
      <div>
         {hasPlans && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
               {plans.map((plan) => (
                  <SubscriptionCard
                     key={plan?._id || plan?.id || Math.random()}
                     plan={plan}
                     onViewDetails={onViewDetails}
                  />
               ))}
            </div>
         )}

         {pagination && Number(pagination.pages) > 1 && (
            <PaginationComponent
               currentPage={Number(pagination.page) || 1}
               totalPages={Number(pagination.pages) || 1}
               onPageChange={onPageChange}
            />
         )}
      </div>
   );
};

// shadcn-style pager
const PaginationComponent = ({ currentPage = 1, totalPages = 1, onPageChange = () => { } }) => {
   const maxVisiblePages = 5;

   const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
   const startPageRaw = currentPage - Math.floor(maxVisiblePages / 2);
   let startPage = clamp(startPageRaw, 1, Math.max(1, totalPages - maxVisiblePages + 1));
   let endPage = clamp(startPage + maxVisiblePages - 1, 1, totalPages);

   if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = clamp(endPage - maxVisiblePages + 1, 1, totalPages);
   }

   const pages = [];
   for (let i = startPage; i <= endPage; i++) pages.push(i);

   const go = (p) => onPageChange(clamp(p, 1, totalPages));

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  onClick={() => go(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
               />
            </PaginationItem>

            {startPage > 1 && (
               <>
                  <PaginationItem>
                     <PaginationLink onClick={() => go(1)} className="cursor-pointer">
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

            {pages.map((p) => (
               <PaginationItem key={p}>
                  <PaginationLink
                     isActive={p === currentPage}
                     onClick={() => go(p)}
                     className="cursor-pointer"
                  >
                     {p}
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
                     <PaginationLink onClick={() => go(totalPages)} className="cursor-pointer">
                        {totalPages}
                     </PaginationLink>
                  </PaginationItem>
               </>
            )}

            <PaginationItem>
               <PaginationNext
                  onClick={() => go(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   );
};

export default SubscriptionList;