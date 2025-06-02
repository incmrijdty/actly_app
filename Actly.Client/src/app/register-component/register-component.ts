import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
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
  success = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register({ username: this.username, email: this.email, role: this.role, password: this.password })
      .subscribe({
        next: () => {
          this.success = 'Registered successfully!';
          this.router.navigate(['/login']);
        },
        error: err => this.error = err.error || 'Registration failed'
      });
  }
}
