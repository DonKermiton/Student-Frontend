import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable, of} from "rxjs";
import {PostModel} from "../models/post.model";
import {take} from 'rxjs/operators';
import {UserSocket} from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
    readonly url = 'http://localhost:3000'
    private socket;

    constructor() {
        this.socket = io.io(this.url);
    }

    getPosts(): Observable<PostModel> {
        return Observable.create(observer => {
            this.socket.on('connection-broadcast', msg => {
                console.log(msg);
                observer.next(msg);
            });
        });
    }

    getUserID(): Observable<UserSocket[]> {
        return Observable.create(observer => {
            this.socket.on('user-connected', msg => {
                observer.next(msg);
            })
        }).pipe(
            take(1)
        )
    }

    sendPost(message: object) {
        return this.socket.emit('message', message);
    }

    userConnected(data) {
        return this.socket.emit('user-connect', data);
    }

    createMessage(senderIndex: number, receiveIndex: number, msg: string) {
        return this.socket.emit('create-message', {senderIndex, receiveIndex, msg})
    }


}
