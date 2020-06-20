import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HtmlTagRemoverPipe } from './core/pipes/html-tag-remover/html-tag-remover.pipe';
import { SubStrUrlPipe } from './core/pipes/substr-url/sub-str-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HtmlTagRemoverPipe,
    SubStrUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
