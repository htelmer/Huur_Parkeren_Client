export const selectAreas = (reduxState) =>
  reduxState.rentalAreas.allRentalAreas;
//console.log("selector??", getAreas);
export const getLoading = (reduxState) => reduxState.rentalAreas.loading;
export const selectAreaDetails = (reduxState) =>
  reduxState.rentalAreas.areaDetails;
