import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../../shared/helper';

@Pipe({
  name: 'htmlTagRemover'
})
export class HtmlTagRemoverPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    return Helper.htmlTagRemover(value);
  }

}
