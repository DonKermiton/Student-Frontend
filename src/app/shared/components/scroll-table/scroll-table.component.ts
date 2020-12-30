import {Component, Input, OnInit} from '@angular/core';
import {PostComment, PostModel} from '../../models/post.model';
import {formatDistanceToNow} from 'date-fns';
import {PostsService} from '../../services/posts.service';
import {concatMap, delay, map, mergeMap, retryWhen, take} from 'rxjs/operators';
import {UsersService} from '../../../auth/services/users.service';
import {SocketIoService} from '../../services/socketio.service';
import {faComments, faShareSquare, faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import {faCaretRight, faEllipsisH, faSearch} from '@fortawesome/free-solid-svg-icons';


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


    userID: number;
    skip = 0;
    sum = 0;
    commentsForm = [];

    constructor(private post: PostsService,
                public users: UsersService,
                private socket: SocketIoService) {
    }

    ngOnInit() {
        this.getPosts();
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
                            this.addComment();
                            return this.post.isInYourLikes(post.postID);
                        }),
                    ).subscribe((value) => {
                    if (value) {
                        // todo change to working
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
                // TODO sorting not working
                this.postArray[index].PostComment = this.postArray[index].PostComment
                    .sort((a: PostComment, b: PostComment) => {
                        return a.created.valueOf() - b.created.valueOf();
                    });
            }
        });
    }

    getPostDate(date) {
        return formatDistanceToNow(new Date(date));
    }

    deletePost(postID: number) {
        // TODO add implementation
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
        console.log(this.users.userID);
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

    createComment(postID: number, i: number) {
        console.log(this.commentsForm[i]);

        this.post.createPostComment(postID, this.commentsForm[i]).subscribe(
            (post: any) => {
                const obj: PostComment = {
                    created: new Date(),
                    ownerID: post.id,
                    postID,
                    text: this.commentsForm[i],
                    user: {first_name: post.first_name, id: post.id, last_name: post.last_name}
                };
                this.commentsForm[i] = '';
                if (!this.postArray[i].PostComment) {
                    this.postArray[i].PostComment = [];
                }

                console.log(typeof new Date(obj.created).toDateString());
                console.log(typeof new Date(obj.created));

                this.postArray[i].PostComment.push(obj);
                this.postArray[i].comments++;
                console.log(this.postArray[i].PostComment);
                // this.wroteComment.emit(obj);

            }
        );
        // this.post.createPostComment(postID, this.commentsForm.value[i]).subscribe(console.log);
    }

    private addComment() {
        this.commentsForm.push();
    }
}
