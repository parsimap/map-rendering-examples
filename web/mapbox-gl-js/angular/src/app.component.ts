import { Component } from '@angular/core';
import { MapComponent } from './map.component';

@Component({
  selector: 'app-root',
  imports: [MapComponent],
  template: '<main><app-map /></main>',
})
export class AppComponent {}
