import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';
import {PostModel} from '../models/post.model';
import {take, tap} from 'rxjs/operators';
import {UsersSocket, UsersSocketModel} from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class SocketIoService {
    // UsersActive: UserSocket[] = [];
    activeUsers: UsersSocketModel;
    users: UsersSocket = {User: []};
    private readonly url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io.io(this.url);
    }

    get userArray() {
        return this.users.User.slice();
    }

    subscribeToPost(postID: number) {
        return this.socket.emit('subscribeToPost', postID);
    }

    emitPostEvent(event: object) {
        return this.socket.emit('post-events', event);
    }

    eventsFromPost(): Observable<any> {
        return Observable.create(observer => {
            this.socket.on('post-events', msg => {
                observer.next(msg);
            });
        });
    }

    getPosts(): Observable<PostModel> {
        return Observable.create(observer => {
            this.socket.on('connection-broadcast', msg => {
                console.log(msg);
                observer.next(msg);
            });
        });
    }

    getSocketID(): Observable<UsersSocketModel> {
        return Observable.create(observer => {
            this.socket.on('user-connected', msg => {
                observer.next(msg);
            });
        }).pipe(
            tap(console.log),
            take(1)
        );
    }

    userStatusChangeActive() {
        this.socket.on('user-status-active', msg => {
            for (const user of this.users.User) {
                console.log(user.id);
                if (user.id === msg.User.id) {
                    if (!user.socketID) {
                        user.socketID = [];
                    }
                    user.socketID.push(msg.socketID);
                    break;
                }
            }
        });

    }

    findAndRemoveUser(index) {
        let i = 0;

        for (const userSocket of this.activeUsers.users.User) {
            for (const socketID of userSocket.socketID) {
                if (socketID === index.socket) {
                    userSocket.socketID.splice(i, 1);
                    i = -1;
                    break;
                }
                i++;
            }
            if (i < 0) {
                break;
            }
            i = 0;
        }
    }

    usersStatusChangeInactive() {
        this.socket.on('user-status-inactive', index => {
            if (this.users.User[index.i]?.socketID?.length > 0) {
                if (this.users.User[index.i].socketID[index.j] === index.socket) {
                    this.users.User[index.i].socketID.splice(index.j, 1);
                } else {
                    this.findAndRemoveUser(index);
                }
            } else {
                this.findAndRemoveUser(index);
            }
            console.log(this.users.User);

        });

    }

    sendPost(message: object) {
        return this.socket.emit('message', message);
    }

    userConnected(data) {
        return this.socket.emit('user-connect', data);
    }

    createMessage(senderIndex: number, receiveIndex: number, msg: string) {
        return this.socket.emit('create-message', {senderIndex, receiveIndex, msg});
    }

    sendPrivyMessage(yourSocket: string, selectedToken: string[], message: string) {
        return this.socket.emit('send-privy-message', {yourSocket, selectedToken, message});
    }

    getPrivyMessage(): Observable<string> {
        return Observable.create(observer => {
            this.socket.on('send-privy-message', msg => {
                observer.next(msg);
            });
        });
    }


}
