import {Component, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';

@Component({
    selector: 'app-layout-logged',
    templateUrl: './layout-logged.component.html',
    styleUrls: ['./layout-logged.component.scss']
})
export class LayoutLoggedComponent implements OnInit {
    sideMenu = false;

    constructor(private router: Router,
                auth: AuthService) {

    }

    ngOnInit() {
        //redirect when user there is no token in localstorage

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
