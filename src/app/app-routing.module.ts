import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutLoggedComponent} from './shared/components/layout-logged/layout-logged.component';


const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'teacherPanel',
        loadChildren: () => import('./teacher-panel/teacher-panel.module').then(m => m.TeacherPanelModule),
        component: LayoutLoggedComponent,
    },
    {
        path: 'core',
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
        component: LayoutLoggedComponent
    },
    {
        path: 'studentPanel',
        loadChildren: () => import('./student-panel/student-panel.module').then(m => m.StudentPanelModule),
        component: LayoutLoggedComponent
    },
    {
        path: 'shared',
        loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    },
    {
        path: 'adminPanel',
        loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
        component: LayoutLoggedComponent,
    },
    {
      path: 'image-view',
      loadChildren: () => import('./image-view/image-view.module').then(m => m.ImageViewModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
