import { Component, inject } from '@angular/core';
import { MoonsService } from 'space-api/services';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-moons',
  templateUrl: './moons.component.html',
  styleUrl: './moons.component.css',
  imports: [AsyncPipe]
})
export default class MoonsComponent {
  private moonService = inject(MoonsService);

  moons = this.moonService.getMoons();

}
