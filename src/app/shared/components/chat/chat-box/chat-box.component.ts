import {Component, Input, OnInit} from '@angular/core';
import {UserSocket} from '../../../models/user.model';
import {SocketIoService} from '../../../services/socketio.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {

  @Input() chatUsers: UserSocket;
  hideChat = false;
  commentText: string;
  constructor(private socket: SocketIoService) { }

  ngOnInit(): void {
  }

  closeChat() {
    console.log('close');
    this.chatUsers = null;
  }

  sendMessage() {
    this.socket.sendPrivyMessage(this.chatUsers, this.commentText);
  }
}
