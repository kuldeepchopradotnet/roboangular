import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostRoot, Post } from 'src/app/domain/model/post.model';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { Helper } from 'src/app/core/shared/helper';
import { Constant } from 'src/app/core/shared/constants';
import { PageVisitorRepository } from 'src/app/core/repository/site-visitor/site-visitor.repo';
import { uuidV5 } from 'src/app/core/utils';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  id: any;
  domain: string = 'iRoboHawk'
  subTitle: string = 'iRoboHawk.blogspot.com'
  posts: Post[] = [];
  sidePosts: Post[] = [];
  post: Post;
  host: string = Constant.apiRoboUrl;
  pageCount: number = 0;
  nextPageToken: string;

  constructor(private route: ActivatedRoute,
    private blogService: BlogService,
    private pageVisitorRepo: PageVisitorRepository,
    public dialog: MatDialog
  ) { }

  static getInst() {
    return this;
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', (e) => this.scroll(e), true);
  }

  get docRef() {
    let url = (this.id || Constant.apiRoboUrl);
    return uuidV5(url)
  }

  ngOnInit() {
    // this.posts = this.mockPostList();
    this.id = !Helper.isStringNullOrEmpty(this.route.snapshot.paramMap.get('yy')) ?
      `/${this.route.snapshot.paramMap.get('yy')}/${this.route.snapshot.paramMap.get('mm')}/${this.route.snapshot.paramMap.get('path')}.html`
      : null;
    if (this.id) {
      this.getPostByPath(this.id);
      this.getSidePost();
    }
    else {
      this.postList(12, this.cbPost);
    }
    this.getAndUpdatePageVisitor();
    let that = this;
    window.addEventListener('scroll', (e) => this.scroll(e, that), true);
  }


  getAndUpdatePageVisitor() {
    this.pageVisitorRepo.get(this.docRef).subscribe((x: any) => {
      let res = x.data();
      if (res) {
        this.pageCount = (res.count || 0);
      }
      this.pageCount = this.pageCount + 1;
      this.pageVisitorRepo.set({ count: this.pageCount }, this.docRef);
    }, (error: any) => {
      console.log("getAndUpdatePageVisitor_set", error);
    });
  }

  getPostByPath(path) {
    this.blogService.getPostByPath(path).subscribe((res: Post) => {
      if (res) {
        this.post = res;
        let htmlDoc = document.querySelector("#html-content");
        htmlDoc.innerHTML =  this.cleanHtml(this.post.content) 
       
        //console.log(res);
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  cbPost(res: PostRoot,that:HomeComponent) {
      if (that.posts && that.posts.length > 0) {
        that.posts = that.posts.concat(res.items);
      }
      else {
        that.posts = res.items;
      }
      that.nextPageToken = res.nextPageToken;
  }


  postList(limit: number = 12, cb: (res: PostRoot,that:any) => void) {
    this.blogService.getPost(this.nextPageToken, limit).subscribe((res: PostRoot) => {
      if (res && res.items && res.items.length > 0) {
        cb(res,this);
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

  scroll(event: Event, that?: HomeComponent) {
    let element: Document = (event.target as Document)
    var scrollElm = element.scrollingElement;
    if(!scrollElm){return;}
    let sHeight = (scrollElm.scrollTop - 5 + scrollElm.clientHeight + 5).toFixed();
    if (parseInt(sHeight) === scrollElm.scrollHeight) {
      (that.nextPageToken && that.postList(12, this.cbPost));
    }
  }

  loadMore() {
    (this.nextPageToken && this.postList(12, this.cbPost));
  }

  getSidePost() {
    let numberOfPost = 7;
    this.postList(numberOfPost, (res:PostRoot,that) => {
      that.sidePosts = res.items;
    });
  }

  cleanHtml(html:string) {
     //html = html.replace(/(style="|dir=|id=")([a-zA-z -:;]+")\s?/gi,"")
     //html = html.replace(/(<\/?)(span|font?[ a-z"=\w]+)>/gim,'')
     html = html.replace(/(line|margin|padding|font|vertical|white|background)[-a-z: 0-9.]+;/gim,'')
     return html;
  }


}
