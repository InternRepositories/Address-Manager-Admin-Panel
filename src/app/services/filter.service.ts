import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  search(searchTerm: string, searchFields: string[], items: any[]) {
    searchFields.forEach((field: string) => {
      items.filter((item: any) => item[field].includes(searchTerm));
    });
  }
}
