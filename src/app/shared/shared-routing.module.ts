import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageViewerComponent} from "./components/image-viewer/image-viewer.component";



const routes: Routes = [
  {path: 'photo', component: ImageViewerComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
