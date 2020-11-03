import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {UsersService} from '../../../auth/services/users.service';
import {ActivatedRoute, ActivationEnd} from "@angular/router";

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
    @Input() sideMenuActive: boolean;

    constructor(public users: UsersService,
                public auth: AuthService,
                public route: ActivatedRoute) {
    }

    ngOnInit(): void {

    }

     get actualURL() {
        return this.route.url;
    }

}
