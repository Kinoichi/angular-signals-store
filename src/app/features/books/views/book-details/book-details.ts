import { Component, inject } from '@angular/core';
import { BookStore } from '../../book.store';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../../../../shared/components/loader.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton.component';

@Component({
  selector: 'app-book-details',
  imports: [LoaderComponent, SkeletonComponent],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails {
  bookStore = inject(BookStore);
  protected activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.bookStore.loadBookById(this.getBookIdFromRoute());
  }

  private getBookIdFromRoute(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      throw new Error('Book ID not found in route parameters');
    }
    return id;
  }
}
