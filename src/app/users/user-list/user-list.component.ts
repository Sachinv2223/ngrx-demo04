import { Component, inject, OnInit } from '@angular/core';
import { UserFacade } from '../user.facade';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import forms modules
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  addUserForm!: FormGroup;

  // Inject the Facade
  constructor(private fb: FormBuilder, public userFacade: UserFacade) {
    // Form to add a new user
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Dispatch action via facade on component initialization
    this.userFacade.loadUsers();
  }

  onSubmit(): void {
    if (this.addUserForm.valid) {
      const { name, email } = this.addUserForm.value;
      if (name && email) { // Type assertion needed due to partial value possibility
        // Dispatch action via facade
        this.userFacade.addUser({ name, email });
        this.addUserForm.reset(); // Clear the form
      }
    }
  }
}
