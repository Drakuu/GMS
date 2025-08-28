// components/ui/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Search } from 'lucide-react';


export const SearchBar = ({
   value,
   onChange,
   placeholder = 'Search...',
   className = '',
   debounceTime = 300
}) => {
   const [inputValue, setInputValue] = useState(value);
   const debouncedValue = useDebounce(inputValue, debounceTime);

   useEffect(() => {
      onChange(debouncedValue);
   }, [debouncedValue, onChange]);

   useEffect(() => {
      setInputValue(value);
   }, [value]);

   return (
      <div className={`relative ${className}`}>
         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
         <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
         />
      </div>
   );
};

export default SearchBar;