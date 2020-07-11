import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostRoot, Post } from 'src/app/domain/model/post.model';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { Helper } from 'src/app/core/shared/helper';
import { PubSubService } from 'src/app/core/services/data-service/pub-sub.service';
import { Constant } from 'src/app/core/shared/constants';
import { PageVisitorRepository } from 'src/app/core/repository/site-visitor/site-visitor.repo';
import { uuidV5 } from 'src/app/core/utils';
import { MatDialog } from '@angular/material/dialog';
import { SearchComponent } from 'src/app/core/shared/dialogbox/search/search.component';
import { AboutComponent } from 'src/app/core/shared/dialogbox/about/about.component';

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
  post: Post;
  host: string = Constant.apiRoboUrl;
  pageCount: number = 0;
  nextPageToken: string;
  searchTxt: string;
  searchmsg: string;
  isSearchErr: boolean = false;
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
    }
    else {
      this.postList();
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
        console.log(res);
      }
    }, (error: any) => {
      console.log(error);
    });
  }


  postList() {
    this.blogService.getPost(this.nextPageToken).subscribe((res: PostRoot) => {
      if (res && res.items && res.items.length > 0) {
        if (this.posts && this.posts.length > 0) {
          this.posts = this.posts.concat(res.items);
        }
        else {
          this.posts = res.items;
        }
        this.nextPageToken = res.nextPageToken;
        console.log(this.nextPageToken);
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
    let sHeight = (scrollElm.scrollTop - 5 + scrollElm.clientHeight + 5).toFixed();
    // console.log(sHeight, scrollElm.scrollHeight);
    if (parseInt(sHeight) === scrollElm.scrollHeight) {
      (that.nextPageToken && that.postList());
    }
  }

  loadMore() {
    (this.nextPageToken && this.postList());
  }


  openSearch() {
    this.isSearchErr = false;
    if (!this.searchTxt) {
      this.isSearchErr = true;
      this.searchmsg = 'enter one or more word to search.';
      return;
    }
    this.searchTxt = "";
    this.blogService.searchPost(this.searchTxt).subscribe((res: PostRoot) => {
      if (res && res.items && res.items.length > 0) {
        console.log("res.items.length",res.items.length);
        this.dialog.open(SearchComponent, {
          autoFocus: false,
          maxHeight: '90vh',
          data: {
            posts: res.items,
          }
        });
      }
      this.searchmsg = 'No record found.'
    }, (error: any) => {
      this.searchmsg = 'No record found.'
      console.log(error);
    });

  }

}
