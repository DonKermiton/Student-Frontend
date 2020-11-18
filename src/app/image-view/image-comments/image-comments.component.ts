import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {PhotoService} from '../../shared/services/photo.service';
import {photoModel} from '../../core/models/photo.model';
import {UsersService} from '../../auth/services/users.service';
import {PostsService} from '../../shared/services/posts.service';
import {PostComment, PostModel} from '../../shared/models/post.model';
import {formatDistanceToNow} from "date-fns";

@Component({
    selector: 'app-image-comments',
    templateUrl: './image-comments.component.html',
    styleUrls: ['./image-comments.component.scss']
})
export class ImageCommentsComponent implements OnInit {
    showMore = false;
    postData: PostModel;
    postComments: PostComment[];
    photoDate;
    postID: string;

    @Input() showComments = true;
    @Output() emitPhotoCollection = new EventEmitter<photoModel[]>()
    isCreatingComment = false;

    constructor(private route: ActivatedRoute,
                private photo: PhotoService,
                private users: UsersService,
                private posts: PostsService) {
    }

    ngOnInit() {
        this.route.queryParams
            .pipe(
                mergeMap((params: Params) => {
                    return this.photo.getPhotoCredentials(params.id);
                }),
                mergeMap((photo: photoModel) => {
                    this.postID = photo.postID;
                    this.photoDate = photo.Date;
                    return this.posts.getSelectedPost(+this.postID)
                }),
                mergeMap((post) => {
                    this.postData = post;
                    return this.posts.getAllPostComments(+this.postID);
                }),
                mergeMap((postComments) => {
                    this.postComments = postComments;
                    return this.photo.getPostPhotoCollection(+this.postID);
                }),
            )
            .subscribe((photoCollection) => {
                this.emitPhotoCollection.emit(photoCollection);
            })

    }

    getPostDate(date) {
        return formatDistanceToNow(new Date(date));
    }


    addWroteComment(event: PostComment) {
        this.isCreatingComment = false;
        this.postComments.push(event);
    }
}
