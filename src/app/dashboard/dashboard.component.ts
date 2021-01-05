import {Component, OnInit} from '@angular/core';
import {UsersService} from '../auth/services/users.service';

import {SocketIoService} from "../shared/services/socketio.service";
import {PostModel} from "../shared/models/post.model";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    emitPost: PostModel;

    constructor(private users: UsersService,
                private socket: SocketIoService) {
    }

    ngOnInit() {
        this.users.getUser()
            .pipe()
            .subscribe();
        // check in which group is user

    }

}
