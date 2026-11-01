import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, computed, signal } from '@angular/core';
import * as L from 'leaflet';
import type { Map as LeafletMap } from 'leaflet';
import { mapToken } from './map-token';

const ATTRIBUTION = '<a href="https://www.mapbox.com/about/maps">&copy; Mapbox</a> | <a href="https://www.openstreetmap.org/about/">&copy; OpenStreetMap</a> | <a href="https://www.parsimap.ir">&copy; Parsimap</a>';

@Component({
  selector: 'app-stateful-map',
  template: `
    <p id="map-status" [attr.role]="error() ? 'alert' : 'status'">{{ status() }}</p>
    <div
      #container
      role="region"
      aria-label="Interactive map of Tehran"
      aria-describedby="map-status"
      style="width: 100%; height: 500px"
    ></div>
  `,
})
export class StatefulMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true })
  private container!: ElementRef<HTMLDivElement>;

  readonly error = signal('');
  readonly map = signal<LeafletMap | null>(null);
  readonly status = computed(() => this.error() || (this.map() ? 'Map initialized.' : 'Initializing map…'));

  ngAfterViewInit(): void {
    if (!mapToken || mapToken === 'YOUR_TOKEN_HERE') {
      this.error.set('Set your token in src/map-token.ts.');
      return;
    }

    let instance: LeafletMap | null = null;
    try {
      instance = L.map(this.container.nativeElement).setView([35.6892, 51.389], 11);
      const attributionContainer = instance.attributionControl.getContainer();
      if (attributionContainer) {
        attributionContainer.dir = 'ltr';
        attributionContainer.style.unicodeBidi = 'isolate';
      }

      const tiles = L.tileLayer(
        `https://api.parsimap.ir/tile/parsimap/{z}/{x}/{y}?key=${encodeURIComponent(mapToken)}`,
        { attribution: ATTRIBUTION, minZoom: 1, maxZoom: 18 },
      );
      tiles.on('tileerror', () => {
        this.error.set('The map tiles could not load. Check your token and network connection.');
      });
      tiles.addTo(instance);
      this.map.set(instance);
    } catch {
      instance?.remove();
      this.error.set('The map could not start. Check your browser and token.');
    }
  }

  ngOnDestroy(): void {
    this.map()?.remove();
    this.map.set(null);
  }
}
