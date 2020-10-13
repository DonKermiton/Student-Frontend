import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../../auth/services/users.service';
import {map, mergeMap, tap} from "rxjs/operators";
import {ActivatedRoute, Params} from "@angular/router";
import {photoModel} from "../../../models/photo.model";
import {PhotoService} from "../../../../shared/services/photo.service";
import {ConfirmDialogService} from "../../../../shared/services/confirm-dialog.service";

@Component({
    selector: 'app-profile-photo-collection',
    templateUrl: './profile-photo-collection.component.html',
    styleUrls: ['./profile-photo-collection.component.scss']
})
export class ProfilePhotoCollectionComponent implements OnInit {
    photoCollection: photoModel[];
    numberID: number;

    confirmBoxText= false;
    selectedPhoto: photoModel;
    photoBox = false;

    constructor(public users: UsersService,
                private photos: PhotoService,
                private confirmService: ConfirmDialogService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.parent.params
            .pipe(
                tap((params: Params) => this.numberID = params.id),
                mergeMap(() => this.users.getPhotoCollection(999 ,this.numberID)),
                map((photo: photoModel[]) => photo)
            )
            .subscribe((photo: any) => {
                this.photoCollection = photo;
                if (photo.url) this.users.getPhotoByUrl(this.numberID, photo.imgLink).subscribe();
            })

    }

    handleEmitConfirmBox(fun: Function, png: photoModel, i: number) {
        this.showConfirmBox();

        this.confirmService.getConfirmStream()
            .subscribe(confirm => {
                if(confirm) {
                    console.log(confirm)
                    if (fun.name === 'deletePhoto') this.deletePhoto(png, i)
                }
            })
    }

    showConfirmBox() {
        this.confirmBoxText = true;
    }

    closeConfirmBox() {
        this.confirmBoxText = false;
    }

    deletePhoto(png: photoModel, index: number) {
        this.photoCollection.splice(index, 1);
        this.photos.deleteSelectedPhoto(this.numberID, png).subscribe(console.log)
    }

    selectPhotoAs(png: photoModel, type: number) {
        this.photos.selectAsFront(png, type).subscribe(console.log)
    }

    closePhotoBox() {
        this.photoBox = false;
    }
}
