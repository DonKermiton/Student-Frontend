import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminPanelComponent} from './admin-panel.component';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';

const routes: Routes = [
    {
        path: '', component: AdminPanelComponent, children: [
            {path: 'teacher', component: CreateTeacherComponent}
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminPanelRoutingModule {
}
