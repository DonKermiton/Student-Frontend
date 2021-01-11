import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socketio.service';
import {User, UserSocket, UsersSocket} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    chatUsers: UserSocket[] = [];
    users: UsersSocket = {User: [], socketMessage: []}

    usersSub: Subscription;
    commentText: string;
    yourID: number = null;

    constructor(public socket: SocketIoService,
                private user: UsersService,
                private ref: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        this.user.getUserID().subscribe((number) => {
            this.yourID = number;
        });
        this.socket.getSocketID()
            .pipe(
                mergeMap((token: any) => {
                    console.log(token);
                    this.user.setSocketToken = token.socket;
                    this.socket.UsersActive = token.users.User;

                    return this.user.getAllProfile();
                }))
            .subscribe((user) => {
                // todo change
                this.users.User = user;
                console.log(this.users.User);
                for (let i = 0; i < this.socket.UsersActive.length; i++) {
                    for (let j = 0; j < this.users.User.length; j++) {
                        if(this.socket.UsersActive[i].User.id === this.users.User[j].id) {
                            this.users.User[j].socketID = this.socket.UsersActive[i].socketID;
                            break;
                        }
                    }
                }

                console.log(this.users);

            });

        this.socket.userStatusChangeActive().subscribe(user => {
            console.log('active user changed', user);
            this.socket.UsersActive.push(user);
        });
        this.socket.usersStatusChangeInactive().subscribe(index => {
            console.log('user inactive changed', index);
            this.socket.UsersActive = this.socket.UsersActive.splice(index, 1);
            console.log(this.socket.UsersActive);
        });

        this.socket.getPrivyMessage().subscribe((msg: any) => {
            console.log(msg);
            const from: UserSocket = this.socket.UsersActive.find(e => e.socketID === msg.from);

            const isAlreadyOpen = this.chatUsers.findIndex(e => e.User.id === from.User.id);

            if (isAlreadyOpen === -1) {
                if (!from.socketMessage) {
                    from.socketMessage = [];
                }
                from.socketMessage.push({text: msg.message, date: new Date()});
                console.log(from);
                this.chatUsers.push(from);
            }


            // console.log(this.chatUsers);
        });
    }

    openMessageBox(user: any) {
        // this.chatUsers.push(user);
        console.log(this.chatUsers);
    }


    closeChatEvent($event: number) {
        this.chatUsers = this.chatUsers.splice($event, 1);
        this.ref.detectChanges();
        console.log(this.chatUsers);
    }
}
