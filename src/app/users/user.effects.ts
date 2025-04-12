import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { UserService } from './user.service';
import { UserActions } from './user.actions';

@Injectable()
export class UserEffects {

    private actions$:Actions = inject(Actions); // Inject Actions service (for dispatching actions)

    // Effect to handle loading users
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers), // Listen for the 'Load Users' action
            mergeMap(() => // Use mergeMap for parallel requests (or switchMap to cancel previous)
                this.userService.getUsers().pipe(
                    map(users => UserActions.loadUsersSuccess({ users })), // On success, dispatch success action
                    catchError(error => of(UserActions.loadUsersFailure({ error: error.message }))) // On error, dispatch failure action
                )
            )
        )
    );

    // Effect to handle adding a user
    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.addUser), // Listen for the 'Add User' action
            switchMap(({ user }) => // Use switchMap or mergeMap based on desired behavior
                this.userService.addUser(user).pipe(
                    map(newUser => UserActions.addUserSuccess({ user: newUser })), // On success, dispatch success action
                    //   catchError(error => of(UserActions.addUserFailure({ error: error.message }))) // On error, dispatch failure action
                    catchError(error => {
                        console.error('Error loading users:', error); // Log the full error for debugging
                        return of(UserActions.loadUsersFailure({ error: 'Failed to load users.' }));
                    })
                )
            )
        )
    );


    // Inject Actions stream and UserService
    constructor(
        // private actions$: Actions,
        private userService: UserService
    ) { }
}

// NOTE:
// * `@Injectable()`: Effects are services.
// * `createEffect`: Defines an effect. It takes a function that returns an Observable<Action>.
// * `actions$`: An observable stream of all dispatched actions.
// * `ofType(ActionType)`: Filters the actions stream for specific action types.
// * `mergeMap`, `switchMap`, `concatMap`, `exhaustMap`: RxJS operators to handle how incoming actions are mapped to service calls (e.g., handle concurrently, cancel previous, queue). `mergeMap` or `switchMap` are common.
// * `map`: Transforms the successful result from the service into a success action.
// * `catchError`: Catches errors from the service call and transforms them into a failure action using `of()`.