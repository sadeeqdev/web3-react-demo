export const formatCurrency = (value) => {
  if (typeof value !== "number") {
    return "";
  }
  return value.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
