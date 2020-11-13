import {Component, Input, OnInit} from '@angular/core';
import {mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {PhotoService} from '../../shared/services/photo.service';
import {photoModel} from '../../core/models/photo.model';
import {UsersService} from '../../auth/services/users.service';
import {UserModel} from '../../shared/models/user.model';

@Component({
    selector: 'app-image-comments',
    templateUrl: './image-comments.component.html',
    styleUrls: ['./image-comments.component.scss']
})
export class ImageCommentsComponent implements OnInit {
    postComments = [];
    showMore = false;
    user: UserModel;
    photoDate;

    @Input() showComments = true;

    constructor(private route: ActivatedRoute,
                private photo: PhotoService,
                private users: UsersService) {
    }

    ngOnInit() {
        this.route.queryParams
            .pipe(
                mergeMap((params: Params) => {
                    return this.photo.getPhotoCredentials(params.id);
                }),
                mergeMap((photo: photoModel) => {
                    this.photoDate = photo.Date;
                    return this.users.getSelectedUser(photo.ownerID);
                })
            )
            .subscribe((user:any) => {
                this.user = user;
            })

        for (let i = 0; i < 100; i++) {
            this.postComments.push(i);
        }
    }

}
