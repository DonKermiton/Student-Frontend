import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socketio.service';
import {User} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap} from 'rxjs/operators';

import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    chatUsers: User[] = [];

    usersSub: Subscription;
    commentText: string;
    yourID: number = null;

    faEllipsisV = faEllipsisV;
    constructor(public socket: SocketIoService,
                private user: UsersService
               ) {

    }

    ngOnInit(): void {
        this.user.getUserID().subscribe((number) => {
            this.yourID = number;
        });
        this.socket.getSocketID()
            .pipe(
                mergeMap((token) => {
                    this.socket.activeUsers = token;
                    // console.log(this.socket.activeUsers);
                    this.user.setSocketToken = token.socket;

                    return this.user.getAllProfile();
                }))
            .subscribe((user) => {
                // todo change
                this.socket.users.User = user;

                for (const userSocket of this.socket.activeUsers.users.User) {
                    for (const userActive of this.socket.users.User) {
                        if (userSocket.User.id === userActive.id) {
                            console.log(userSocket.socketID);
                            userActive.socketID = userSocket.socketID;
                            break;
                        }
                    }
                }

                console.log(this.socket.users);
            });

        this.socket.userStatusChangeActive();
        this.socket.usersStatusChangeInactive();

        this.socket.getPrivyMessage().subscribe((msg: any) => {
            console.log(msg);
            // // const from: UserSocket = this.socket.UsersActive.find(e => e.socketID === msg.from);
            //
            // const isAlreadyOpen = this.chatUsers.findIndex(e => e.User.id === from.User.id);
            //
            // if (isAlreadyOpen === -1) {
            //     if (!from.socketMessage) {
            //         from.socketMessage = [];
            //     }
            //     from.socketMessage.push({text: msg.message, date: new Date()});
            //     console.log(from);
            //     this.chatUsers.push(from);
            // }


            // console.log(this.chatUsers);
        });
    }

    openMessageBox(user: User) {
        // FIXME
        console.log(window.innerWidth);
        const isInArray = this.chatUsers.findIndex(e => e.id === user.id);
        if (isInArray !== -1) {
            this.chatUsers.splice(isInArray, 1);
            this.chatUsers.unshift(user);
            return;
        }

        if (window.innerWidth / 500 > this.chatUsers.length) {
            this.chatUsers.push(user);
        }
        console.log('test', user.socketID);
    }


    closeChatEvent($event: number) {

        console.log($event);
        this.chatUsers.splice($event, 1);

        // this.chatUsers = this.chatUsers.splice($event, 1);
        // this.ref.detectChanges();
        // console.log(this.chatUsers);
    }
}
