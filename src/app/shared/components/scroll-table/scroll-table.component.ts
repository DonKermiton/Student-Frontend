import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../../models/post.model';
import {PostsService} from '../../services/posts.service';
import {concatMap, map, take} from 'rxjs/operators';
import {UsersService} from '../../../auth/services/users.service';
import {SocketIoService} from '../../services/socketio.service';
import {faComments} from '@fortawesome/free-regular-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'app-scroll-table',
    templateUrl: './scroll-table.component.html',
    styleUrls: ['./scroll-table.component.scss']
})
export class ScrollTableComponent implements OnInit {
    faComments = faComments;

    faSearch = faSearch;


    @Input() id: number;
    @Input() type: string;

    // infinite scroll variables
    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;
    postNumber = 0;
    modalOpen = false;

    userID: number;
    skip = 0;
    sum = 0;
    searchBox = false;

    constructor(public post: PostsService,
                public users: UsersService,
                private socket: SocketIoService) {
    }

    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        // todo change to universal usage
        this.socket.getPosts().subscribe(data => {

            this.post.postArray.unshift(data);
        });

        if (this.type !== this.post.lastLoaded) {
            this.post.postArray = [];
        }

        this.post.lastLoaded = this.type;

        switch (this.type) {
            case 'dashboard': {
                this.post.getUserPostDashboard(this.skip)
                    .pipe(
                        concatMap((post: PostModel[]) => post),
                        map((post) => {
                            this.post.postArray.push(post);
                        }),
                    ).subscribe();

                break;
            }

            case 'profile': {
                this.post.getUserPost(this.id, this.skip)
                    .pipe(
                        concatMap((post: PostModel[]) => post),
                        map((post) => {
                            this.post.postArray.push(post);
                        }),
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
                        this.post.postArray.unshift(event);
                    }
                })
            )
            .subscribe();

    }

    searchPost($event: string) {
        console.log($event);
    }
}
