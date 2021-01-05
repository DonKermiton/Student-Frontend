import { Component, OnInit } from '@angular/core';
import {SocketIoService} from '../../services/socketio.service';
import {UserSocket} from '../../models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatUsers: UserSocket;
  UsersActive: UserSocket[];
  usersSub: Subscription;
  commentText: any;
  constructor(private socket: SocketIoService) { }

  ngOnInit(): void {
    this.usersSub = this.socket.getUserID().subscribe((user:UserSocket[]) => {
      console.log(user);
        if(!this.UsersActive) {
          this.UsersActive = [];
        }
        this.UsersActive = user;

        this.usersSub.unsubscribe();
    });
  }

  openMessageBox(user: UserSocket) {
    this.chatUsers = user;
  }
}
