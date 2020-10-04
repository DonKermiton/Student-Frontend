import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../auth/services/users.service';

@Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
    private filesToUpload: null;
    imageForm: FormGroup;

    constructor(public users: UsersService) {
    }

    ngOnInit() {
        this.initForm();
    }

    uploadImage() {
        this.users.uploadPhoto(this.filesToUpload);
    }

    files(files: any) {
        this.filesToUpload = files[0];
    }

    private initForm(){
        this.imageForm = new FormGroup({
            image: new FormControl(null),
        })
    }
}
