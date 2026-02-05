// features/books/books.routes.ts
import { Routes } from '@angular/router';
import { BookStore } from './book.store';
import { BookList } from './views/book-list/book-list';
import { BookDetails } from './views/book-details/book-details';
import { BookCreate } from './views/book-create/book-create';

export const BOOK_ROUTES: Routes = [
  {
    path: '',
    // This provides the store to the entire "Books" feature
    // Questo fornisce lo store all'intera feature "Books"
    providers: [BookStore],
    children: [
      {
        path: '',
        component: BookList,
      },
      {
        path: 'new',
        component: BookCreate,
      },
      {
        path: ':id',
        component: BookDetails,
      },
    ],
  },
];
