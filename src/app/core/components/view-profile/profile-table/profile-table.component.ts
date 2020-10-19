import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../../../auth/services/users.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {User} from '../../../../shared/models/user.model';
import {ActivatedRoute, Params} from "@angular/router";
import {photoModel} from "../../../models/photo.model";
import {PostsService} from "../../../../shared/services/posts.service";
import {PostModel} from "../../../../shared/models/post.model";

@Component({
    selector: 'app-profile-table',
    templateUrl: './profile-table.component.html',
    styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent implements OnInit {
    array = [];
    sum = 100;
    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;
    direction = '';
    modalOpen = false;
    postArray: PostModel[];



    photoCollection: photoModel[];
    numberOfPhoto = 0;
    imageForm: FormGroup;

    canEditProfile = false;

    id: number;


    constructor(public users: UsersService,
                private route: ActivatedRoute,
                private post: PostsService) {
        this.appendItems(0, this.sum);

    }

    ngOnInit() {
        this.route.parent.params
            .pipe(
                mergeMap((params: Params) => {
                    this.id = params.id;
                    return this.users.getUser()
                }),
                mergeMap((user: User) => {
                    this.canEditProfile = user.id == this.id
                    return this.users.countUserPhotos(this.id)
                }),
                mergeMap((numberOfPhoto: number) => {
                        this.numberOfPhoto = numberOfPhoto;
                        return this.users.getPhotoCollection(this.windowWidth() === 1 ? 1 : (this.numberOfPhoto < 6 ? this.numberOfPhoto : 6), this.id);
                    }
                ),
                map((photo: photoModel[]) => photo)
            ).subscribe((photo: any) => {
            this.photoCollection = photo;
            if (photo.url) this.users.getPhotoByUrl(this.id, photo.imgLink).subscribe();
        })

        this.post.getUserPost(this.id, 1).subscribe(console.log);


        this.initForm();
    }


    windowWidth() {
        let size;
        if (window.innerWidth < 880) {
            size = 1;
        } else if (window.innerWidth < 1280) {
            size = 6;
        } else {
            size = 6
        }

        return size;
    }

    private initForm() {
        this.imageForm = new FormGroup({
            image: new FormControl(null),
        })
    }


    addItems(startIndex, endIndex, _method) {

    }

    appendItems(startIndex, endIndex) {
        this.addItems(startIndex, endIndex, 'push');
    }

    prependItems(startIndex, endIndex) {
        this.addItems(startIndex, endIndex, 'unshift');
    }

    onScrollDown (ev) {
        console.log('scrolled down!!', ev);

        // add another 20 items
        const start = this.sum;
        this.sum += 5;
        this.appendItems(start, this.sum);

        this.direction = 'down'
    }

    onUp(ev) {
        console.log('scrolled up!', ev);
        const start = 50;
        this.sum += 20;
        this.prependItems(start, this.sum);

        this.direction = 'up';
    }


    toggleModal() {
        this.modalOpen = !this.modalOpen;
    }
}
