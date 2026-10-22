import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { A2sCommComponent } from 'a2s-comm';
import { APP_CONFIG_TOKEN } from './app-config.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterLink, RouterOutlet, A2sCommComponent, RouterLinkActive],
})
export class AppComponent {
  protected readonly appConfig = inject(APP_CONFIG_TOKEN);

  protected readonly appVersion = this.appConfig.version;
}
