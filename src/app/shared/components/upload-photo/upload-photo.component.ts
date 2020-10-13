import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {UsersService} from '../../../auth/services/users.service';
import {photoModel} from '../../../core/models/photo.model';

@Component({
    selector: 'app-upload-photo',
    templateUrl: './upload-photo.component.html',
    styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {

    @Output() closeModalEmitter = new EventEmitter<void>();
    public filesToUpload: photoModel[];
    sendingImage = false;

    constructor(private auth: AuthService,
                private users: UsersService) {
    }

    uploadImage() {
        this.sendingImage = true;
        for(const photo of this.filesToUpload) {
            this.users.uploadPhoto(photo);
        }

        this.closeModal();

    }

    files(files: photoModel[]) {
        this.filesToUpload = files;

    }

    ngOnInit() {

    }

    closeModal() {
        this.closeModalEmitter.emit();
    }



    reportChange(any: any) {
        console.log(any)
    }

}
