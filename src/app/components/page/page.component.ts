import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { Helper } from 'src/app/core/shared/helper';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(
    private blogService: BlogService,
  ) { }
  post: any
  ngOnInit() {
    
    let id = window.localStorage.getItem('pageid');
    this.getPageById(id);
  }

  getPageById(id: string) {
    this.blogService.getPageById(id).subscribe((d: any) => {
      if (d) {
        this.post = d
        let htmlDoc = document.querySelector("#page-content");
        htmlDoc.innerHTML = Helper.cleanHtml(this.post.content);
      }
    }, (err: any) => {
    })
  }
}
