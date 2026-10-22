import { Component, computed, linkedSignal, signal } from '@angular/core';

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
  };

  availableImageTypes = signal<ImageType[]>(Object.keys(this.images) as ImageType[]);

  selectedImageType = signal<ImageType>(this.availableImageTypes()[0]);

  availableImages = computed(() => this.images[this.selectedImageType()]);

  selectedImage = linkedSignal({
    source: this.selectedImageType,
    computation: (selectedImageType) => this.images[selectedImageType][0],
  });

  selectImageType(imageType: ImageType) {
    this.selectedImageType.set(imageType);
  }

  selectImage(image: string) {
    this.selectedImage.set(image);
  }
}
