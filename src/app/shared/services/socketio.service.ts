import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, of} from "rxjs";
import {PostModel} from "../models/post.model";


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket;
  readonly url = 'http://localhost:3000'

  constructor() {
    this.socket = io.io(this.url);
  }

  getPosts():Observable<PostModel> {
    return Observable.create(observer => {
      this.socket.on('message-broadcast', msg => {
        observer.next(msg);
      })
    })
  }

  sendPost(message: object) {
    this.socket.emit('message', message);
  }


}
