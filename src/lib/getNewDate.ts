export const getNewDate = (currDate: any, currDay: number) => {
  const date = new Date(currDate);
  date.setDate(date.getDate() + currDay + 1);
  return date.toISOString().split("T")[0];
};