import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LayoutLoggedComponent} from './components/layout-logged/layout-logged.component';
import {SidemenuComponent} from './components/sidemenu/sidemenu.component';
import { ViewImageComponent } from './components/view-image/view-image.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LayoutLoggedComponent,
    SidemenuComponent,
    ViewImageComponent,
    SpinnerComponent,
  ],
    exports: [
        LayoutLoggedComponent,
        SpinnerComponent
    ],
  imports: [
    CommonModule,
    SharedRoutingModule,

  ]
})
export class SharedModule {
}
