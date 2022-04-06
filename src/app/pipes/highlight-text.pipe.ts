import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlightText'
})
export class HighlightTextPipe implements PipeTransform {
  // TODO Debug
  transform(text: string, keyword: string): string {
    let regExp = new RegExp(keyword, 'g');
    // "<mark>" + keyword + "</mark>"
    return text.replace(regExp, `<mark>${keyword}</mark>`);
  }

}
