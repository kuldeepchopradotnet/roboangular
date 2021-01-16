import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { SearchDialogComponent } from 'src/app/core/shared/dialogbox/search/search.component';
import { PostRoot } from 'src/app/domain/model/post.model';

@Component({
  selector: 'app-serach',
  templateUrl: './serach.component.html',
  styleUrls: ['./serach.component.css']
})
export class SerachComponent implements OnInit {
  searchTxt: string;
  searchmsg: string;
  isSearchErr: boolean = false;
  constructor(private blogService: BlogService,
    public dialog: MatDialog,) { }

  ngOnInit() {
  }
  openSearch() {
    this.isSearchErr = false;
    let element = document.querySelector("#serach-form");
    element.classList.remove("error-border");
    if (!this.searchTxt) {
      this.isSearchErr = true;
      this.searchmsg = 'enter one or more word to search.';
      element.classList.add("error-border");
      return;
    }
    this.blogService.searchPost(this.searchTxt).subscribe((res: PostRoot) => {
      if (res && res.items && res.items.length > 0) {
        this.dialog.open(SearchDialogComponent, {
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
    this.searchTxt = "";
  }
}
