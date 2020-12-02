import {Component, OnInit} from '@angular/core';
import {PostModel} from '../shared/models/post.model';
import {Subscription} from 'rxjs';
import {UsersService} from '../auth/services/users.service';
import {map, mergeMap} from 'rxjs/operators';
import {PostsService} from '../shared/services/posts.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    postArray: PostModel[] = [];
    id = 5;
    skip = 0;
    sum = 100;
    postSubscription: Subscription;

    constructor(private users: UsersService,
                private posts: PostsService) {
    }

    ngOnInit() {
        this.users.getUser()
            .pipe()
            .subscribe()

        this.addPosts();
    }

    addPosts() {
        console.log('test');

        this.skip += 5;
        this.sum += 5;
        this.posts.getUserPost(5, this.skip)
            .pipe(
                mergeMap((post: PostModel[]) => post),
                map((post: PostModel) => post),
                mergeMap((post) => {

                    this.postArray.push(post);

                    return this.posts.countPostComments(post.postID);
                })
            ).subscribe();
    }
}
