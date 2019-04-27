export const extractDate = (date: Date, short: boolean = false) => {
  const today = new Date();

  const month = monthNames[date.getMonth()];
  const year = short
    ? today.getFullYear() === date.getFullYear()
      ? ""
      : date.getFullYear()
    : date.getFullYear();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${date.getDate()} ${month} ${year} at ${date.getHours()}:${minutes}`;
};

const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december"
];
