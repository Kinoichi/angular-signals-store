import { Component, Input, signal } from '@angular/core';
import { isActive } from '@angular/router';

@Component({
  selector: 'app-tob',
  imports: [],
  templateUrl: './tob.html',
  styleUrl: './tob.css',
  host: {
    '[style.display]': `isActive() ? 'block' : 'none' `,
  },
})
export class Tob {
  @Input() title: string = '';
  isActive = signal(false);
}
