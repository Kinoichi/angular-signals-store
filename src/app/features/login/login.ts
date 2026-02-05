import { Component, inject, signal } from '@angular/core';
import { AuthStore } from '../../core/store/auth.store';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../shared/components/loader.component';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../shared/components/skeleton.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, LoaderComponent, CommonModule, SkeletonComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly authStore = inject(AuthStore);

  // Define signals for the inputs
  // Definisci i signal per gli input
  email = signal('');
  password = signal('');

  onSubmit() {
    // You access them with ()
    // Vi accedi con ()
    this.authStore.login({
      email: this.email(),
      pass: this.password(),
    });
  }
}
