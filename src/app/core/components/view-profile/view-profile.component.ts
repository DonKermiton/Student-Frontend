import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap, switchMap, tap} from 'rxjs/operators';
import {User} from '../../../shared/models/user.model';
import {ActivatedRoute, Params} from "@angular/router";
import {faCameraRetro, faReceipt, faCogs } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
    profileUser: User;
    error: string;

    faReceipt = faReceipt;
    faCameraRetro = faCameraRetro;
    faCogs = faCogs;

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
                tap((user: User) => {
                    this.profileUser = user;
                }, () => {
                    throw this.userNotFound()
                }),
                switchMap(() => this.users.getUserFrontProfile(selectedID)),
                switchMap(() => this.users.getUserBackProfile(selectedID))
            )
            .subscribe(() => {
            }, err => {
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
