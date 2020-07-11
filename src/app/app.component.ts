import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { PubSubService } from './core/services/data-service/pub-sub.service';
import { Helper } from './core/shared/helper';
import { Constant } from './core/shared/constants';
import { ITheme } from './domain/model/theme.interface';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './core/shared/dialogbox/about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'robohawk';
  isLoader: boolean = false;
  gitUrl: string = 'https://kuldeepchopradotnet.github.io/roboangular';
  logo: string = this.gitUrl + "/assets/robo.svg";

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
    public dialog: MatDialog) {


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

}
