import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'books',
    renderMode: RenderMode.Server,
  },
  {
    path: 'ls',
    renderMode: RenderMode.Server,
  },
  {
    path: 'ss',
    renderMode: RenderMode.Server,
  },
  {
    path: 'search',
    renderMode: RenderMode.Server,
  },
  {
    path: 'search-2',
    renderMode: RenderMode.Server,
  },
  {
    path: 'tabs',
    renderMode: RenderMode.Server,
  },
  {
    path: 'tobs',
    renderMode: RenderMode.Server,
  },
  {
    path: 'search-api',
    renderMode: RenderMode.Server,
  },
  {
    path: 'search-signal',
    renderMode: RenderMode.Server,
  },
  {
    path: 'search-signal-2',
    renderMode: RenderMode.Server,
  },
  {
    path: 'monitor',
    renderMode: RenderMode.Server,
  },
  {
    path: 'smonitor',
    renderMode: RenderMode.Server,
  },
  {
    path: 'search-finalo',
    renderMode: RenderMode.Server,
  },
];
