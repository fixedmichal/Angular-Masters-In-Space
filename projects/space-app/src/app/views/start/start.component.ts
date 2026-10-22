import { Component } from '@angular/core';
import { LogoComponent } from 'shared-lib';
import { NasaViewerComponent } from '../../components/mars-viewer/nasa-viewer.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
  imports: [LogoComponent, NasaViewerComponent]
})
export default class StartComponent {

}
