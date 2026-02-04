import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  imports: [],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  onLogout() {
    // Implement logout logic here / Implementa la logica di logout qui
    console.log('User logged out');
  }
}
