export const FormateStringToDate = (dateStr) => {
  const date = new Date(dateStr);

  // Extract day, month, year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  // Format as dd-mm-yyyy
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const FormatStringYearToDate = (dateStr) => {
  const date = new Date(dateStr);

  // Format to yyyy-mm-dd
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
