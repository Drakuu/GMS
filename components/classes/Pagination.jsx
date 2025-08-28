'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({
  currentPage,
  totalPages,
  filteredClassesLength,
  indexOfFirstClass,
  indexOfLastClass,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-between mt-6">
      <div className="text-sm">
        Showing <span className="font-medium">{indexOfFirstClass + 1}</span> to{' '}
        <span className="font-medium">
          {Math.min(indexOfLastClass, filteredClassesLength)}
        </span>{' '}
        of <span className="font-medium">{filteredClassesLength}</span> classes
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <Button
            key={number}
            variant={currentPage === number ? 'default' : 'outline'}
            onClick={() => onPageChange(number)}
          >
            {number}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
