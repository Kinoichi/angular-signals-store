// table-config.model.ts
export interface TableColumn<T> {
  key: keyof T | string; // The property name / Il nome della proprietà
  label: string; // The header text / Il testo dell'intestazione
}
