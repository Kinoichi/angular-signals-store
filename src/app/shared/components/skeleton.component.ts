import { Component, HostBinding, Input } from '@angular/core';

// skeleton.component.ts
@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: ``,
  styles: [
    `
      :host {
        display: block;
        background: #ecebeb;
        background: linear-gradient(90deg, #ecebeb 25%, #f5f5f5 50%, #ecebeb 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 4px;

        /* THE DELAY TRICK */
        opacity: 0;
        animation:
          shimmer 1.5s infinite,
          fadeIn 0.3s ease-in 0.4s forwards; /* 400ms delay */
      }

      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }
    `,
  ],
})
export class SkeletonComponent {
  // We can use inputs to change shape on the fly
  @Input() width = '100%';
  @Input() height = '20px';
  @Input() borderRadius = '4px';

  @HostBinding('style.width') get w() {
    return this.width;
  }
  @HostBinding('style.height') get h() {
    return this.height;
  }
  @HostBinding('style.borderRadius') get r() {
    return this.borderRadius;
  }
}
