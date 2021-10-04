export const API_URL = 'http://localhost:2424';

export const monthLong = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const days = (startDate, endDate) => parseInt(
  (endDate - startDate) / (1000 * 60 * 60 * 24),
  10,
);

export const hours = (startDate, endDate) => parseInt(
  (Math.abs(endDate - startDate) / (1000 * 60 * 60)) % 24,
  10,
);
export const minutes = (startDate, endDate) => parseInt(
  (Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60)) % 60,
  10,
);
export const seconds = (startDate, endDate) => parseInt(
  (Math.abs(endDate.getTime() - startDate.getTime()) / (1000)) % 60,
  10,
);
