import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap, tap} from 'rxjs/operators';
import {User} from '../../../auth/models/user.model';

@Component({
  selector: 'app-profile-table',
  templateUrl: './profile-table.component.html',
  styleUrls: ['./profile-table.component.scss']
})
export class ProfileTableComponent implements OnInit {

  numberOfPhoto: number;

  imageForm: FormGroup;

  private filesToUpload: null;

  constructor(public users: UsersService) {
  }

  ngOnInit() {
    let id;
    this.users.getUser().pipe(
        tap((user : User) => {
          id = user.id;
        }),
        mergeMap(() => this.users.countUserPhotos(id))
    ).subscribe((numberOfPhoto: number) => {
      this.numberOfPhoto = numberOfPhoto;
    })
    this.initForm();
  }

  uploadImage() {
    this.users.uploadPhoto(this.filesToUpload);
  }

  files(files: any) {
    this.filesToUpload = files[0];
  }

  returnTableForLoop() {
    const array = [];
    for (let i = 0; i < (this.numberOfPhoto > 6 ? 6 : this.numberOfPhoto); i++) {
      array.push(i);
    }

    return array;
  }

  private initForm() {
    this.imageForm = new FormGroup({
      image: new FormControl(null),
    })
  }

}
