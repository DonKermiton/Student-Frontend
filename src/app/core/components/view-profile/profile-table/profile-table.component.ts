import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../../../auth/services/users.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {User} from '../../../../shared/models/user.model';
import {ActivatedRoute, Params} from '@angular/router';
import {photoModel} from '../../../models/photo.model';
import {PostsService} from '../../../../shared/services/posts.service';
import {PostComment, PostModel} from '../../../../shared/models/post.model';
import {formatDistanceToNow} from 'date-fns';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profile-table',
    templateUrl: './profile-table.component.html',
    styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent implements OnInit {
    skip = 0;
    sum = 100;
    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;


    modalOpen = false;
    postArray: PostModel[] = [];


    photoCollection: photoModel[];
    numberOfPhoto = 0;
    imageForm: FormGroup;
    postNumber = 0;

    canEditProfile = false;

    id: number;
    postSubscription: Subscription;
    showCommentsArray = [];
    postComments: PostComment[] = [];

    constructor(public users: UsersService,
                private route: ActivatedRoute,
                public postsService: PostsService) {
    }

    ngOnInit() {
        this.route.parent.params
            .pipe(
                tap((params: Params) => {
                    this.id = params.id;
                }),
                switchMap(() =>
                    this.postsService.getUserPostNumber(this.id)
                ),
                switchMap((nmb: any) => {
                    this.postNumber = nmb;
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
                map((photo: photoModel[]) => photo)
            ).subscribe((photo: any) => {
            this.addItems(0)
            this.photoCollection = photo;
            if (photo.url) {
                this.users.getPhotoByUrl(this.id, photo.imgLink).subscribe();
            }
        });


        this.initForm();
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

    addItems(skip:number) {
        this.postSubscription = this.postsService.getUserPost(this.id, skip)
            .pipe(
                switchMap((post: PostModel[]) => post),
                map((post: PostModel) => post),
                switchMap((post) => {
                    if (this.postArray.length < this.postNumber) {
                        this.postArray.push(post);
                    }
                    return this.postsService.countPostComments(post.postID);
                })
            ).subscribe((likes: number) => {
                console.log(likes);
                this.postSubscription.unsubscribe();
            });

    }



    onScrollDown(ev) {
        console.log('scrolled down!!', ev);

        this.skip += 5;
        this.sum += 5;
        this.addItems(this.skip);

    }
    toggleModal() {
        this.modalOpen = !this.modalOpen;
    }

    getPostDate(date) {
        return formatDistanceToNow(new Date(date));
    }

    getPostComment(postID: number, last: number) {
        this.postsService.getPostComment(postID, last).subscribe((postComments: PostComment) => {
            if (postComments) {
                this.postComments.push(postComments);
            }
        });
    }

    deletePost(postID: number) {
        this.postsService.deletePost(postID).subscribe();
    }

    countSelectedPostComments(id: number) {
        return this.postComments.filter(e => e.postID === id).length;
    }


    private initForm() {
        this.imageForm = new FormGroup({
            image: new FormControl(null),
        });
    }
}
