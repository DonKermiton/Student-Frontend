import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewImageComponent} from './components/view-image/view-image.component';



const routes: Routes = [
  {path: 'photo', component: ViewImageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
