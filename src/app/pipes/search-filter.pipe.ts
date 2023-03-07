import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, searchFields: string[]): any {
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm === '') return items;

    return items.filter((fields) => {
      if (searchFields.length > 0) {
        for (let key of searchFields) {
          if (fields[key].toLowerCase().includes(searchTerm)) {
            return true;
          }
        }
      } else {
        for (let key in fields) {
          if (fields[key].toLowerCase().includes(searchTerm)) {
            return true;
          }
        }
      }

      return false;
    });
  }
}
