import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SocketIoService} from "./services/socketio.service";



const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SocketIoService]
})
export class SharedRoutingModule { }
