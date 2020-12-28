import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostComment, PostModel} from '../../models/post.model';
import {formatDistanceToNow} from 'date-fns';
import {PostsService} from '../../services/posts.service';
import {concatMap, map, mergeMap, take} from 'rxjs/operators';
import {UsersService} from '../../../auth/services/users.service';
import {SocketIoService} from '../../services/socketio.service';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faShareSquare } from '@fortawesome/free-regular-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



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

    @Input() postArray: PostModel[] = [];
    @Input() id: number;
    @Input() type: string;

    // infinite scroll variables
    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;

    postNumber = 0;

    postComments: PostComment[] = [];
    modalOpen = false;

    skip = 0;
    sum = 0;

    constructor(private post: PostsService,
                public users: UsersService,
                private socket: SocketIoService) {
    }

    ngOnInit() {
        this.getPosts();
    }ng

    getPosts() {
        this.socket.getPosts().subscribe(data => {
            this.postArray.unshift(data);
        })
        switch (this.type) {
            case 'dashboard': {
                this.post.getUserPostDashboard(this.skip)
                    .pipe(
                        concatMap((post: PostModel[]) => post),
                        map((post: PostModel) => post),
                        concatMap((post) => {
                            this.postArray.push(post);
                            console.log(this.postArray);
                            return this.post.countPostComments(post.postID);
                        })
                    ).subscribe();

                break;
            }

            case 'profile': {
                this.post.getUserPost(this.id, this.skip)
                    .pipe(
                        concatMap((post: PostModel[]) => post),
                        map((post: PostModel) => post),
                        concatMap((post) => {

                            this.postArray.push(post);
                            console.log(this.postArray);
                            return this.post.countPostComments(post.postID);
                        })
                    ).subscribe();
                break;
            }
        }
    }

    onScrollDown() {
        this.skip += 5;
        this.sum += 5;
        this.getPosts();
    }

    getPostComment(postID: number, last: number) {
        this.post.getPostComment(postID, last).subscribe((postComments: PostComment) => {
            if (postComments) {
                this.postComments.push(postComments);
                console.log(this.postComments);
            }
        })
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
                        }
                        this.socket.sendPost(event);
                        this.postArray.unshift(event)
                    }
                })
            )
            .subscribe()

    }
}
