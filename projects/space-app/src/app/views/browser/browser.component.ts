import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-browser',
  imports: [RouterLink],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.scss',
})
export default class BrowserComponent {
  private domSanitizer = inject(DomSanitizer);

  url: InputSignal<string> = input('');
  safeUrl = computed(() =>
    this.domSanitizer.bypassSecurityTrustResourceUrl(this.url()),
  );
}
