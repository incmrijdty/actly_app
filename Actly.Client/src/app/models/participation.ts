export interface ParticipationDto {
  userId: number;
  eventId: number;
  attended: boolean;
  feedback: string | null;
}
