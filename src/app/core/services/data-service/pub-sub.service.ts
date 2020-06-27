import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PubSubService {
    private loader = new Subject<boolean>();

    enableLoader(val:boolean){
        this.loader.next(val);
    }

    get getloader() {
        return this.loader;
    }

}