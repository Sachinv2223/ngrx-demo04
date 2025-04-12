import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.model';

// Use createActionGroup for concise action definitions
export const UserActions = createActionGroup({
  source: 'Users API', // Unique source for these actions
  events: {
    // Command Actions (Triggering side effects or direct state changes)
    'Load Users': emptyProps(), // Action to initiate loading users
    'Add User': props<{ user: Omit<User, 'id'> }>(), // Action to initiate adding a user

    // Document Actions (Result of side effects)
    'Load Users Success': props<{ users: User[] }>(), // Users loaded successfully
    'Load Users Failure': props<{ error: string }>(), // Failed to load users

    'Add User Success': props<{ user: User }>(), // User added successfully
    'Add User Failure': props<{ error: string }>(), // Failed to add user
  },
});


// example for createAction() - FYI
// export const loadUsers = createAction('[Users API] Load Users');
// export const loadUsersSuccess = createAction('[Users API] Load Users Success', props<{ users: User[] }>());
// export const loadUsersFailure = createAction('[Users API] Load Users Failure', props<{ error: string