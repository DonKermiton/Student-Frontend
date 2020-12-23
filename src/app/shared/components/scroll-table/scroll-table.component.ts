import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostComment, PostModel} from '../../models/post.model';
import {formatDistanceToNow} from 'date-fns';
import {PostsService} from '../../services/posts.service';
import {map, mergeMap, take} from 'rxjs/operators';
import {UsersService} from '../../../auth/services/users.service';

@Component({
    selector: 'app-scroll-table',
    templateUrl: './scroll-table.component.html',
    styleUrls: ['./scroll-table.component.scss']
})
export class ScrollTableComponent implements OnInit {


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
                private users: UsersService) {
    }

    ngOnInit() {

        switch (this.type) {

            case 'dashboard': {
                this.post.getUserPostDashboard(this.skip)
                    .pipe(
                        mergeMap((post: PostModel[]) => post),
                        map((post: PostModel) => post),
                        mergeMap((post) => {
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
                        mergeMap((post: PostModel[]) => post),
                        map((post: PostModel) => post),
                        mergeMap((post) => {

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
        // todo change to uni get post
        // this.sendMorePost.emit();
        this.skip += 5;
        this.sum += 5;
        //TODO probably concatMap
        switch (this.type) {

            case 'dashboard': {
                this.post.getUserPostDashboard(this.skip)
                    .pipe(
                        mergeMap((post: PostModel[]) => post),
                        map((post: PostModel) => post),
                        mergeMap((post) => {
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
                        mergeMap((post: PostModel[]) => post),
                        map((post: PostModel) => post),
                        mergeMap((post) => {

                            this.postArray.push(post);
                            console.log(this.postArray);
                            return this.post.countPostComments(post.postID);
                        })
                    ).subscribe();
                break;
            }
        }
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

    }

    countSelectedPostComments(id: number) {
        return null;
    }

    test() {
        console.log('test');
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
                        this.postArray.unshift(event)
                    }
                })
            )
            .subscribe()

    }
}
