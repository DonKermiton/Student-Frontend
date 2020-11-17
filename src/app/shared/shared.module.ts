import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LayoutLoggedComponent} from './components/layout-logged/layout-logged.component';
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmActionComponent } from './components/confirm-action/confirm-action.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import { DragAndUploadDirective } from './directives/drag-and-upload.directive';
import { UploadPostComponent } from './components/upload-post/upload-post.component';
import { ShowPostOptionsDirective } from './directives/show-post-options.directive';
import { ShowMoreOptionsDirective } from './directives/show-more-options.directive';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { CommentsViewComponent } from './components/image-viewer/comments-view/comments-view.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';




@NgModule({
  declarations: [
    NavbarComponent,
    LayoutLoggedComponent,
    SidemenuComponent,
    SpinnerComponent,
    ConfirmActionComponent,
    UploadPhotoComponent,
    DragAndUploadDirective,
    UploadPostComponent,
    ShowPostOptionsDirective,
    ShowMoreOptionsDirective,
    ImageViewerComponent,
    CommentsViewComponent,
    CreateCommentComponent,


  ],
    exports: [
        LayoutLoggedComponent,
        SpinnerComponent,
        ConfirmActionComponent,
        UploadPhotoComponent,
        UploadPostComponent,
        ShowPostOptionsDirective,
        CreateCommentComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        AngularFileUploaderModule,

    ]
})
export class SharedModule {
}
