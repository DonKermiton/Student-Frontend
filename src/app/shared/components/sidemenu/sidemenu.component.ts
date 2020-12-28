import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {UsersService} from '../../../auth/services/users.service';
import {ActivatedRoute, ActivationEnd} from '@angular/router';
import { faCaretSquareLeft } from '@fortawesome/free-regular-svg-icons';
import { faCaretSquareDown } from '@fortawesome/free-regular-svg-icons';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faChalkboard } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
    faCaretSquareLeft = faCaretSquareLeft;
    faFolderOpen = faFolderOpen;
    faComment = faComment;
    faChalkboard = faChalkboard;
    faCaretSquareDown = faCaretSquareDown;
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
