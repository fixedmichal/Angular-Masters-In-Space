import { IMAGE_LOADER, ImageLoader } from '@angular/common';
import { Provider } from '@angular/core';

export function provideAppImageLoader(): Provider {
  return { provide: IMAGE_LOADER, useValue: appImageLoader };
}

const appImageLoader: ImageLoader = ({src, width}) => {
  src = src.startsWith('http') ? src : location.origin + src;
  return `/api/get-image?src=${src}&width=${width ?? ''}`;
}
