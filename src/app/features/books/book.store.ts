import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { BookService } from './services/book.service';
import { computed, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import path from 'path';
import { Book } from './models/book.model';
import { Router } from '@angular/router';

export interface BookState {
  books: Book[];
  selectedBook: Book | null;
  isLoading: boolean;
  error: string | null;
}

export const initialBookState: BookState = {
  books: [],
  selectedBook: null,
  isLoading: false,
  error: null,
};

export const BookStore = signalStore(
  withState(initialBookState),
  withComputed((store) => ({
    booksCount: computed(() => store.books().length),
  })),
  withMethods((store, bookService = inject(BookService), router = inject(Router)) => ({
    async loadBooks(forceRefresh = false) {
      if (store.books().length > 0 && !forceRefresh) return; // Already have books, no need to fetch again

      patchState(store, { isLoading: true, error: null });

      try {
        const books = await lastValueFrom(bookService.getBooks());
        patchState(store, { books, isLoading: false });
      } catch (err) {
        patchState(store, { ...initialBookState, error: 'Failed to load books' });
        return;
      }
    },

    async loadBookById(id: string) {
      if (store.selectedBook()?.id === id) return;

      patchState(store, { isLoading: true, error: null });
      await new Promise((resolve) => setTimeout(resolve, 3000));

      try {
        const book = await lastValueFrom(bookService.getBookById(id));
        patchState(store, { selectedBook: book, isLoading: false });
      } catch (err) {
        patchState(store, {
          selectedBook: null,
          isLoading: false,
          error: 'Failed to load book details',
        });
        return;
      }
    },

    async createBook(newBook: Partial<Book>) {
      patchState(store, { isLoading: true });

      try {
        const createdBook = await lastValueFrom(bookService.saveBook(newBook));
        // Update the local state (Add the new book to the existing list)
        patchState(store, (state) => ({
          books: [...state.books, createdBook],
          isLoading: false,
        }));

        // Navigate back to the list
        router.navigate(['/books']);
      } catch (err) {
        patchState(store, { isLoading: false, error: 'Failed to create book' });
      }
    },
  })),
);
