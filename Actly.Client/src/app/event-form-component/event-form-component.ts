import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../services/event';
import { Event } from '../models/event';

@Component({
  selector: 'app-event-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form-component.html',
  styleUrls: ['./event-form-component.css']
})
export class EventFormComponent {
  @Input() eventData: Event | null = null;
  @Output() saved = new EventEmitter<void>();
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService, private cdr: ChangeDetectorRef) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      maxParticipants: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.eventData) {
      this.eventForm.patchValue(this.eventData);
    }
  }

  submit() {
    console.log(this.eventForm.value);
    const formValue = this.eventForm.value;

    const eventPayload = {
      title: this.eventForm.value.title,
      description: this.eventForm.value.description,
      location: this.eventForm.value.location,
      date: this.eventForm.value.dateTime,
      maxParticipants: this.eventForm.value.maxParticipants,
      category: this.eventForm.value.category
    };
    console.log('Payload:', eventPayload);

    if (this.eventData) {
      this.eventService.updateEvent(this.eventData.id, formValue).subscribe(() => this.saved.emit());
    } else {
      this.eventService.createEvent(formValue).subscribe(() => {
        this.saved.emit();
        this.cdr.detectChanges(); // optional, usually not needed
      });
    }
  }
}
