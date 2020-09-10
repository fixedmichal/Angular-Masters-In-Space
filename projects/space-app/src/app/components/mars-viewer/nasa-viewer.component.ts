import { Component, computed, signal } from '@angular/core';

type ImageType = 'planets' | 'telescopes';

@Component({
  selector: 'app-nasa-viewer',
  imports: [],
  templateUrl: './nasa-viewer.component.html',
  styleUrls: ['./nasa-viewer.component.scss']
})
export class NasaViewerComponent {
  private images: Record<ImageType, string[]> = {
    planets: ['Earth', 'Mars', 'Mercury', 'Venus'],
    telescopes: ['Hubble', 'Kepler', 'NuSTAR', 'Spitzer', 'TESS', 'Webb']
  }

  availableImages = computed(() => Object.values(this.images).flat());

  selectedImage = signal<string>(this.availableImages()[0]);

  selectImage(image: string) {
    this.selectedImage.set(image);
  }
}
