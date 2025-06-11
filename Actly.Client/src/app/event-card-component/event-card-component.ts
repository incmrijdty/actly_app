import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../models/event';
import { ParticipationService } from '../services/participation';
import { AuthService } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
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
  canJoin = false;

  constructor(
    private participationService: ParticipationService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const token = this.auth.getToken();
    console.log('[EventCardComponent] token:', token);

    if (token) {
      try {
        const payload = jwtDecode<JwtPayload>(token);
        console.log('[EventCardComponent] decoded token:', payload);

        this.canJoin = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Volunteer';
        console.log(this.canJoin)
        this.cdr.markForCheck();
      } catch (err) {
        console.error('[EventCardComponent] Invalid token:', err);
      }
    } else {
      console.warn('[EventCardComponent] No token found');
    }
  }

  joinEvent() {
    const token = this.auth.getToken();
    if (!token) return;

    const payload = jwtDecode<JwtPayload>(token);
    const participation = {
      userId: Number(payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']),
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
