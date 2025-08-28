// utils/dateUtils.js
export const formatDate = (date) => {
   if (!date) return '';

   const d = new Date(date);
   return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
   });
};

export const formatDateTime = (date) => {
   if (!date) return '';

   const d = new Date(date);
   return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
   });
};

export const getDaysBetween = (startDate, endDate) => {
   const timeDiff = endDate.getTime() - startDate.getTime();
   return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const isValidDate = (date) => {
   return date instanceof Date && !isNaN(date.getTime());
};

export const parseDateString = (dateString) => {
   const date = new Date(dateString);
   return isValidDate(date) ? date : null;
};

export const isDateInRange = (date, startDate, endDate) => {
   return date >= startDate && date <= endDate;
};

export const getStartOfDay = (date) => {
   const newDate = new Date(date);
   newDate.setHours(0, 0, 0, 0);
   return newDate;
};

export const getEndOfDay = (date) => {
   const newDate = new Date(date);
   newDate.setHours(23, 59, 59, 999);
   return newDate;
};