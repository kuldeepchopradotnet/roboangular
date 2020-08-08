
import { AngularFirestore } from '@angular/fire/firestore';
import { uuidV5 } from '../utils';

export abstract class BaseRepository<T>  {



    constructor(private readonly firestore: AngularFirestore, private readonly path: string) {   
    }


    getAll() {
        return this.firestore.collection<T>(this.path).valueChanges();
    }

    get(docRefId:string) {
        const docRef = this.firestore.collection<T>(this.path).doc(docRefId);
        return docRef.get();
    }

    async set(item:T, docRefId:string) {
        const docRef = this.firestore.collection<T>(this.path).doc(docRefId);
        return await docRef.set(item);
    }

    update() {

    }
}