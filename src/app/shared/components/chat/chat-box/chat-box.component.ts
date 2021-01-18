import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user.model';
import {SocketIoService} from '../../../services/socketio.service';
import {Subscription} from 'rxjs';
import {UsersService} from '../../../../auth/services/users.service';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit, OnDestroy {

    @Input() chatUsers: User;
    @Input() yourId: number;
    @Input() chatIndex: number = null;
    @Output() emitClose = new EventEmitter<number>();
    hideChat = false;
    exitChat = false;
    commentText: string;
    privyMsg: Subscription;

    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;

    constructor(private socket: SocketIoService,
                private user: UsersService) {

    }

    ngOnInit(): void {
        this.privyMsg = this.socket.getPrivyMessage().subscribe((msg: any) => {
            // if (!this.chatUsers.socketMessage) {
            //     this.chatUsers.socketMessage = [];
            // }

            // if (this.chatUsers.socketID === msg.from) {
            //     console.log(this.chatUsers);
            //     this.chatUsers.socketMessage.push({text: msg.message, date: new Date()});
            // }

        });
    }

    closeChat() {
        this.exitChat = !this.exitChat;
        setTimeout(() => {
            this.emitClose.emit(this.chatIndex);

            if (this.privyMsg) {
                this.privyMsg.unsubscribe();
            }
            console.log('close');
        }, 200);


    }

    sendMessage() {
        // this.socket.sendPrivyMessage(this.user.getSocketToken, this.chatUsers.socketID, this.commentText);
    }

    ngOnDestroy(): void {
        console.log('destruktor');
        this.emitClose.emit(this.chatIndex);

        if (this.privyMsg) {
            this.privyMsg.unsubscribe();
        }
    }

    onUp() {
        console.log('test');
    }
}
