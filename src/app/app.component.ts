import { Component } from '@angular/core';
import { GridDimension } from '../draw/basics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gridSize = new GridDimension(5, 5, 12);

  // FOR 1920*1080
  // gridSize = new GridDimension(27, 80, 2);
}
