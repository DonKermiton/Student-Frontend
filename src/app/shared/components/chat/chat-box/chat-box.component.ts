import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserSocket} from '../../../models/user.model';
import {SocketIoService} from '../../../services/socketio.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-chat-box',
    templateUrl: './chat-box.component.html',
    styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit, OnDestroy {

    @Input() chatUsers: UserSocket;
    @Input() yourId: number;
    hideChat = false;
    commentText: string;
    privyMsg: Subscription;
    constructor(private socket: SocketIoService) {
    }

    ngOnInit(): void {
        this.privyMsg = this.socket.getPrivyMessage().subscribe((msg: any) => {
            if (this.chatUsers.User.id === msg.msg.id) {
                console.log(msg);
                if(!this.chatUsers.socketMessage) {
                    this.chatUsers.socketMessage = [];
                }
                this.chatUsers.socketMessage.push(msg.text);
                console.log(this.chatUsers.socketMessage);
            }
            // this.chatUsers.socketMessage.push(msg);
        });
    }

    closeChat() {
        console.log('close');
        this.chatUsers = null;
    }

    sendMessage() {
        this.socket.sendPrivyMessage(this.chatUsers, this.commentText, this.yourId);
    }

    ngOnDestroy(): void {
        if(this.privyMsg) {
            this.privyMsg.unsubscribe();
        }
    }
}
