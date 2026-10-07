import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-local-storage',
  imports: [CommonModule],
  providers: [LocalStorageService],
  templateUrl: './local-storage.html',
  styleUrl: './local-storage.css',
})
export class LocalStorage implements OnInit {
  platformId = inject(PLATFORM_ID);
  private localStorageService = inject(LocalStorageService);
  resultados$ = this.localStorageService.list();

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('test1', 'value1');
      localStorage.setItem('test2', 'value2');
    }

    this.localStorageService.list().subscribe((data) => {
      console.log(data);
    });
  }

  add() {
    this.localStorageService.add('hola', 'añadido');
  }

  update() {
    this.localStorageService.update('hola', 'te cambio');
  }
}
