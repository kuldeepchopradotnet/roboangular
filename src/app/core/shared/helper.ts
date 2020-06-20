export class Helper {

    static htmlTagRemover(htmlStr: string): string{
        if(!this.isStringNullOrEmpty(htmlStr)){
            return htmlStr.replace( /(<([^>]+)>)/ig, '');
        }
      return '';
    }

    static isStringNullOrEmpty(str:string): boolean{
        if(typeof str === 'string' && str !== null && str !== undefined && str !== ''){
            return false;
        }
      return true;
    }


    static subStrUrl(url: string) : string {
debugger;
        if(!this.isStringNullOrEmpty(url)){
            let idxOfSlash = url.lastIndexOf('/');
            url = url.substr(idxOfSlash);
            let idxOfHtml = url.lastIndexOf('.');
            url = url.substr(0, idxOfHtml);
          
            return url;
        }
       return '';
    }
}