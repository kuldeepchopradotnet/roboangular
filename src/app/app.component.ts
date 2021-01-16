import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { PubSubService } from './core/services/data-service/pub-sub.service';
import { Helper } from './core/shared/helper';
import { Constant } from './core/shared/constants';
import { ITheme } from './domain/model/theme.interface';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked, OnInit {
  title = 'robohawk';
  isLoader: boolean = false;
  gitUrl: string = 'https://kuldeepchopradotnet.github.io/roboangular';
  logo: string = environment.gitUrl + "/assets/robo.svg";

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

  ) {
    if (environment.production) {
      console.log = function (...val) { }
    }
  }
  ngOnInit(): void {

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

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("nav-search").style.display = 'none'
  }

}
