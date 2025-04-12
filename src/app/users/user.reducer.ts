import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { initialUserState, userAdapter, UserState } from './user.state';

export const userFeatureKey = 'users'; // Unique key for this feature state

export const userReducer = createReducer(
  initialUserState,

  // Handle Load Users action
  on(UserActions.loadUsers, (state): UserState => ({
      ...state,
      loading: true,
      error: null,
  })),

  // Handle Load Users Success action
  on(UserActions.loadUsersSuccess, (state, { users }): UserState =>
    // Use the adapter's setAll method to replace the existing collection
    userAdapter.setAll(users, {
        ...state,
        loading: false,
        error: null,
    })
  ),

  // Handle Load Users Failure action
  on(UserActions.loadUsersFailure, (state, { error }): UserState => ({
      ...state,
      loading: false,
      error: error,
  })),

  // Handle Add User action (Optimistic UI: assume success, handle failure later if needed)
   on(UserActions.addUser, (state): UserState => ({
      ...state,
      loading: true, // Indicate loading while adding
      error: null,
  })),

  // Handle Add User Success action
  on(UserActions.addUserSuccess, (state, { user }): UserState =>
    // Use the adapter's addOne method to add the new user
    userAdapter.addOne(user, {
      ...state,
      loading: false, // Stop loading indicator
    })
  ),

  // Handle Add User Failure action
  on(UserActions.addUserFailure, (state, { error }): UserState => ({
      ...state,
      loading: false, // Stop loading indicator
      error: error,
  }))

  // Add more 'on' handlers for other actions as needed
);