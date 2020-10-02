import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SpyProfileComponent } from './spy-profile/spy-profile.component';




@NgModule({
  declarations: [ViewProfileComponent, SpyProfileComponent],
    imports: [
        CommonModule,
        CoreRoutingModule,
        ReactiveFormsModule
    ]
})
export class CoreModule { }
