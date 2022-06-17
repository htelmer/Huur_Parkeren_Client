export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user?.profile;

export const selectFavorites = (state) => state.user?.profile.favorites;

export const selectUserToken = (state) => state.user;

export const selectMyAreas = (state) => state.user?.profile?.owner;

export const selectMyBookings = (state) => state.user?.profile?.owner.bookings;

export const selectMyArea = (id) => (state) => {
  return state.user?.profile?.owner.find((a) => a.id === id);
};
