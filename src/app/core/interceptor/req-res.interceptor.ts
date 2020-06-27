import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { PubSubService } from '../services/data-service/pub-sub.service';

@Injectable()
export class ReqResInterceptor implements HttpInterceptor {
    constructor(private loaderService: PubSubService){

    }
    enableLoader(val:boolean){
        if(!val){
            setTimeout(() => {
                this.loaderService.enableLoader(val);
            }, 1000);
        }
        else{
            this.loaderService.enableLoader(val);
        }
        

     }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       this.enableLoader(true);
        return next.handle(req).pipe(
            tap(
              event => { 
                  //event instanceof HttpResponse
                 this.enableLoader(false);
                },
              error => {
                this.enableLoader(false);
              }
            ),
            finalize(() => {
            })
          );;
    }

}