import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from './user.model';

// Define the shape of the User feature state
// We extend EntityState provided by @ngrx/entity
// EntityState gives us { ids: [], entities: {} } structure
export interface UserState extends EntityState<User> {
    // Add other properties for this state slice if needed
    loading: boolean;
    error: string | null;
    selectedUserId: string | null; // Example: if you wanted to track selection
}

// Create an entity adapter
// It provides utility functions to manage the entity collection (add, update, remove, etc.)
// Select the primary key (id)
// Sort entities by name (optional)
export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    // for specifying extra properties in the state
    // Specify how to extract the unique ID from each User object
    selectId: (user: User) => user.id,
    sortComparer: (a: User, b: User): number => a.name.localeCompare(b.name),
});

// Define the initial state using the adapter's getInitialState method
export const initialUserState: UserState = userAdapter.getInitialState({
    // userAdapter.getInitialState() returns the initial state with ids and entities properties
    // Add initial values for other properties
    loading: false,
    error: null,
    selectedUserId: null,
});

// NOTE:
// * `EntityState<User>`: Provides a standard structure (`ids: string[] | number[]`, `entities: { [id: string | number]: User }`) for storing collections.
// * `createEntityAdapter`: Creates an adapter with helper functions for common entity operations (add, update, remove, etc.) and selectors.
// * `userAdapter.getInitialState`: Creates the initial state object, including the `ids` and `entities` properties, plus any custom properties we defined (`loading`, `error`).