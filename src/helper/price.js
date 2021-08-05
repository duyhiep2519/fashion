export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const getPrice = (price) => {
  return formatter.format(price);
};
export const getPriceSale = (price, sale) => {
  const res = price - (price * sale) / 100;

  return formatter.format(res);
};
