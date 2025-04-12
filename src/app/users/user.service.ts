import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { User } from './user.model';

// Simulate API latency
const API_DELAY = 500;

@Injectable({
  providedIn: 'root', // Service available globally
})
export class UserService {
  private users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
  ];

  // Simulate GET /users
  getUsers(): Observable<User[]> {
    console.log('UserService: Fetching users...');
    return of(this.users).pipe(delay(API_DELAY));
    // Simulate error (uncomment to test failure case):
    // return throwError(() => new Error('Failed to fetch users')).pipe(delay(API_DELAY));
  }

  // Simulate POST /users
  addUser(userData: Omit<User, 'id'>): Observable<User> {
    console.log('UserService: Adding user...', userData);
    // Simulate error (uncomment to test failure case):
    // return throwError(() => new Error('Failed to add user')).pipe(delay(API_DELAY));

    const newUser: User = {
      id: Date.now().toString(), // Generate a simple unique ID
      ...userData,
    };
    this.users = [...this.users, newUser]; // Add to our mock DB (immutable update)
    return of(newUser).pipe(delay(API_DELAY));
  }
}