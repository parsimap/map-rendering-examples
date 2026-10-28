import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import * as maplibregl from 'maplibre-gl';
import { mapToken } from './map-token';

const STYLE_ID = 'parsimap-streets-v11';

@Component({
  selector: 'app-root',
  template: `
    <main>
      @if (error()) { <p role="alert">{{ error() }}</p> }
      @else { <p role="status">{{ map() ? 'Map initialized.' : 'Initializing map…' }}</p> }
      <div #container style="width: 100%; height: 500px"></div>
    </main>
  `,
})
export class StatefulMapComponent {
  private readonly document = inject(DOCUMENT);
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');
  readonly error = signal('');
  readonly map = signal<maplibregl.Map | null>(null);

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.map()?.remove();
      this.map.set(null);
    });
    afterNextRender(() => {
      if (!mapToken || mapToken === 'YOUR_TOKEN_HERE') {
        this.error.set('Set your token in src/map-token.ts.');
        return;
      }
      let instance: maplibregl.Map | null = null;
      try {
        maplibregl.setWorkerUrl(new URL('assets/maplibre-gl-worker.mjs', this.document.baseURI).toString());
        instance = new maplibregl.Map({
          container: this.container().nativeElement,
          style: `https://api.parsimap.ir/styles/${STYLE_ID}?key=${encodeURIComponent(mapToken)}`,
          center: [51.389, 35.6892], zoom: 11,
        });
        instance.addControl(new maplibregl.NavigationControl());
        instance.on('error', () => this.error.set('The map could not load. Check your token and network connection.'));
        this.map.set(instance);
      } catch {
        instance?.remove();
        this.error.set('The map could not start. Check your browser and token.');
      }
    });
  }
}
