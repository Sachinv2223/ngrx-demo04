import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  constructor() { }

  // This method simulates an async operation to get a random number to increment the count
  getRandomNumberToIncrement(): Observable<number> {
    return of(Math.floor(Math.random() * 10) + 1).pipe(
      delay(2000) // Simulate a delay of 1 second for the async operation;
    );
  }

}
