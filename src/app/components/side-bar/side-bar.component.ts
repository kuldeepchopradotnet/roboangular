import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { Helper } from 'src/app/core/shared/helper';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private blogService: BlogService,
    private router: Router) { }

  pages: any[] = []

  ngOnInit() {
    this.getsetviewMode();
    this.getPages();
  }

  getPages() {
    this.blogService.getPages().subscribe((d: any) => {
      console.log(d)
      d && (this.pages = d.items)
    }, (err: any) => {
      console.error(err)
    })
  }

  openPage(page: any) {
    if (page) {
      let { url, id } = page;
      url = Helper.subStrUrl(url);
      url = (url as string).replace('.html', '')
      window.localStorage.setItem('pageid', id)
      this.router.navigate([url])
    }

  }


  VIEW_MODE = "VIEW_MODE"

  viewMode = {
    list: "List View",
    grid: "Grid View"
  }
  defaultView = this.viewMode.list
  changeMode(mode) {
    if (mode === this.viewMode.grid) {
      this.defaultView = this.viewMode.list
    }
    else {
      this.defaultView = this.viewMode.grid
    }
    window.localStorage && window.localStorage.setItem(this.VIEW_MODE, mode);
    location.reload();
  }

  getsetviewMode() {

    let val: string;
    window.localStorage && (val = window.localStorage.getItem(this.VIEW_MODE));
    if (val) {
      if (val === this.viewMode.grid) {
        this.defaultView = this.viewMode.list
      }
      else {
        this.defaultView = this.viewMode.grid
      }
    }
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    if(window.innerWidth)
        document.getElementById("nav-search").style.display = 'block'
  }
}
