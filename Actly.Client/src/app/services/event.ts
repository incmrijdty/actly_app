import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event'; 

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5126/api/Users';
  private apiUrlOrganizer = 'http://localhost:5126/api/Events'; 

  constructor(private http: HttpClient) {}

  getUserEvents(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/${userId}/events`);
  }

  getEventsByOrganizerId(organizerId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrlOrganizer}/organizer/${organizerId}`);
  }

  // Create a new event
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrlOrganizer, event);
  }

  // Update an existing event
  updateEvent(id: number, event: Event): Observable<void> {
    return this.http.put<void>(`${this.apiUrlOrganizer}/${id}`, event);
  }

  // Delete an event
  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlOrganizer}/${id}`);
  }
}
