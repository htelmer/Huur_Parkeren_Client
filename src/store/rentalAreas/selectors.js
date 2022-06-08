export const selectAreas = (reduxState) => reduxState.area.allRentalAreas;
//console.log("selector??", selectAreas);
export const getLoading = (reduxState) => reduxState.area.loading;
export const selectAreaDetails = (reduxState) => reduxState.area.areaDetails;
export const selectAllReducer = (reduxState) => reduxState.area;
export const getPricesLowerThan = (price) => (reduxState) => {
  const area = reduxState.area.allRentalAreas;
  console.log("price", price);
  if (!isNaN(price)) {
    return area.filter((c) => c.price <= price);
  }
  return area;
};
export const selectAvailableFrom = (availableStartDate) => (reduxState) => {
  const area = reduxState.area.allRentalAreas;
  const availableFrom = area.filter(
    (d) => d.availableStartDate >= availableStartDate
  );
  return availableFrom;
};

//const higherThan = area.filter((h) => h.price > price);
//const definedPrice = area.filter(
//(b) => lowerThan >= b.price && b.price > higherThan
