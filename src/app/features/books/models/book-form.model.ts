import { FormControl } from '@angular/forms';
import { Book } from './book.model';

/* export type BookFormModel = {
  [K in keyof Book]: FormControl<Book[K] | null>;
}; */

export type BookFormModel = {
  title: FormControl<string>;
  author: FormControl<string>;
  id?: FormControl<string>; // Even if hidden or optional
};
