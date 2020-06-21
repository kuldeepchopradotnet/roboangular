import { Pipe, PipeTransform } from '@angular/core';
import { Helper } from '../../shared/helper';

@Pipe({
  name: 'htmlTagRemover'
})
export class HtmlTagRemoverPipe implements PipeTransform {

  transform(value: string, action=''): string {
    if(action==='extractImage'){
      return 
    }
    return Helper.htmlTagRemover(value);
  }

}
