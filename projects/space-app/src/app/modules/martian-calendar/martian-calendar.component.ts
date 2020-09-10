import { Component } from '@angular/core';
// @ts-ignore
import DarianSystem from 'darian-system';

@Component({
  selector: 'app-martian-calendar',
  templateUrl: './martian-calendar.component.html',
  styleUrls: ['./martian-calendar.component.css'],
})
export class MartianCalendarComponent {
  currentDate = new DarianSystem.Darian_Date().getDate();
}
