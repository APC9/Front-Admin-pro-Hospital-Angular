import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailLength'
})
export class EmailLengthPipe implements PipeTransform {

  transform(email: string ): string {
    if ( email.length > 13 )
      return `${email.slice(0, 12) }...`

    return email;
  }

}
