export const extractDate = (date: Date, short: boolean = false) => {
  const today = new Date();

  const month = monthNames[date.getMonth()];
  const year = short
    ? today.getFullYear() === date.getFullYear()
      ? ''
      : date.getFullYear()
    : date.getFullYear();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${date.getDate()} ${month} ${year} at ${date.getHours()}:${minutes}`;
};

export const extractRawDate = (date: any, short: boolean = false) =>
  extractDate(new Date(date.seconds * 1000), short);

const monthNames = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
];

export const getDayOfWeek = (day: number) =>
  ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][day];
