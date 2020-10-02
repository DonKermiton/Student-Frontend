import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherPanelRoutingModule } from './teacher-panel-routing.module';
import { TeacherPanelComponent } from './teacher-panel.component';


@NgModule({
  declarations: [TeacherPanelComponent],
  imports: [
    CommonModule,
    TeacherPanelRoutingModule
  ]
})
export class TeacherPanelModule { }
