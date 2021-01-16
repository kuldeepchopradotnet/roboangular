import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageComponent } from './components/page/page.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: ':yy/:mm/:path', component: HomeComponent, pathMatch: 'full' },
  { path: 'p/:path', component: PageComponent, pathMatch: 'full' },
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: '**', component: 'pageNotFoundComponent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
