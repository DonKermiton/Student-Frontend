import {Component, OnInit} from '@angular/core';
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
    chatUsers: UserSocket;

    usersSub: Subscription;
    commentText: string;
    hideChat = false;
    loggedUser: User;
    faAngleDoubleDown = faAngleDoubleDown;

    constructor(public socket: SocketIoService,
                private user: UsersService) {

    }

    ngOnInit(): void {
        console.log('socket', this.user.getSocketToken);

        this.socket.getPrivyMessage().subscribe((msg: any) => {
            if (!this.chatUsers.socketMessage) {
                this.chatUsers.socketMessage = [];
            }
            this.chatUsers.socketMessage.push(msg);
        });
        this.socket.getSocketID().subscribe((token: any) => {
            console.log(token);
            this.user.setSocketToken = token.socket;
            this.socket.UsersActive = token.users;
            // this.UsersActive = user;
            // this.usersSub.unsubscribe();
        });

        this.socket.userStatusChangeActive().subscribe(user => {
            this.socket.UsersActive.push(user);
        });
        this.socket.usersStatusChangeInactive().subscribe(index => {
            this.socket.UsersActive.splice(index, 1);
        });
    }

    openMessageBox(user: UserSocket) {
        this.chatUsers = user;
    }

    closeChat() {
        console.log('close');
        this.chatUsers = null;
    }

    sendMessage() {
        this.socket.sendPrivyMessage(this.chatUsers, this.commentText);
    }


}
