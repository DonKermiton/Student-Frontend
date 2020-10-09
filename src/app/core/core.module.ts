import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SpyProfileComponent } from './components/spy-profile/spy-profile.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import { ProfileTableComponent } from './components/profile-table/profile-table.component';
import { ProfilePhotoCollectionComponent } from './components/profile-photo-collection/profile-photo-collection.component';




@NgModule({
  declarations: [ViewProfileComponent, SpyProfileComponent, ProfileTableComponent, ProfilePhotoCollectionComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
        ReactiveFormsModule,
        AngularFileUploaderModule
    ]
})
export class CoreModule { }
