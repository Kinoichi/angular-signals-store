import { Component, inject } from '@angular/core';
import { BookStore } from '../../book.store';
import { LoaderComponent } from '../../../../shared/components/loader.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-list',
  imports: [LoaderComponent, SkeletonComponent, RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  bookStore = inject(BookStore);

  ngOnInit() {
    this.bookStore.loadBooks();
  }
}
