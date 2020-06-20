import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [{
  path: '', component: HomeComponent,pathMatch: 'full'
},
{path: ':id', component: HomeComponent,pathMatch: 'full'},
//{ path: '', redirectTo: 'home', pathMatch: 'full' },
//{ path: '**', component: 'pageNotFoundComponent' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
