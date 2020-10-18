import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap, retry, retryWhen, switchMap, tap} from 'rxjs/operators';
import {User} from '../../../auth/models/user.model';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
    profileUser: User;
    error: string;

    constructor(public users: UsersService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        let selectedID;

        this.route.params
            .pipe(
                tap((params: Params) => selectedID = params.id),
                mergeMap(() => this.users.getSelectedUser(selectedID)),
                // retry(2),
                tap((user: User)=> {
                    this.profileUser = user;
                }, () => {throw this.userNotFound()}),
                switchMap(() => this.users.getUserFrontProfile(selectedID)),
                switchMap(() => this.users.getUserBackProfile(selectedID))
            )
            .subscribe(() => {}, err => {
                console.log(err);
            })
    }

    updateProfileViewImages() {
        this.users.getUserFrontProfile(this.profileUser.id).subscribe();
        this.users.getUserBackProfile(this.profileUser.id).subscribe();
    }

    userNotFound() {
        this.error = 'User Not Found';
    }

}
