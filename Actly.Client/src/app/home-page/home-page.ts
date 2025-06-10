import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { Event } from '../models/event';
import { EventCardComponent } from '../event-card-component/event-card-component';

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

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchEvents();
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
}
