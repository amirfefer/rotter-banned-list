
export const selectBlocked = (state) => state.BlockedReducer.blocked;
export const selectDone = (state) => state.BlockedReducer.done;
export const selectBlockedList = (state) => selectDone(state)
 && Object.keys(selectBlocked(state)).map((user) => ({ user }));

export const selectCurrentUser = (state) => state.User.currentUser;
export const selectUserData = (state, user) => selectBlocked(state)[user];
export const selectLoading = (state) => state.BlockedReducer.loading;

export const selectCurrentData = (state) => selectCurrentUser(state)
 && selectUserData(state, selectCurrentUser(state));

export const selectErrors = (state) => state.BlockedReducer.error || false;
