import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private booksEndpoint = `${this.apiUrl}/books`;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksEndpoint);
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.booksEndpoint}/${id}`);
  }

  saveBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(this.booksEndpoint, book);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.booksEndpoint}/${book.id}`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.booksEndpoint}/${id}`);
  }
}
