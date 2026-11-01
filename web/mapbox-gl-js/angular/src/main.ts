import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './map.component';
import { StatefulMapComponent } from './stateful-map.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: MapComponent, title: 'Parsimap + Mapbox GL JS + Angular' },
      { path: 'stateful', component: StatefulMapComponent, title: 'Parsimap + Mapbox GL JS + Angular – stateful' },
    ]),
  ],
}).catch((error: unknown) => console.error(error));
