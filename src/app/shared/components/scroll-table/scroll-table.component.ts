import {Component, Input, OnInit} from '@angular/core';
import {PostComment, PostModel} from '../../models/post.model';
import {formatDistanceToNow} from 'date-fns';
import {PostsService} from '../../services/posts.service';
import {concatMap, map, mergeMap, take} from 'rxjs/operators';
import {UsersService} from '../../../auth/services/users.service';
import {SocketIoService} from '../../services/socketio.service';
import {faComments, faShareSquare, faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import {faEllipsisH, faSearch, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-scroll-table',
    templateUrl: './scroll-table.component.html',
    styleUrls: ['./scroll-table.component.scss']
})
export class ScrollTableComponent implements OnInit {
    faThumbsUp = faThumbsUp;
    faShareSquare = faShareSquare;
    faComments = faComments;
    faEllipsisH = faEllipsisH;
    faSearch = faSearch;
    faCaretRight = faCaretRight;

    postArray: PostModel[] = [];
    @Input() id: number;
    @Input() type: string;

    // infinite scroll variables
    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;
    postNumber = 0;
    modalOpen = false;

    postAdded = 0;

    commentsForm = new FormArray([]);

    skip = 0;
    sum = 0;

    constructor(private post: PostsService,
                public users: UsersService,
                private socket: SocketIoService) {
    }


    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        // todo change to universal usage
        this.socket.getPosts().subscribe(data => {
            this.postArray.unshift(data);
        });
        switch (this.type) {
            case 'dashboard': {
                this.post.getUserPostDashboard(this.skip)
                    .pipe(
                        concatMap((post: PostModel[]) => post),
                        mergeMap((post) => {
                            this.postArray.push(post);
                            console.log(this.postArray.length);
                            this.onAddComment();
                            return this.post.isInYourLikes(post.postID);
                        }),
                    ).subscribe((value) => {
                    if (value) {
                        console.log(this.postAdded);
                        this.postArray[this.postAdded].isInYourLikes = true;
                    }
                    this.postAdded++;
                });

                break;
            }

            case 'profile': {
                this.post.getUserPost(this.id, this.skip)
                    .pipe(
                        concatMap((post: PostModel[]) => post),
                        mergeMap((post) => {
                            this.postArray.push(post);
                            console.log(this.postArray.length);
                            return this.post.isInYourLikes(post.postID);
                        }),
                    ).subscribe((value) => {
                    if (value) {
                        console.log(this.postAdded);
                        this.postArray[this.postAdded].isInYourLikes = true;
                    }
                    this.postAdded++;
                });
                break;
            }
        }
    }

    onScrollDown() {
        this.skip += 5;
        this.sum += 5;
        this.getPosts();
    }

    getPostComment(postID: number, index: number) {
        let skip;

        if (!this.postArray[index].PostComment) {
            skip = 0;
        } else {
            skip = this.postArray[index].PostComment.length;
        }
        this.post.getPostComment(postID, skip).subscribe((postComments: PostComment) => {
            console.log(index);

            if (postComments) {
                if (!this.postArray[index].PostComment) {
                    this.postArray[index].PostComment = [];
                }

                this.postArray[index].PostComment.push(postComments);
            }
        });
    }

    getPostDate(date) {
        return formatDistanceToNow(new Date(date));
    }

    deletePost(postID: number) {
        // TODO add implementation
    }

    countSelectedPostComments(id: number) {
        // TODO add implementation
        return null;
    }

    addPost(event: PostModel) {

        this.users.getUser()
            .pipe(
                take(1),
                map(user => {
                    if (user) {
                        event.user = {
                            first_name: user.first_name,
                            last_name: user.last_name,
                            id: user.id
                        };
                        this.socket.sendPost(event);
                        this.postArray.unshift(event);
                    }
                })
            )
            .subscribe();

    }

    handleLikeClick(postID: number, index: number) {
        this.postArray[index].isInYourLikes = !this.postArray[index].isInYourLikes;

        switch (this.postArray[index].isInYourLikes) {
            case true: {
                this.postArray[index].likes++;
                this.post.sendLike(postID).subscribe();
                break;
            }
            case false: {
                this.postArray[index].likes--;
                this.post.deleteLike(postID).subscribe();
                break;
            }
        }
    }

    private onAddComment() {
        this.commentsForm.push(new FormGroup({
            text: new FormControl(null, Validators.required)
        }));
        console.log(this.commentsForm);
    }


    submit(i: number) {
        console.log(this.commentsForm.value[i]);
    }
}
