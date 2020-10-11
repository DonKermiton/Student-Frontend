import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap, tap} from 'rxjs/operators';
import {User} from '../../../auth/models/user.model';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
    constructor(public users: UsersService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {

    }
}
