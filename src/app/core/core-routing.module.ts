import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ViewProfileComponent} from './components/view-profile/view-profile.component';
import {SpyProfileComponent} from './components/spy-profile/spy-profile.component';
import {ProfileTableComponent} from './components/profile-table/profile-table.component';
import {ProfilePhotoCollectionComponent} from './components/profile-photo-collection/profile-photo-collection.component';


const routes: Routes = [
    {
        path: 'profile', component: ViewProfileComponent, children: [
        {path: 'table', component: ProfileTableComponent},
        {path: 'photo', component: ProfilePhotoCollectionComponent},

      ],
    },
    {path: 'profile/:id', component: SpyProfileComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule {
}
