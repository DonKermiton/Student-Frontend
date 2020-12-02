import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import {SharedModule} from '../shared/shared.module';
import { LatestInfoComponent } from './latest-info/latest-info.component';


@NgModule({
  declarations: [DashboardComponent, GroupsListComponent, LatestInfoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
