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
    chatUsers: UserSocket[] = [];

    usersSub: Subscription;
    commentText: string;
    yourID: number = null;

    constructor(public socket: SocketIoService,
                private user: UsersService) {

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
            this.socket.UsersActive.push(user);
        });
        this.socket.usersStatusChangeInactive().subscribe(index => {
            this.socket.UsersActive.splice(index, 1);
        });
    }

    openMessageBox(user: UserSocket) {
        this.chatUsers.push(user);
    }




}
