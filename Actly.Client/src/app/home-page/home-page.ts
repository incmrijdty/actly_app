import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Event } from '../models/event';
import { EventCardComponent } from '../event-card-component/event-card-component';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, EventCardComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export class HomePage implements OnInit {
  events: Event[] = [];
  loading = true;
  isLoggedIn = false;
  userRole: string | null = null;
  private authSub?: Subscription;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEvents();

    this.authSub = this.authService.isLoggedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.userRole = this.authService.getUserRole();
      this.cd.detectChanges();
    });

    // Initialize values on load
    this.isLoggedIn = this.authService.isLoggedIn.getValue();
    this.userRole = this.authService.getUserRole();
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  fetchEvents(): void {
    this.http.get<Event[]>('http://localhost:5126/api/Events') 
      .subscribe({
        next: (data) => {
          this.events = data;
          this.loading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Failed to fetch events', err);
          this.loading = false;
          this.cd.detectChanges();
        }
      });
  }


  logout() {
    this.authService.logout();
    alert('You have been logged out successfully.');
  }

}
