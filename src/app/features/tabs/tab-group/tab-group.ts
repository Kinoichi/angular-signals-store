import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  OnInit,
  QueryList,
  signal,
  ViewChild,
} from '@angular/core';
import { Tab } from '../tab/tab';

@Component({
  selector: 'app-tab-group',
  imports: [],
  templateUrl: './tab-group.html',
  styleUrl: './tab-group.css',
})
export class TabGroup implements AfterContentInit {
  @ContentChildren(Tab) tabs!: QueryList<Tab>;
  active = signal(0);

  ngAfterContentInit(): void {
    console.log(this.tabs.length);
    this.updateActive(0);
  }

  updateActive(index: number) {
    this.active.set(index);

    this.tabs.forEach((tab, i) => {
      tab.isActive.set(i === index);
    });
  }
}
