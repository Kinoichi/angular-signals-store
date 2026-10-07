import { Component } from '@angular/core';
import { TobGroup } from '../tob-group/tob-group';
import { Tob } from '../tob/tob';

@Component({
  selector: 'app-tob-view',
  imports: [TobGroup, Tob],
  templateUrl: './tob-view.html',
  styleUrl: './tob-view.css',
})
export class TobView {}
