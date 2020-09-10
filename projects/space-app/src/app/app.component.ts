import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { A2sCommComponent } from 'a2s-comm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterLink, RouterOutlet, A2sCommComponent, RouterLinkActive]
})
export class AppComponent {
  title = 'space-app';
}
