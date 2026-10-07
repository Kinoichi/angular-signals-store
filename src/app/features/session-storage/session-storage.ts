import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Component({
  selector: 'app-session-storage',
  imports: [CommonModule],
  providers: [SessionStorageService],
  templateUrl: './session-storage.html',
  styleUrl: './session-storage.css',
})
export class SessionStorage implements OnInit {
  platformId = inject(PLATFORM_ID);
  sessionStorageService = inject(SessionStorageService);
  resultados = this.sessionStorageService.list();

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('flex1', 'value1');
      sessionStorage.setItem('flex2', 'value2');
    }
  }

  add() {
    this.sessionStorageService.add('flex3', 'rao');
  }

  update() {
    this.sessionStorageService.update('flex3', 'tao');
  }
}
