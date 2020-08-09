import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostRoot, Post } from 'src/app/domain/model/post.model';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { Helper } from 'src/app/core/shared/helper';
import { Constant } from 'src/app/core/shared/constants';
import { PageVisitorRepository } from 'src/app/core/repository/site-visitor/site-visitor.repo';
import { uuidV5 } from 'src/app/core/utils';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';


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
  defaultImg: string = environment.gitUrl + '/assets/irobohawk-default.png'
  VIEW_MODE = "VIEW_MODE"
  viewModeVal = "grid";
  viewMode = {
    list: "List View",
    grid: "Grid View"
  }
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
    this.id = !Helper.isStringNullOrEmpty(this.route.snapshot.paramMap.get('yy')) ?
      `/${this.route.snapshot.paramMap.get('yy')}/${this.route.snapshot.paramMap.get('mm')}/${this.route.snapshot.paramMap.get('path')}.html`
      : null;
    if (this.id) {
      this.getPostByPath(this.id);
      this.getSidePost();
    }
    else {
      debugger;
      let viewmode = this.getviewMode();
      if(viewmode && viewmode === this.viewMode.list){
        this.viewModeVal = this.viewMode.list;
        this.postList(50, this.cbPost);
      }
      else {
        this.viewModeVal = this.viewMode.grid;
        this.postList(12, this.cbPost);
      }
    }
    this.getAndUpdatePageVisitor();
    let that = this;
    window.addEventListener('scroll', (e) => this.scroll(e, that), true);
  }

  getviewMode() {
    let val = this.viewMode.grid;
    window.localStorage && (val = window.localStorage.getItem(this.VIEW_MODE));
    if(val){
      this.viewModeVal = val;
    }
    return val
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

  getPostByPath(path:string) {
    path = path.replace(".html",'');
    this.blogService.getPostByPath(path).subscribe((res: Post) => {
      if (res) {
        this.post = res;
        let htmlDoc = document.querySelector("#html-content");
        htmlDoc.innerHTML = this.cleanHtml(this.post.content);
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  cbPost(res: PostRoot, that: HomeComponent) {
    if (that.posts && that.posts.length > 0) {
      that.posts = that.posts.concat(res.items);
    }
    else {
      that.posts = res.items;
    }
    that.nextPageToken = res.nextPageToken;
  }

  postList(limit: number = 12, cb: (res: PostRoot, that: any) => void) {
    this.blogService.getPost(this.nextPageToken, limit).subscribe((res: PostRoot) => {
      if (res && res.items && res.items.length > 0) {
        console.log(res);
        cb(res, this);
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
    if (!scrollElm) { return; }
    let sHeight = (scrollElm.scrollTop - 5 + scrollElm.clientHeight + 5).toFixed();
    console.log("parseInt(sHeight) === scrollElm.scrollHeight", parseInt(sHeight), scrollElm.scrollHeight);
    if (parseInt(sHeight) >= scrollElm.scrollHeight) {
      (that.nextPageToken && that.postList(12, this.cbPost));
    }
  }

  loadMore() {
    (this.nextPageToken && this.postList(12, this.cbPost));
  }

  getSidePost() {
    let numberOfPost = 7;
    this.postList(numberOfPost, (res: PostRoot, that) => {
      that.sidePosts = res.items;
    });
  }

  cleanHtml(html: string) {
    //html = html.replace(/(style="|dir=|id=")([a-zA-z -:;]+")\s?/gi,"")
    //html = html.replace(/(<\/?)(span|font?[ a-z"=\w]+)>/gim,'')
    html = html.replace(/(line|margin|padding|font|vertical|white|background)[-a-z: 0-9.]+;/gim, '')
    return html;
  }

}

