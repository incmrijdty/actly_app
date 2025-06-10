import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})

export class RegisterComponent {
  username = '';
  email = '';
  role = 'Volunteer';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Submitting register form...');
    this.auth.register({ username: this.username, email: this.email, role: this.role, password: this.password })
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); 
        },
        error: err => {
          if (typeof err.error === 'string') {
            this.error = err.error;
          } else if (err.error?.message) {
            this.error = err.error.message;
          } else {
            this.error = 'Registration failed';
          }
        }
      });
  }
}
