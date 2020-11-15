import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {photoModel} from "../../../core/models/photo.model";
import {UsersService} from "../../../auth/services/users.service";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-upload-post',
    templateUrl: './upload-post.component.html',
    styleUrls: ['./upload-post.component.scss']
})
export class UploadPostComponent implements OnInit {
    @Output() hideModel = new EventEmitter<void>()
    @ViewChild('textAreaElement', {static: true}) textarea: ElementRef;
    public filesToUpload: photoModel[];

    constructor(private post: PostsService,
                private users: UsersService) {
    }

    ngOnInit() {
    }

    hideModal() {
        this.hideModel.emit();
    }

    createPost() {
        /*  for(const photo of this.filesToUpload) {
             this.users.uploadPhoto(photo).subscribe(console.log);
           }*/
        this.post.createPost(this.textarea.nativeElement.value)
            .pipe(
                map((res: any) => {
                    for (const photo of this.filesToUpload) {
                        this.users.uploadPhoto(photo, res.postID).subscribe(console.log);
                    }
                })
            )
            .subscribe()


    }


}
