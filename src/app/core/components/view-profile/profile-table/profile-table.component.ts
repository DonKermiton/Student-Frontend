import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../../../auth/services/users.service';
import {map, mergeMap, tap} from 'rxjs/operators';
import {User} from '../../../../auth/models/user.model';
import {ActivatedRoute, Params} from "@angular/router";
import {photoModel} from "../../../models/photo.model";

@Component({
    selector: 'app-profile-table',
    templateUrl: './profile-table.component.html',
    styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent implements OnInit {
    photoCollection: photoModel[];
    numberOfPhoto = 0;
    imageForm: FormGroup;

    canEditProfile = false;

    private filesToUpload: null;

    constructor(public users: UsersService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        let id;

        this.route.parent.params
            .pipe(
                tap((params: Params) => {
                    id = params.id;
                }),
                mergeMap(() => this.users.getUser()),
                tap((user: User) => {
                    this.canEditProfile = user.id == id
                }),
                mergeMap(() => this.users.countUserPhotos(id)),
                tap((numberOfPhoto: number) => {
                    this.numberOfPhoto = numberOfPhoto;
                }),
                mergeMap(() => this.users.getPhotoCollection( this.windowWidth() === 1 ? 1 : (this.numberOfPhoto < 6 ? this.numberOfPhoto : 6),id)),
                map((photo: photoModel[]) => photo)
            ).subscribe((photo: any) => {
            this.photoCollection = photo;
            if(photo.url) this.users.getPhotoByUrl(id, photo.imgLink).subscribe();
        })


        this.initForm();
    }

    uploadImage() {
        this.users.uploadPhoto(this.filesToUpload);
    }

    files(files: any) {
        this.filesToUpload = files[0];
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


}
