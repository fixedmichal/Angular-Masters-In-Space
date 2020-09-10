import { Component, input, ResourceRef } from '@angular/core';

@Component({
  selector: 'app-resource-wrapper',
  imports: [],
  templateUrl: './resource-wrapper.component.html',
  styleUrl: './resource-wrapper.component.scss'
})
export class ResourceWrapperComponent {
  resource = input.required<ResourceRef<unknown>>()
}
