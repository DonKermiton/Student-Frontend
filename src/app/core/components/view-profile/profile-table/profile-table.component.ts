import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../../../auth/services/users.service';
import {map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {User} from '../../../../shared/models/user.model';
import {ActivatedRoute, Params} from '@angular/router';
import {photoModel} from '../../../models/photo.model';
import {PostsService} from '../../../../shared/services/posts.service';
import {PostComment, PostModel} from '../../../../shared/models/post.model';
import {Subscription} from 'rxjs';
import {PhotoService} from '../../../../shared/services/photo.service';

@Component({
    selector: 'app-profile-table',
    templateUrl: './profile-table.component.html',
    styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent implements OnInit, OnDestroy {
    skip = 0;
    sum = 100;

    postPhoto;


    modalOpen = false;
    postArray: PostModel[] = [];


    photoCollection: photoModel[];
    numberOfPhoto = 0;
    imageForm: FormGroup;

    canEditProfile = false;

    id: number;
    postSubscription: Subscription;
    showCommentsArray = [];
    postComments: PostComment[] = [];

    constructor(public users: UsersService,
                private route: ActivatedRoute,
                public postsService: PostsService,
                private photo: PhotoService) {
    }

    ngOnInit() {
        this.route.parent.params
            .pipe(
                tap((params: Params) => {
                    this.id = params.id;
                }),
                switchMap(() => {
                    return this.users.getUser();
                }),
                switchMap((user: User) => {
                    this.canEditProfile = user.id == this.id;
                    return this.users.countUserPhotos(this.id);
                }),
                switchMap((numberOfPhoto: number) => {
                        this.numberOfPhoto = numberOfPhoto;
                        return this.users.getPhotoCollection(this.windowWidth() ===
                        1 ? 1 : (this.numberOfPhoto < 6 ? this.numberOfPhoto : 6), this.id);
                    }
                ),
                map((photo: photoModel[]) => photo),
                mergeMap((photo: any) => {
                    this.photoCollection = photo;
                    return this.photo.getPostPhotoCollection(68);
                })
            ).subscribe((photo) => {
            this.postPhoto = (photo);

        });


        this.initForm();
    }

    addPost(event: PostModel) {
        console.log(event);
        this.users.getUser()
            .pipe(
                take(1),
                map(user => {
                    if (user) {
                        event.user = {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            id: user.id
                        };
                        this.postArray.unshift(event);
                    }
                })
            )
            .subscribe();

    }

    windowWidth() {
        let size;
        if (window.innerWidth < 880) {
            size = 1;
        } else if (window.innerWidth < 1280) {
            size = 6;
        } else {
            size = 6;
        }

        return size;
    }


    toggleModal() {
        this.modalOpen = !this.modalOpen;
    }


    ngOnDestroy(): void {
        if (this.postSubscription) {
            this.postSubscription.unsubscribe();
        }
    }

    private initForm() {
        this.imageForm = new FormGroup({
            image: new FormControl(null),
        });
    }


}
