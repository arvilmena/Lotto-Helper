export function getDateOneMonthFromNow(): Date {
  const currentDate = new Date();
  const futureDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
  );
  return futureDate;
}
