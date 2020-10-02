import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {SpyProfileComponent} from './spy-profile/spy-profile.component';



const routes: Routes = [
  {path: 'profile', component: ViewProfileComponent},
  {path: 'profile/:id', component: SpyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
