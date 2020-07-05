import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HtmlTagRemoverPipe } from './core/pipes/html-tag-remover/html-tag-remover.pipe';
import { SubStrUrlPipe } from './core/pipes/substr-url/sub-str-url.pipe';
import { DateCustomPipe } from './core/pipes/date-custom/date-custom.pipe';
import { DisqusModule } from "ngx-disqus";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PubSubService } from './core/services/data-service/pub-sub.service';
import { ReqResInterceptor } from './core/interceptor/req-res.interceptor';
import {MatDialogModule} from '@angular/material/dialog';
import { AboutComponent } from './core/shared/dialogbox/about/about.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { PageVisitorRepository } from './core/repository/site-visitor/site-visitor.repo';
import { AngularFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HtmlTagRemoverPipe,
    SubStrUrlPipe,
    DateCustomPipe,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DisqusModule.forRoot('irobohawk'),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    PubSubService,
    { provide: HTTP_INTERCEPTORS, useClass: ReqResInterceptor, multi: true },
    AngularFirestore,
    PageVisitorRepository
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AboutComponent
  ],
})
export class AppModule { }
