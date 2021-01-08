import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenResponse, User, UserPayLoad} from '../../shared/models/user.model';
import {Observable} from 'rxjs';
import {UsersService} from './users.service';
import {map, tap} from "rxjs/operators";
import {SocketIoService} from '../../shared/services/socketio.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: string;


    constructor(private http: HttpClient,
                private router: Router,
                private user: UsersService,
                private socket: SocketIoService) {
    }

    public autoLogin() {
        this.handleLogin().subscribe();
    }




    public login(user: UserPayLoad): Observable<any> {
        console.log(user);
        const base = this.http.post('api/users/login', user, {responseType: 'json'});

        return base.pipe(
            map((data: TokenResponse) => {
                console.log(data);
                if (data.token) {
                    this.saveToken(data.token);
                }
                return data;
            }, (err) => console.log(err))
        );
    }

    public getUserData(): Observable<any> {
        return this.http.get(`/api/users/profile`, {
            responseType: 'json', headers: {Authorization: `${this.getToken()}`}
        });
    }

    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('userToken');
        }
        // if (!this.token) {
        //     this.router.navigate([''])
        // }
        return this.token;

    }

    logout() {
        this.token = '';
        this.user.User.next(null);
        localStorage.removeItem('userToken');
        this.router.navigateByUrl('auth/login');
    }

    // todo change
    public handleLogin(): Observable<User> {
        this.getToken();
        return this.getUserData()
            .pipe(
                map((data) => {
                    console.log('login', data);
                    this.user.User.next(data);
                    this.user.getUserInfo(data.id);
                    this.socket.userConnected(data);
                    return data;
                })
            )
    }

    private saveToken(token: string) {
        localStorage.setItem('userToken', token);
        this.token = token;
    }

}
