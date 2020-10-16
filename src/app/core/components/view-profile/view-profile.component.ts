import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap, switchMap, tap} from 'rxjs/operators';
import {User} from '../../../auth/models/user.model';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
    profileUser: User;

    constructor(public users: UsersService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        let selectedID;

        this.route.params
            .pipe(
                tap((params: Params) => selectedID = params.id),
                mergeMap(() => this.users.getSelectedUser(selectedID)),
                tap((user: User) => {
                    this.profileUser = user;
                }),
                switchMap(() => this.users.getUserFrontProfile(selectedID)),
                switchMap(() => this.users.getUserBackProfile(selectedID))
            )
            .subscribe(

            )
    }
}
