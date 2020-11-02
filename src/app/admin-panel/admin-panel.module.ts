import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';


@NgModule({
  declarations: [AdminPanelComponent, CreateTeacherComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }
