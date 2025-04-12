import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { CounterComponent } from './counter/counter/counter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserListComponent, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
