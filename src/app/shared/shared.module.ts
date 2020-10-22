import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LayoutLoggedComponent} from './components/layout-logged/layout-logged.component';
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';
import { ViewImageComponent } from './components/view-image/view-image.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ConfirmActionComponent } from './components/confirm-action/confirm-action.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import { DragAndUploadDirective } from './directives/drag-and-upload.directive';
import { UploadPostComponent } from './components/upload-post/upload-post.component';



@NgModule({
  declarations: [
    NavbarComponent,
    LayoutLoggedComponent,
    SidemenuComponent,
    ViewImageComponent,
    SpinnerComponent,
    ConfirmActionComponent,
    UploadPhotoComponent,
    DragAndUploadDirective,
    UploadPostComponent,

  ],
    exports: [
        LayoutLoggedComponent,
        SpinnerComponent,
        ConfirmActionComponent,
        UploadPhotoComponent,
        UploadPostComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        AngularFileUploaderModule,

    ]
})
export class SharedModule {
}
