import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostRoot, Post } from 'src/app/domain/model/post.model';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { Helper } from 'src/app/core/shared/helper';
import { PubSubService } from 'src/app/core/services/data-service/pub-sub.service';
import { Constant } from 'src/app/core/shared/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: any;
  domain: string = 'iRoboHawk'
  subTitle: string = 'iRoboHawk.blogspot.com'
  posts: Post[] = [];
  post: Post;
  host: string = Constant.apiRoboUrl;

  constructor(private route: ActivatedRoute,
    private blogService: BlogService,

  ) { }



  ngOnInit() {
    // this.posts = this.mockPostList();
    this.id = !Helper.isStringNullOrEmpty(this.route.snapshot.paramMap.get('yy')) ?
      `/${this.route.snapshot.paramMap.get('yy')}/${this.route.snapshot.paramMap.get('mm')}/${this.route.snapshot.paramMap.get('path')}.html`
      : null;
    if (this.id) {
      this.getPostByPath(this.id);
    }
    else {
      this.postList();
    }
  }


  getPostByPath(path) {
    this.blogService.getPostByPath(path).subscribe((res: Post) => {
      if (res) {
        this.post = res;
      }
    }, (error: any) => {
      console.log(error);
    });
  }


  postList() {
    this.blogService.getPost().subscribe((res: PostRoot) => {
      if (res && res.items && res.items.length > 0) {
        this.posts = res.items;
      }
    }, (error: any) => {
      console.log(error);
    });
  }


  mockPostList() {
    let posts = [];
    for (let i = 0; i < 20; i++) {
      let post = {
        title: 'this is title ' + i,
        blog: 'this is blog ' + i,
        url: 'this-is-url-' + i,
        thumbnail: 'thumbnail' + i,
        view: i,
        id: i
      }
      posts.push(post);
    }
    return posts;
  }

}
