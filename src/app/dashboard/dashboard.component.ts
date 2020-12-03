import {Component, OnInit} from '@angular/core';
import {UsersService} from '../auth/services/users.service';
import {PostsService} from '../shared/services/posts.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor(private users: UsersService) {
    }

    ngOnInit() {
        this.users.getUser()
            .pipe()
            .subscribe();
        // check in which group is user

    }

}
