import { Component, Input } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];

  get displayedColumns() {
    return this.columns.map((c) => c.key);
  }
}
