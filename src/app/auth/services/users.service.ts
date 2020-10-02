import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  User = new BehaviorSubject<User>(null);
  userID: number;

  constructor(private http: HttpClient) {
  }

  getUserInfo(id: string): void {
    this.http.get<User>(`users/profile/${id}`).pipe((
      tap((user: User) => {
        this.User.next(user);
        this.userID = user.id;
      })),
    switchMap(() => this.getUserPhoto( 0, this.userID)),
    switchMap(() => this.getUserPhoto( 1, this.userID))
    ).subscribe();
  }

  getUserPhoto(background: number, userID: number): Observable<any> {
    return this.http.get(`photo/getUserProfilePhoto/:background/:userID`, {responseType: 'text'});
  }
}
