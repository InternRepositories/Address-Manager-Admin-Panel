import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(
    items: any[],
    searchTerm: string,
    searchFields: string[],
    ...args: any
  ): any {
    if (searchTerm === '') return items;

    return items.filter((fields) => {
      if (searchFields.length > 0) {
        for (let key of searchFields) {
          if (('' + fields[key]).includes(searchTerm)) {
            return true;
          }
        }
      } else {
        for (let key in fields) {
          if (('' + fields[key]).includes(searchTerm)) {
            return true;
          }
        }
      }

      return false;
    });
  }
}
