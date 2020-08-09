import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { PubSubService } from './core/services/data-service/pub-sub.service';
import { Helper } from './core/shared/helper';
import { Constant } from './core/shared/constants';
import { ITheme } from './domain/model/theme.interface';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './core/shared/dialogbox/about/about.component';
import { BlogService } from './core/services/blog/blog.service';
import { PostRoot } from './domain/model/post.model';
import { SearchComponent } from './core/shared/dialogbox/search/search.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked,OnInit {
  title = 'robohawk';
  isLoader: boolean = false;
  gitUrl: string = 'https://kuldeepchopradotnet.github.io/roboangular';
  logo: string = environment.gitUrl + "/assets/robo.svg";
  searchTxt: string;
  searchmsg: string;
  isSearchErr: boolean = false;
  
  themeColorArr: ITheme[] = [
    {
      bgColor: '#ffffff',
      fontColor: 'black',
      bgImg: '#ffffff'
    },
    {
      bgColor: '#7ee8fa',
      fontColor: '#ffffff',
      bgImg: 'linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%)'
    },
    {
      bgColor: '#b3cdd1',
      fontColor: '#ffffff',
      bgImg: 'linear-gradient(315deg, #b3cdd1 0%, #9fa4c4 74%)'
    }
  ];

  constructor(private loaderService: PubSubService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private blogService: BlogService) {
      if(environment.production){
        console.log = function(...val){}
      }
  }
  ngOnInit(): void {
    this.getsetviewMode();
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
    this.searchTxt = "";
  }


  setMythemPrefrence(theme: ITheme) {
    try {
      let mythemeStr = JSON.stringify(theme);
      Helper.setLocalStorage(Constant.myTheme, mythemeStr);
    }
    catch {
      console.warn("setLocalStorage issue");
    }
  }

  openAboutDialog() {
    this.dialog.open(AboutComponent, {

    });
  }


  getMythemPrefrence(mytheme: string) {
    try {
      let theme = Helper.getLocalStorage(mytheme);
      if (theme) {
        return JSON.parse(theme);
      }
      return null;
    }
    catch {
      Helper.removeLocalStorage(mytheme);
      console.warn("getLocalStorage issue");
    }
  }

  saveTheme(theme: ITheme) {
    this.setMythemPrefrence(theme);
    this.renderTheme(theme);
  }

  applyTheme() {
    let theme = this.getMythemPrefrence(Constant.myTheme);
    if (theme) {
      this.renderTheme(theme);
    }
  }

  ngAfterViewChecked(): void {
    
    this.loaderService.getloader.subscribe(isLoader => {
      this.isLoader = isLoader;
      this.cdRef.detectChanges();
    })
  }

  renderTheme(theme: ITheme) {
    let bgRobo = document.querySelectorAll(".bg-robo");
    bgRobo.forEach((el: HTMLElement) => {
      el.style.background = theme.bgColor;
      el.style.color = theme.fontColor;
      el.style.backgroundImage = theme.bgImg;
    })
  }

  VIEW_MODE = "VIEW_MODE"

  viewMode = {
    list: "List View",
    grid: "Grid View"
  }
  defaultView = this.viewMode.list

  getsetviewMode() {
    debugger;
    let val:string;
    window.localStorage && (val = window.localStorage.getItem(this.VIEW_MODE));
    if(val){
      if(val === this.viewMode.grid){
        this.defaultView = this.viewMode.list
      }
      else{
        this.defaultView = this.viewMode.grid
      }
    }
  }


  changeMode(mode) {
    if(mode === this.viewMode.grid){
      this.defaultView = this.viewMode.list
    }
    else{
      this.defaultView = this.viewMode.grid
    }
    window.localStorage && window.localStorage.setItem(this.VIEW_MODE,mode);
    location.reload();
  }


}
