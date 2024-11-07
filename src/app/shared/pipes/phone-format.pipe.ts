import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
  formatPhoneNumber(s:string) {
    if (s.length!==9) return s
    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{2})(\d{2})(\d{2})$/);
    return (!m) ? null : "(+995) " + m[1] + "-" + m[2] + "-" + m[3]+"-" + m[4];
  }
  transform(value: string,): string {
    const formattedPhone = this.formatPhoneNumber(value);
    if (!value || !formattedPhone) return ""
    return formattedPhone;
  }

}
