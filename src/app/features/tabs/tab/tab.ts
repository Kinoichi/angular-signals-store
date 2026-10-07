import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.html',
  styleUrl: './tab.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.display]': `isActive() ? 'block' : 'none'`,
  },
})
export class Tab {
  @Input() title: string = '';
  isActive = signal(false);
}
