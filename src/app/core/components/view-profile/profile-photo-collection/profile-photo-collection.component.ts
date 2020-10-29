import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UsersService} from '../../../../auth/services/users.service';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {photoModel} from '../../../models/photo.model';
import {PhotoService} from '../../../../shared/services/photo.service';
import {ConfirmDialogService} from '../../../../shared/services/confirm-dialog.service';
import {Subscription} from 'rxjs';
import {CanEditProfileService} from '../../../../shared/services/can-edit-profile.service';

@Component({
    selector: 'app-profile-photo-collection',
    templateUrl: './profile-photo-collection.component.html',
    styleUrls: ['./profile-photo-collection.component.scss']
})
export class ProfilePhotoCollectionComponent implements OnInit {

    photoCollection: photoModel[];
    numberID: number;

    canEditProfile = false;
    isYourProfile = false;

    confirmBoxText = false;
    photoBox = false;

    deletePhotoSubscription: Subscription;

    constructor(public users: UsersService,
                private photos: PhotoService,
                private CanEditProfile: CanEditProfileService,
                private confirmService: ConfirmDialogService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.parent.params
            .pipe(
                switchMap((params: Params) => {
                    this.numberID = +params.id;
                    return this.users.getUser();
                }),
                switchMap((user) => {
                    this.canEditProfile = (user.id === this.numberID || user.accountType > 1) || false;
                    this.isYourProfile = (user.id === this.numberID) || false;
                    return this.users.getPhotoCollection(100, this.numberID);
                }),
                map((photo: photoModel[]) => photo)
            )
            .subscribe((photo: any) => {
                this.photoCollection = photo;
                // if (photo.url) this.users.getPhotoByUrl(this.numberID, photo.imgLink).subscribe();

            });
    }

    handleEmitConfirmBox(fun: string, png: photoModel, i: number) {
        this.showConfirmBox();

        this.deletePhotoSubscription = this.confirmService.getConfirmStream()
            .subscribe(confirm => {
                if (confirm === true) {
                    if (fun === 'deletePhoto') {
                        this.deletePhoto(png, i);
                    }
                } else {
                    if (this.deletePhotoSubscription) {
                        this.deletePhotoSubscription.unsubscribe();
                    }
                }
            });

    }

    showConfirmBox() {
        this.confirmBoxText = true;
    }

    closeConfirmBox() {
        this.confirmBoxText = false;
    }

    deletePhoto(png: photoModel, index: number) {
        this.deletePhotoSubscription.unsubscribe();
        this.photoCollection.splice(index, 1);
        this.photos.deleteSelectedPhoto(this.numberID, png).subscribe();
    }

    selectPhotoAsFront(id: number) {
        this.photos.selectPhotoAsFront(id).subscribe();
    }

    selectPhotoAsBack(id: number) {
        this.photos.selectPhotoAsBack(id).subscribe();
    }

    showPhotoBox() {
        this.photoBox = true;
    }

    closePhotoBox() {
        this.photoBox = false;
        setTimeout(() => this.updatePhotoCollection(), 0);

    }

    updatePhotoCollection() {
        this.users.getPhotoCollection(100, this.numberID).pipe(
            map(photo => photo),
            tap((photo: any) => {
                this.photoCollection = photo;
            })
        ).subscribe(photo => this.users.getPhotoByUrl(this.numberID, photo.imgLink).subscribe());

    }
}
