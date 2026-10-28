import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { mapToken } from './map-token';

@Component({
  selector: 'app-root',
  template: `
    <main>
      @if (error()) { <p role="alert">{{ error() }}</p> }
      <div #container style="width: 100%; height: 500px"></div>
    </main>
  `,
})
export class MapComponent {
  private readonly document = inject(DOCUMENT);
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');
  readonly error = signal('');
  private map: maplibregl.Map | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.map?.remove());
    afterNextRender(() => {
      if (!mapToken || mapToken === 'YOUR_TOKEN_HERE') {
        this.error.set('Set your token in src/map-token.ts.');
        return;
      }
      try {
        maplibregl.setWorkerUrl(new URL('assets/maplibre-gl-worker.mjs', this.document.baseURI).toString());
        this.map = new maplibregl.Map({
          container: this.container().nativeElement,
          style: 'https://api.parsimap.ir/styles/parsimap-streets-v11?key=' + encodeURIComponent(mapToken),
          center: [51.389, 35.6892], zoom: 11,
        });
        this.map.addControl(new maplibregl.NavigationControl());
        this.map.on('error', () => this.error.set('The map could not load. Check your token and network connection.'));
      } catch {
        this.map?.remove();
        this.map = null;
        this.error.set('The map could not start. Check your browser and token.');
      }
    });
  }
}
