
import { groupBy } from 'lodash';
import { createSelector } from 'reselect';
import {
  USERNAME, ACTION, EXPELLED, BANNED,
} from './common/consts';

export const selectBlocked = (state) => state.BlockedReducer.blocked;
export const selectDone = (state) => state.BlockedReducer.done;

export const selectCurrentUser = (state) => state.User.currentUser;
export const selectLoading = (state) => state.BlockedReducer.loading;

export const selectErrors = (state) => state.BlockedReducer.error || false;

export const selectBlockedByUser = createSelector(
  selectBlocked,
  (users) => groupBy(users, USERNAME),
);

export const selectBlockedList = createSelector(
  selectBlockedByUser,
  (users) => Object.keys(users).map(((user) => ({ user }))),
);

export const selectTop = createSelector(
  selectBlockedByUser,
  (users) => users
   && Object.entries(users)
     .sort((a, b) => b[1].length - a[1].length)
     .slice(0, 10)
     .map((user) => user[0]),
);

export const selectUserData = (state, user) => selectBlockedByUser(state)[user];

export const selectCurrentData = (state) => selectCurrentUser(state)
 && selectUserData(state, selectCurrentUser(state));

const expelledOrBanned = (action) => action === BANNED || action === EXPELLED;

export const selectOnlyBanned = createSelector(
  selectBlocked,
  (users) => users && users
    .filter((user) => expelledOrBanned(user[ACTION])),
);

export const selectLast = createSelector(
  selectOnlyBanned,
  (users) => users && users
    .slice(0, 10)
    .map((user) => user[USERNAME]),
);
