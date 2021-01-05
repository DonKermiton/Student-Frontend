import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {SocketIoService} from '../../services/socketio.service';
import {UsersService} from '../../../auth/services/users.service';

@Component({
    selector: 'app-layout-logged',
    templateUrl: './layout-logged.component.html',
    styleUrls: ['./layout-logged.component.scss']
})
export class LayoutLoggedComponent implements OnInit {
    sideMenu = false;

    constructor(private socket: SocketIoService,
                private user: UsersService) {

    }

    ngOnInit() {



        // mobile swap screen to right to open sidemenu
        let touchX;

        fromEvent(document, 'touchstart').subscribe(event => {
            // @ts-ignore
            touchX = (event.touches[0].clientX);
        });
        fromEvent(document, 'touchmove').subscribe(event => {
            // @ts-ignore
            this.sideMenu = (window.innerWidth / 3) < (event.touches[0].clientX - touchX);
        });
    }

    changeStateMenu() {
        console.log('zmiana');
        this.sideMenu = !this.sideMenu;
    }

}
