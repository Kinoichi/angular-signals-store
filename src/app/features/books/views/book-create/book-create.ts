import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookStore } from '../../book.store';
import { BookFormModel } from '../../models/book-form.model';

@Component({
  selector: 'app-book-create',
  imports: [ReactiveFormsModule],
  templateUrl: './book-create.html',
  styleUrl: './book-create.css',
})
export class BookCreate {
  private fb = inject(FormBuilder);
  readonly store = inject(BookStore);

  // Define the form structure / Definisci la struttura del form
  bookForm = this.fb.group<BookFormModel>({
    title: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    author: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
  });

  onSubmit() {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.getRawValue();
      this.store.createBook(bookData);
    }
  }
}
