import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  public transform(person: { firstName: string, lastName: string } | null): string {
    return person ? `${person.firstName} ${person.lastName}` : '';
  }
}
