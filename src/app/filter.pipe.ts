import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from './Cliente';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Cliente[], filterString: string): Cliente[] {
    if(value === null){
      return value;
    }
    if (value.length === 0 || !filterString || filterString.length < 3) {
      return value;
    }
    let filteredUsers: Cliente[] = [];
    for (let user of value) {
      if (user.nombre.toLowerCase().includes(filterString.toLowerCase())
          || user.apellido.toLowerCase().includes(filterString.toLowerCase())
          || user.dni.toLowerCase().includes(filterString.toLowerCase())) {
        filteredUsers.push(user);
      }
    }
    return filteredUsers;
  }

}
