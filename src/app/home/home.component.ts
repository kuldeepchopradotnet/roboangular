import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id 
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

     this.id = this.route.snapshot.paramMap.get('id');
 

    // this.route.queryParams.subscribe(params => {
    //   console.log(params['id']);
    // });

  }

}
