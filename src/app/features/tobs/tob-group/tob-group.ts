import {
  AfterContentInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  signal,
} from '@angular/core';
import { Tob } from '../tob/tob';

@Component({
  selector: 'app-tob-group',
  imports: [],
  templateUrl: './tob-group.html',
  styleUrl: './tob-group.css',
})
export class TobGroup implements AfterContentInit {
  @ContentChildren(Tob) tabs!: QueryList<Tob>;
  active = signal(0);

  ngAfterContentInit(): void {
    this.updateActive(0);
  }

  updateActive(i: number) {
    this.active.set(i);

    this.tabs.forEach((tab, index) => {
      tab.isActive.set(i === index);
    });
  }
}
