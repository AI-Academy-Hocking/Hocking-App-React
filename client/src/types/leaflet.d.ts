declare module 'leaflet' {
  export class Map {
    constructor(element: string | HTMLElement, options?: any);
    setView(center: LatLngExpression, zoom: number): this;
    remove(): this;
    eachLayer(callback: (layer: any) => void): this;
    removeLayer(layer: any): this;
    zoomIn(): this;
    zoomOut(): this;
  }

  export class Marker {
    constructor(latlng: LatLngExpression, options?: any);
    addTo(map: Map): this;
    bindPopup(content: string): this;
    setLatLng(latlng: LatLngExpression): this;
    remove(): void;
  }

  export const WebSocket: {
    OPEN: number;
  };

  export class DivIcon {
    constructor(options: any);
  }

  export function map(element: string | HTMLElement, options?: any): Map;
  export function marker(latlng: LatLngExpression, options?: any): Marker;
  export function tileLayer(urlTemplate: string, options?: any): any;
  export function divIcon(options: any): DivIcon;

  export type LatLngExpression = [number, number] | { lat: number; lng: number };
}