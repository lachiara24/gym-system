import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from './Cliente';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Cliente[], filterString: string, property: string): Cliente[] {
    if (value.length === 0 || !filterString) {
      return value;
    }
    let filteredUsers: Cliente[] = [];
    for (let user of value) {
      if (user[property].toLowerCase().includes(filterString.toLowerCase())) {
        filteredUsers.push(user);
      }
    }
    return filteredUsers;
  }

}
