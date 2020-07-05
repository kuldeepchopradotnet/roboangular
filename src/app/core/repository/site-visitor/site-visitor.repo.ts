import { Injectable } from "@angular/core";
import { BaseRepository } from '../base-repo';
import { AngularFirestore } from '@angular/fire/firestore';

export interface IPageVisitor {
    count:number;
}



@Injectable()
export class PageVisitorRepository extends BaseRepository<IPageVisitor> {

    constructor(firestore: AngularFirestore) {
        super(firestore,'page_visitor');
    }

}