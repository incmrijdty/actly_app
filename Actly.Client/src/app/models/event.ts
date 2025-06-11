export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  maxParticipants: number;
  category: string;
  attended: boolean;
}
