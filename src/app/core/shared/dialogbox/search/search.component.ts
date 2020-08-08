import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { Post, PostRoot } from 'src/app/domain/model/post.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  posts:Post[];
  constructor(@Inject(MAT_DIALOG_DATA) private data:any,
  private blogService: BlogService,) { }

  ngOnInit() {
    if(this.data && this.data.posts){
      this.posts = this.data.posts
    }
  }
}
