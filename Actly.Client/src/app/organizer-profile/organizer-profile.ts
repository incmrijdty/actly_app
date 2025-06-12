import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AuthService } from '../services/auth';
import { EventService } from '../services/event';
import { jwtDecode } from 'jwt-decode';
import { Event } from '../models/event';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from '../event-form-component/event-form-component';
import { EventCardComponent } from '../event-card-component/event-card-component';

interface JwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
}

@Component({
  selector: 'app-organizer-profile',
  imports: [EventFormComponent, CommonModule, EventCardComponent],
  templateUrl: './organizer-profile.html',
  styleUrls: ['./organizer-profile.css']
})
export class OrganizerProfileComponent implements OnInit {
  user: { id: number; username: string; email: string; role: string } | null = null;
  createdEvents: Event[] = [];

  constructor(private auth: AuthService, private eventService: EventService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const token = this.auth.getToken();
    if (!token) return;

    const payload = jwtDecode<JwtPayload>(token);
    this.user = {
      id: Number(payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']),
      username: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    };

    this.fetchCreatedEvents();
  }

  fetchCreatedEvents() {
    if (this.user) {
      this.eventService.getEventsByOrganizerId(this.user.id).subscribe(events => {
        this.createdEvents = events;
        this.cdr.detectChanges();
      });
    }
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.createdEvents = this.createdEvents.filter(e => e.id !== id);
    });
  }

  selectedEvent: Event | null = null;
  showForm = false;

  editEvent(event: Event) {
    this.selectedEvent = event;
    this.showForm = true;
  }

  createEvent() {
    this.selectedEvent = null;
    this.showForm = true;
  }

  
  onEventSaved() {
    this.showForm = false;
    this.fetchCreatedEvents();
  }
}
