import { Component, computed, signal } from '@angular/core';
import { form, FormField, max, min } from '@angular/forms/signals';
// @ts-ignore
import DarianSystem from 'darian-system';

@Component({
  selector: 'app-martian-calendar',
  templateUrl: './martian-calendar.component.html',
  styleUrls: ['./martian-calendar.component.css'],
  imports: [FormField],
})
export class MartianCalendarComponent {
  private readonly now = new Date();

  calendarModel = signal({
    year: this.now.getFullYear(),
    month: this.now.getMonth() + 1,
    day: this.now.getDate(),
  });

  calendarForm = form(this.calendarModel, (schema) => {
    min(schema.month, 1);
    max(schema.month, 12);

    min(schema.day, 1);
    max(schema.day, 31);
  });

  martianDate = computed(() => {
    const { year, month, day } = this.calendarModel();
    const earthDate = new Date(year, month - 1, day);

    return new DarianSystem.Darian_Date(earthDate).getDate();
  });
}
