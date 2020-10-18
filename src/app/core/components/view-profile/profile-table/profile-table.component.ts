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

    id: number;


    constructor(public users: UsersService,
                private route: ActivatedRoute) {
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


}
