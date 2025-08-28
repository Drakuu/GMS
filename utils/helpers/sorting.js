// utils/sortingUtils.js
export const sortByString = (a, b, order = 'asc') => {
   const comparison = a.localeCompare(b);
   return order === 'asc' ? comparison : -comparison;
};

export const sortByNumber = (a, b, order = 'asc') => {
   return order === 'asc' ? a - b : b - a;
};

export const sortByDate = (a, b, order = 'asc') => {
   const dateA = new Date(a);
   const dateB = new Date(b);
   return order === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
};

export const sortByProperty = (array, property, order = 'asc', type = 'string') => {
   return [...array].sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (type === 'number') {
         return sortByNumber(Number(valueA), Number(valueB), order);
      } else if (type === 'date') {
         return sortByDate(String(valueA), String(valueB), order);
      } else {
         return sortByString(String(valueA), String(valueB), order);
      }
   });
};

export const multiSort = (array, sortCriteria) => {
   return [...array].sort((a, b) => {
      for (const criteria of sortCriteria) {
         const { property, order, type = 'string' } = criteria;
         const valueA = a[property];
         const valueB = b[property];

         let comparison = 0;

         if (type === 'number') {
            comparison = sortByNumber(Number(valueA), Number(valueB), order);
         } else if (type === 'date') {
            comparison = sortByDate(String(valueA), String(valueB), order);
         } else {
            comparison = sortByString(String(valueA), String(valueB), order);
         }

         if (comparison !== 0) {
            return comparison;
         }
      }
      return 0;
   });
};

export const applySorting = (array, sortOption) => {
   switch (sortOption) {
      case 'name-asc':
         return sortByProperty(array, 'name', 'asc');
      case 'name-desc':
         return sortByProperty(array, 'name', 'desc');
      case 'price-asc':
         return sortByProperty(array, 'price', 'asc', 'number');
      case 'price-desc':
         return sortByProperty(array, 'price', 'desc', 'number');
      case 'date-asc':
         return sortByProperty(array, 'createdAt', 'asc', 'date');
      case 'date-desc':
         return sortByProperty(array, 'createdAt', 'desc', 'date');
      default:
         return array;
   }
};