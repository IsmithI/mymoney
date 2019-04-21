export const extractDate = (date: any) => {
  const d = new Date(date.seconds * 1000);
  return `${d.getDate()}/${d.getMonth() +
    1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};
