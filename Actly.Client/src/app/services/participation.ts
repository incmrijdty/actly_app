import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParticipationDto } from '../models/participation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {
  private apiUrl = 'http://localhost:5126/api/Participation';

  constructor(private http: HttpClient) {}

  joinEvent(participation: ParticipationDto): Observable<any> {
    return this.http.post(this.apiUrl, participation);
  }

  leaveEvent(participationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${participationId}`);
  }
}
