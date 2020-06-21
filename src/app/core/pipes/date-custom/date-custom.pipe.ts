import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../../shared/helper';

@Pipe({
  name: 'dateCustom'
})
export class DateCustomPipe implements PipeTransform {

  transform(date: string | Date, action: string = ''): string | number | Date {

    let val: string | number | Date = date;
    if (date) {
      let dateO = Helper.dateTimeObj(date);
      switch (action) {
        case 'dd,mmyyhh:mm':
          val = `${dateO.monthDay}, ${dateO.monthName} ${dateO.year} ${dateO.time12h}`
        break;
        case 'monthDay':
          val = dateO.monthDay;
          break;
        case 'monthName':
          val = dateO.monthName;
          break;
        case 'time12':
          val = dateO.time12h;
          break;
      };
    }
    return val;
  }
}
