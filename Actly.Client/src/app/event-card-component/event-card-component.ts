import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../models/event';
import { ParticipationService } from '../services/participation';
import { AuthService } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  nameid: string; 
  role: string;
}

@Component({
  selector: 'app-event-card',
  imports: [CommonModule],
  templateUrl: './event-card-component.html',
  styleUrls: ['./event-card-component.css']
})
export class EventCardComponent {
  @Input() event!: Event;
  error = '';
  joined = false;

  constructor(
    private participationService: ParticipationService,
    private auth: AuthService
  ) {}

  get canJoin(): boolean {
    const token = this.auth.getToken();
    if (!token) return false;

    const payload = jwtDecode<JwtPayload>(token);
    return payload.role === 'Volunteer';
  }

  joinEvent() {
    const token = this.auth.getToken();
    if (!token) return;

    const payload = jwtDecode<JwtPayload>(token);
    const participation = {
      userId: Number(payload.nameid),
      eventId: this.event.id,
      attended: false,
      feedback: null
    };

    this.participationService.joinEvent(participation).subscribe({
      next: () => this.joined = true,
      error: err => this.error = err.error || 'Failed to join'
    });
  }
}
