import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { mapToken } from './map-token';

const STYLE_ID = 'parsimap-streets-v11';

const preloadMapboxPlugins = (cdnUrl = 'https://cdn.parsimap.ir') => {
  if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
    mapboxgl.setRTLTextPlugin(
      `${cdnUrl}/third-party/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js`,
      () => {},
    );
  }
};

@Component({
  selector: 'app-map',
  template: `
    @if (error()) { <p role="alert">{{ error() }}</p> }
    <div #container style="width: 100%; height: 500px"></div>
  `,
})
export class MapComponent {
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');
  readonly error = signal('');
  private map: mapboxgl.Map | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.map?.remove());
    afterNextRender(() => {
      if (!mapboxgl.supported()) {
        this.error.set('This browser does not support the WebGL features required to display the map.');
        return;
      }
      if (!mapToken || mapToken === 'YOUR_TOKEN_HERE') {
        this.error.set('Set your token in src/map-token.ts.');
        return;
      }
      try {
        preloadMapboxPlugins();
        this.map = new mapboxgl.Map({
          container: this.container().nativeElement,
          style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(mapToken)}`,
          center: [51.389, 35.6892],
          zoom: 11,
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        this.map.on('error', () =>
          this.error.set('The map could not load. Check your token and network connection.'),
        );
      } catch {
        this.map?.remove();
        this.map = null;
        this.error.set('The map could not start. Check your browser and token.');
      }
    });
  }
}
