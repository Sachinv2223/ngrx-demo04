import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { UserActions } from './user.actions';
import * as UserSelectors from './user.selectors'; // Import all selectors

@Injectable({ providedIn: 'root' }) // Often provided globally or at feature level
export class UserFacade {

    // Expose selectors as observables
    allUsers$: Observable<User[]>;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    totalUsers$: Observable<number>;

    constructor(private store: Store) {
        this.allUsers$ = this.store.select(UserSelectors.selectAllUsers);
        this.loading$ = this.store.select(UserSelectors.selectUserLoading);
        this.error$ = this.store.select(UserSelectors.selectUserError);
        this.totalUsers$ = this.store.select(UserSelectors.selectUserTotal);
    } // Inject the global store

    // Expose methods to dispatch actions
    loadUsers(): void {
        this.store.dispatch(UserActions.loadUsers());
    }

    addUser(user: Omit<User, 'id'>): void {
        this.store.dispatch(UserActions.addUser({ user }));
    }

    // Add more methods as needed for other actions
}

// NOTE:
// A facade is an optional but often helpful abstraction layer. It simplifies interaction with the store by exposing specific state slices as observables and providing methods to dispatch actions. Components interact with the facade instead of directly with the Store.