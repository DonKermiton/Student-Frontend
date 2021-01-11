import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SocketIoService} from '../../services/socketio.service';
import {User, UserSocket} from '../../models/user.model';
import {Subscription} from 'rxjs';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
import {UsersService} from '../../../auth/services/users.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    chatUsers: UserSocket[] = [];

    usersSub: Subscription;
    commentText: string;
    yourID: number = null;

    constructor(public socket: SocketIoService,
                private user: UsersService,
                private ref: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        console.log('socket', this.user.getSocketToken);
        this.user.getUserID().subscribe((number) => {
            this.yourID = number;
        })
        this.socket.getSocketID().subscribe((token: any) => {
            console.log(token);
            this.user.setSocketToken = token.socket;
            this.socket.UsersActive = token.users;
            // this.UsersActive = user;
            // this.usersSub.unsubscribe();
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

    openMessageBox(user: UserSocket) {
        this.chatUsers.push(user);
        console.log(this.chatUsers);
    }


    closeChatEvent($event: number) {
        this.chatUsers = this.chatUsers.splice($event, 1);
        this.ref.detectChanges();
        console.log(this.chatUsers);
    }
}
