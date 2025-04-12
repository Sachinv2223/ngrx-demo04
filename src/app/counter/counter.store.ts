import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, tap } from 'rxjs';

// 1. Define the state interface for this store
export interface CounterState {
  count: number;
  updates: number;
}

// 2. Provide the initial state
const initialState: CounterState = {
  count: 0,
  updates: 0,
};

@Injectable() // Provide locally in the component that uses it
export class CounterStore extends ComponentStore<CounterState> {
  // 3. Initialize the store with the initial state
  constructor() {
    super(initialState);
    console.log('CounterStore initialized');
  }

  // 4. Define Selectors (directly within the store)
  readonly count$: Observable<number> = this.select(state => state.count);
  readonly updates$: Observable<number> = this.select(state => state.updates);
  readonly viewModel$ = this.select({ // Combine selectors for a view model
      count: this.count$,
      updates: this.updates$
  });

  // 5. Define Updaters (synchronous state modifications)
  // An updater takes the current state and returns the partial state to update.
  readonly increment = this.updater((state) => ({
    count: state.count + 1,
    updates: state.updates + 1,
  }));

  readonly decrement = this.updater((state) => ({
    count: state.count - 1,
    updates: state.updates + 1,
  }));

  // An updater can also take parameters
  readonly setCount = this.updater((state, value: number) => ({
      count: value,
      updates: state.updates + 1
  }));

  // 6. Define Effects (asynchronous operations)
  // Example: An effect that updates the count after a delay
  readonly delayedIncrement = this.effect((trigger$: Observable<void>) => {
      return trigger$.pipe(
          tap(() => console.log('Starting delayed increment...')),
          // Use switchMap, mergeMap etc. as needed
          // Here we just simulate an action
          tap(() => {
              // Effects can call updaters or patchState directly
              this.patchState(state => ({ count: state.count + 5, updates: state.updates + 1 }));
              console.log('Delayed increment finished.');
          })
      );
  });

  // Optional: Log state changes (useful for debugging)
  // readonly logState = this.effect(() => {
  //   return this.state$.pipe(tap(state => console.log('Counter State:', state)));
  // });
}

// NOTE:
// * `ComponentStore<CounterState>`: Extends the base class, typed with the state shape.
// * `constructor()`: Calls `super(initialState)` to set the initial state.
// * `select()`: Creates observables for state slices.
// * `updater()`: Creates functions for *synchronous* state updates. They are pure functions modifying state immutably under the hood.
// * `effect()`: Creates functions for handling *asynchronous* side effects specific to this component's state. Effects typically call updaters or `patchState` upon completion.
// * `patchState()`: Another way to update state, accepting a partial state object or a function.