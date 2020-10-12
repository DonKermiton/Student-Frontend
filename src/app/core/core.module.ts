import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoreRoutingModule} from './core-routing.module';
import {ViewProfileComponent} from './components/view-profile/view-profile.component';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {ProfileTableComponent} from './components/view-profile/profile-table/profile-table.component';
import {ProfilePhotoCollectionComponent} from './components/view-profile/profile-photo-collection/profile-photo-collection.component';
import {SharedModule} from "../shared/shared.module";
import { PhotoOptionDirective } from './directives/photo-option.directive';


@NgModule({
    declarations: [ViewProfileComponent, ProfileTableComponent, ProfilePhotoCollectionComponent, PhotoOptionDirective],
    imports: [
        CommonModule,
        CoreRoutingModule,
        AngularFileUploaderModule,
        SharedModule
    ]
})
export class CoreModule {
}
