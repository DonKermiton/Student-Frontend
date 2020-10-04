import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenResponse, UserPayLoad} from '../models/user.model';
import {Observable} from 'rxjs';
import {UsersService} from './users.service';
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: string;

    constructor(private http: HttpClient,
                private router: Router,
                private user: UsersService) {
    }

    public autoLogin() {
        this.getToken();
        this.handleLogin();

    }

    public login(user: UserPayLoad): Observable<any> {
        const base = this.http.post('/users/login', user, {responseType: 'json'});

        return base.pipe(
            tap((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token);
                }
                return data;
            })
        );
    }

    public getUserData(): Observable<any> {
        return this.http.get(`users/profile`, {
            headers: {Authorization: `${this.getToken()}`}
        });
    }

    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('userToken');
        }
        return this.token;
    }

    logout() {
        this.token = '';
        this.user.User.next(null);
        window.localStorage.removeItem('userToken');
        this.router.navigateByUrl('auth/login');
    }
    // todo change
    private handleLogin() {
        this.getUserData().subscribe(data => {
            console.log('login', data);
            this.user.User.next(data);
            this.user.getUserInfo(data.id);
        });
    }

    private saveToken(token: string) {
        localStorage.setItem('userToken', token);
        this.token = token;
    }


}
