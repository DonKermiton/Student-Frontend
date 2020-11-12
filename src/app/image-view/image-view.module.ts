import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageViewRoutingModule } from './image-view-routing.module';
import { ImageViewComponent } from './image-view.component';
import { ImageCommentsComponent } from './image-comments/image-comments.component';


@NgModule({
  declarations: [ImageViewComponent, ImageCommentsComponent],
  imports: [
    CommonModule,
    ImageViewRoutingModule
  ]
})
export class ImageViewModule { }
