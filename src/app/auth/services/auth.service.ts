import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenResponse, User, UserPayLoad} from '../models/user.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {UsersService} from './users.service';

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
    this.getUserData().subscribe(data => {
      console.log(data);
      this.user.User.next(data);
    });
  }

  public login(user: UserPayLoad): Observable<any> {
    const base = this.http.post('/users/login', user);

    return base.pipe(
      map((data: TokenResponse) => {
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

  public tokenAsObservable(): Observable<string> {
    if (!this.token) {
      this.token = localStorage.getItem('userToken');
    }
    return of(this.token);
  }

  logout() {
    this.token = '';
    this.user.User.next(null);
    window.localStorage.removeItem('userToken');
    this.router.navigateByUrl('auth/login');
  }

  private saveToken(token: string) {
    localStorage.setItem('userToken', token);
    this.token = token;
  }


}
