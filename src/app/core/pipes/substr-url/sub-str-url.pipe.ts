import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../../shared/helper';

@Pipe({
  name: 'subStrUrl'
})
export class SubStrUrlPipe implements PipeTransform {

  transform(url:string, ...args: any[]): string {
    debugger;
    let ur = Helper.subStrUrl(url);
    return ur;
  }

}
