import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string, ...args: any): any {
    if (searchTerm === '') return items;

    return items.filter((item) => {
      for (let key in item) {
        if (('' + item[key]).includes(searchTerm)) {
          return true;
        }
      }
      return false;
    });
  }
}
