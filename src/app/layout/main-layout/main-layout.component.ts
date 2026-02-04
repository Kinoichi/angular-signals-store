import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Sidenav } from '../sidenav/sidenav';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
  imports: [RouterOutlet, Header, Sidenav, Footer],
})
export class MainLayoutComponent {}
