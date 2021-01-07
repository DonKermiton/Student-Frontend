import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageViewRoutingModule } from './image-view-routing.module';
import { ImageViewComponent } from './image-view.component';
import { ImageCommentsComponent } from './image-comments/image-comments.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [ImageViewComponent, ImageCommentsComponent],
    exports: [
        ImageViewComponent
    ],
    imports: [
        CommonModule,
        ImageViewRoutingModule,
        SharedModule
    ]
})
export class ImageViewModule { }
