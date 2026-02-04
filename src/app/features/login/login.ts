import { Component, inject, signal } from '@angular/core';
import { AuthStore } from '../../core/store/auth.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly store = inject(AuthStore);

  // Define signals for the inputs
  // Definisci i signal per gli input
  email = signal('');
  password = signal('');

  onSubmit() {
    // You access them with ()
    // Vi accedi con ()
    this.store.login({
      email: this.email(),
      pass: this.password(),
    });
  }
}
