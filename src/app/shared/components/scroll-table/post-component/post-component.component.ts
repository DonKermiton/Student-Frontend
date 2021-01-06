import {Component, Input, OnInit} from '@angular/core';
import {PostComment, PostModel} from '../../../models/post.model';
import {formatDistanceToNow} from 'date-fns';
import {UsersService} from '../../../../auth/services/users.service';
import {delay, map, retryWhen} from 'rxjs/operators';
import {faComments, faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import {faCaretRight, faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {PostsService} from '../../../services/posts.service';
import {PhotoService} from '../../../services/photo.service';


@Component({
    selector: 'app-post-component',
    templateUrl: './post-component.component.html',
    styleUrls: ['./post-component.component.scss']
})
export class PostComponentComponent implements OnInit {

    faCaretRight = faCaretRight;
    faEllipsisH = faEllipsisH;
    faComments = faComments;
    faThumbsUp = faThumbsUp;
    @Input() post: PostModel;
    userID: number;
    commentText: string;
    startComments = 0;
    endComments = 100;
    showUserList = false;
    commentBaseDate = 0;
    imageId: number = null;


    constructor(public users: UsersService,
                private posts: PostsService,
                public photos: PhotoService) {
    }

    ngOnInit(): void {
        this.imageId = this.post.postID;
        this.users.getUserID()
            .pipe(
                map(response => {
                    if (!response) {
                        throw new Error();
                    }
                    return response;
                }),
                retryWhen(errors => errors.pipe(
                    delay(1000),
                ))
            )
            .subscribe((value) => {
                this.userID = value;
            });

        this.posts.isInYourLikes(this.post.postID).subscribe((value) => {
            if (value) {
                this.post.isInYourLikes = true;
            }
        });
    }

    getPostDate(date) {
        return formatDistanceToNow(new Date(date));
    }

    createComment(postID: number) {
        console.log(this.commentText);
        this.posts.createPostComment(postID, this.commentText).subscribe(
            (post: any) => {
                const obj: PostComment = {
                    created: new Date(),
                    ownerID: post.id,
                    postID,
                    text: this.commentText,
                    user: {first_name: post.first_name, id: post.id, last_name: post.last_name}
                };
                this.commentText = '';
                if (!this.post.PostComment) {
                    this.post.PostComment = [];
                }

                this.post.PostComment.push(obj);
                this.post.comments++;

                // this.wroteComment.emit(obj);

            }
        );
    }

    getPostComment(postID: number) {
        let skip, moveUp;

        if (!this.post.PostComment) {
            skip = 0;
        } else {
            skip = this.post.PostComment.length;
        }

        if (this.post.comments < 3) {
            moveUp = 1;
        } else {
            moveUp = Math.floor(this.post.comments / 3)
        }

        this.posts.getPostComment(postID, skip, moveUp).subscribe((postComments: PostComment[]) => {
            console.log(postComments);
            if (postComments) {
                if (!this.post.PostComment) {
                    this.post.PostComment = [];
                }
                for (const comm of postComments) {
                    this.post.PostComment.push(comm);
                    comm.created = new Date(comm.created);
                    // todo Change
                }
                this.post.PostComment = this.post.PostComment
                    .sort((a: PostComment, b: PostComment) => {
                        return a.created.valueOf() - b.created.valueOf();
                    });

            }
        });
    }

    handleLikeClick(postID: number) {
        console.log(this.users.userID);
        this.post.isInYourLikes = !this.post.isInYourLikes;

        switch (this.post.isInYourLikes) {
            case true: {
                this.post.likes++;
                this.posts.sendLike(postID).subscribe();
                break;
            }
            case false: {
                this.post.likes--;
                this.posts.deleteLike(postID).subscribe();
                break;
            }
        }
    }

    commentNextHandler() {
        // todo add implementation
    }

    detectChange($event: string) {
        this.commentText = $event;
        if ($event[$event.length - 1] === '@') {
            console.log('teraz');
            this.showUserList = true;
        } else if ($event.indexOf('@') === -1) {
            console.log('test');
        }
    }
}
