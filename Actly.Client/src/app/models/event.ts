export interface Event {
  id: number;
  title: string;
  organizerId?: number | null;
  description: string;
  date: Date;
  location: string;
  maxParticipants: number;
  category: string;
  attended: boolean;
}
