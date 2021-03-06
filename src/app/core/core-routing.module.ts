import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewProfileComponent} from './components/view-profile/view-profile.component';
import {ProfileTableComponent} from './components/view-profile/profile-table/profile-table.component';
import {ProfilePhotoCollectionComponent} from './components/view-profile/profile-photo-collection/profile-photo-collection.component';
import {ViewFilesComponent} from './components/view-files/view-files.component';


const routes: Routes = [
    {path: 'view-files', component: ViewFilesComponent},
    {
        path: 'profile/:id', component: ViewProfileComponent, children: [
            {path: 'table', component: ProfileTableComponent},
            {path: 'photo', component: ProfilePhotoCollectionComponent},
        ],
    },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
