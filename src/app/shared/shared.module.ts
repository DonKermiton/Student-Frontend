import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';

import {LayoutLoggedComponent} from './components/layout-logged/layout-logged.component';
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';

import {SpinnerComponent} from './components/spinner/spinner.component';
import {ConfirmActionComponent} from './components/confirm-action/confirm-action.component';
import {UploadPhotoComponent} from './components/upload-photo/upload-photo.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {DragAndUploadDirective} from './directives/drag-and-upload.directive';
import {UploadPostComponent} from './components/upload-post/upload-post.component';
import {ShowPostOptionsDirective} from './directives/show-post-options.directive';
import {ShowMoreOptionsDirective} from './directives/show-more-options.directive';

import {CreateCommentComponent} from './components/create-comment/create-comment.component';
import {ViewFilesComponent} from './components/view-files/view-files.component';
import {GaugeModule} from "angular-gauge";
import {WriteTextComponent} from './components/write-text/write-text.component';
import {ScrollTableComponent} from './components/scroll-table/scroll-table.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SmallCalendarComponent} from './components/small-calendar/small-calendar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PostComponentComponent } from './components/scroll-table/post-component/post-component.component';



@NgModule({
    declarations: [
        LayoutLoggedComponent,
        SidemenuComponent,
        SpinnerComponent,
        ConfirmActionComponent,
        UploadPhotoComponent,
        DragAndUploadDirective,
        UploadPostComponent,
        ShowPostOptionsDirective,
        ShowMoreOptionsDirective,
        CreateCommentComponent,
        ViewFilesComponent,
        WriteTextComponent,
        ScrollTableComponent,
        SmallCalendarComponent,
        PostComponentComponent

    ],
    exports: [
        LayoutLoggedComponent,
        SpinnerComponent,
        ConfirmActionComponent,
        UploadPhotoComponent,
        UploadPostComponent,
        ShowPostOptionsDirective,
        CreateCommentComponent,
        WriteTextComponent,
        ScrollTableComponent,
        SmallCalendarComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        AngularFileUploaderModule,
        GaugeModule.forRoot(),
        InfiniteScrollModule,
        FontAwesomeModule,
        FormsModule,
    ]
})
export class SharedModule {
}
