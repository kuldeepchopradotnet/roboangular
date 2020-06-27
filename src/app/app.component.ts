import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { PubSubService } from './core/services/data-service/pub-sub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked{
  title = 'robohawk';
  isLoader: boolean = false;
  constructor( private loaderService: PubSubService,private cdRef : ChangeDetectorRef) {

   
  }
  ngAfterViewChecked(): void {
    this.loaderService.getloader.subscribe(isLoader=> {
      this.isLoader = isLoader;
      this.cdRef.detectChanges();
    })
  }

}
