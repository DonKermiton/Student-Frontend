import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageViewComponent } from './image-view.component';

const routes: Routes = [{ path: '', component: ImageViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageViewRoutingModule { }
