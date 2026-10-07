import { Component } from '@angular/core';
import { TabGroup } from '../tab-group/tab-group';
import { Tab } from '../tab/tab';

@Component({
  selector: 'app-tab-view',
  imports: [TabGroup, Tab],
  templateUrl: './tab-view.html',
  styleUrl: './tab-view.css',
})
export class TabView {}
