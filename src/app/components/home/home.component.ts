import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostRoot, Post } from 'src/app/domain/model/post.model';
import { BlogService } from 'src/app/core/services/blog/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id ;
  domain: string = 'iRoboHawk'
  subTitle: string = 'iRoboHawk.blogspot.com'
  posts: Post[] =[];
  post: Post ;
  constructor(private route: ActivatedRoute,
    private blogService: BlogService
    ) { }

  ngOnInit() {
  debugger;
     this.id = this.route.snapshot.paramMap.get('id');
    // this.posts = this.mockPostList();
 

    if(this.id){
      this.getPostByPath(this.id);
    }
    else{
      this.postList();
    }

    // this.route.queryParams.subscribe(params => {
    //   console.log(params['id']);
    // });

  }


  getPostByPath(path){
    this.blogService.getPostByPath(path).subscribe((res: PostRoot) => {
      if(res && res.items && res.items.length > 0){
        console.log(res);
        this.post =  res.items[0];
      }
    },(error: any)=>{
      console.log(error);

    });
  }


  postList(){

    this.blogService.getPost().subscribe((res: PostRoot) => {

      console.log(res);

      this.posts = res.items;


    },(error: any)=>{
      console.log(error);

    });

  }



  mockPostList(){
    let posts = [];

    for(let i = 0 ; i < 20; i++){

      let post = {
        title: 'this is title ' + i,
        blog: 'this is blog ' + i,
        url: 'this-is-url-' + i,
        thumbnail: 'thumbnail'+i,
        view: i,
        id: i
      }

      posts.push(post);

    }

    return posts;


  }

}
