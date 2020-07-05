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
  logo: string = "https://kuldeepchopradotnet.github.io/roboangular/assets/robo.svg";

  themeColorArr: ITheme[] = [{
    bgColor: '#33b5e5',
    fontColor: '#ffffff'
  }, {
    bgColor: '#1c9e89',
    fontColor: '#ffffff'
  }, {
    bgColor: '#FF9800',
    fontColor: '#ffffff'
  },
  {
    bgColor: '#795548',
    fontColor: '#ffffff'
  },
  {
    bgColor: 'rgb(195, 195, 195)',
    fontColor: 'rgb(0, 0, 0)'
  }];

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
      console.warn("getLocalStorage issue");
    }
  }

  saveTheme(theme: ITheme) {
    this.setMythemPrefrence(theme);
    this.renderTheme(theme);
  }

  ngAfterViewChecked(): void {
    let theme = this.getMythemPrefrence(Constant.myTheme);
    if (theme) {
      this.renderTheme(theme);
    }
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
    })
  }

}
