import { v5 as uuidv5 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

export function uuidV5(url:string) {
    return uuidv5(url, uuidv5.URL);
}


export function uuidV4(){
    return uuidv4();
}