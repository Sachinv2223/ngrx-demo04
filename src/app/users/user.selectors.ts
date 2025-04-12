import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter, UserState } from './user.state';
import { userFeatureKey } from './user.reducer';

// 1. Feature Selector: Selects the 'users' feature state slice
export const selectUserState = createFeatureSelector<UserState>(userFeatureKey);

// 2. Entity Adapter Selectors: Use adapter's built-in selectors
const {
  selectAll, // Selects the array of users
  selectEntities, // Selects the dictionary of users
  selectIds, // Selects the array of user ids
  selectTotal, // Selects the total count of users
} = userAdapter.getSelectors(selectUserState); // Pass the feature selector here

// 3. Expose the selectors you need
export const selectAllUsers = selectAll;
export const selectUserEntities = selectEntities;
export const selectUserIds = selectIds;
export const selectUserTotal = selectTotal;

// 4. Custom Selectors: Create selectors for specific derived data
export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading // Select the loading flag
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error // Select the error message
);

// Example: Selector to get a specific user by ID (if needed)
export const selectUserById = (userId: string) => createSelector(
  selectUserEntities,
  (entities) => entities[userId]
);