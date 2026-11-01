import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './map.component';
import { StatefulMapComponent } from './stateful-map.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: MapComponent, title: 'Parsimap + Leaflet + Angular' },
      { path: 'stateful', component: StatefulMapComponent, title: 'Parsimap + Leaflet + Angular – stateful' },
    ]),
  ],
}).catch((error: unknown) => console.error(error));
