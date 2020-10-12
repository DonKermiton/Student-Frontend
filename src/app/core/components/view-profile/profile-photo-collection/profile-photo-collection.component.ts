import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../../auth/services/users.service';
import {map, mergeMap, tap} from "rxjs/operators";
import {ActivatedRoute, Params} from "@angular/router";
import {photoModel} from "../../../models/photo.model";

@Component({
  selector: 'app-profile-photo-collection',
  templateUrl: './profile-photo-collection.component.html',
  styleUrls: ['./profile-photo-collection.component.scss']
})
export class ProfilePhotoCollectionComponent implements OnInit {
    photoCollection: photoModel[];
    numberID: number;

  constructor(public users: UsersService,
              private route: ActivatedRoute) { }

  ngOnInit() {


    this.route.parent.params
        .pipe(
            tap((params: Params) => this.numberID = params.id),
            mergeMap(() => this.users.getPhotoCollection(this.numberID)),
            map((photo: photoModel[]) => photo)
        )
        .subscribe((photo:any) => {
            this.photoCollection = photo;
            if(photo.url) this.users.getPhotoByUrl(this.numberID, photo.imgLink).subscribe();
        })

  }


    showMenu(png: photoModel) {

    }

    deletePhoto(png: photoModel) {
        console.log('delete');
    }
}
