import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../../auth/services/users.service';
import {map, mergeMap, tap} from "rxjs/operators";
import {ActivatedRoute, Params} from "@angular/router";
import {photoModel} from "../../../models/photo.model";
import {PhotoService} from "../../../../shared/services/photo.service";
import {ConfirmDialogService} from "../../../../shared/services/confirm-dialog.service";
import {of, Subscription} from 'rxjs';

@Component({
    selector: 'app-profile-photo-collection',
    templateUrl: './profile-photo-collection.component.html',
    styleUrls: ['./profile-photo-collection.component.scss']
})
export class ProfilePhotoCollectionComponent implements OnInit {
    photoCollection: photoModel[];
    numberID: number;

    confirmBoxText = false;
    selectedPhoto: photoModel;
    photoBox = false;

    deletePhotoSubscription: Subscription;

    constructor(public users: UsersService,
                private photos: PhotoService,
                private confirmService: ConfirmDialogService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.parent.params
            .pipe(
                tap((params: Params) => this.numberID = params.id),
                mergeMap(() => this.users.getPhotoCollection(100, this.numberID)),
                map((photo: photoModel[]) => photo)
            )
            .subscribe((photo: any) => {
                this.photoCollection = photo;
                // if (photo.url) this.users.getPhotoByUrl(this.numberID, photo.imgLink).subscribe();

            })

    }

    handleEmitConfirmBox(fun: string, png: photoModel, i: number) {
        this.showConfirmBox();

        this.deletePhotoSubscription = this.confirmService.getConfirmStream()
            .subscribe(confirm => {
                if (confirm === true) {
                    if (fun === 'deletePhoto') this.deletePhoto(png, i)
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
        this.photos.deleteSelectedPhoto(this.numberID, png).subscribe(console.log)

    }

    selectPhotoAs(png: photoModel, type: number) {
        this.photos.selectAsFront(png, type).subscribe(console.log)
    }

    showPhotoBox() {
        this.photoBox = true;
    }

    closePhotoBox() {
        this.photoBox = false;
        setTimeout(() => this.updatePhotoCollection(), 0)

    }

    updatePhotoCollection() {
        this.users.getPhotoCollection(100, this.numberID).pipe(
            map(photo => photo),
            tap((photo: any) => {
                this.photoCollection = photo;
            })
        ).subscribe();

    }
}
