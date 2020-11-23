import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {photoModel} from '../../core/models/photo.model';

@Injectable({
    providedIn: 'root',
})

export class UsersService {
    User = new ReplaySubject<User>();
    userID: number;

    constructor(private http: HttpClient) {
    }

    getUserInfo(id: string): void {
        this.http.get<User>(`/api/users/profile/${id}`, {responseType: 'json'}).pipe((
                tap((user: User) => {
                    this.User.next(user);
                    this.userID = user.id;
                })),
            switchMap(() => this.getUserFrontProfile(this.userID)),
            switchMap(() => this.getUserBackProfile(this.userID)),
        ).subscribe();
    }

    getUserFrontProfile(id: number) {
        return this.http.get(`/api/photo/getUserProfile/Front/${id}`, {responseType: 'text'});
    }

    getUserBackProfile(id: number) {
        return this.http.get(`/api/photo/getUserProfile/Back/${id}`, {responseType: 'text'});
    }

    uploadPhoto(form, postID: 0) {
        const formData = new FormData();
        formData.append('file', form);

        return this.http.put('/api/photo/upload', formData,
            {
                responseType: 'text',
                headers: new HttpHeaders({
                    Authorization: localStorage.getItem('userToken'),
                    postID: String(postID)
                })
            });
    }

    countUserPhotos(id: number) {
        return this.http.get(`/api/photo/countUserPhoto/${id}`).pipe(
            map(data => data)
        );
    }

    getPhotoCollection(limit: number = 6, id: number = 5): Observable<photoModel[]> {
        return this.http.get<photoModel[]>(`/api/photo/getPhotoCollectionInfo/${limit}/${id}`).pipe(
            map((photo: photoModel[]) => {
                return photo;
            })
        );
    }

    getPhotoByUrl(id: number, url: string) {
        return this.http.get(`/api/photo/getSelectedPhoto/${id}/${url}`, {responseType: 'text'});
    }

    getUser() {
        return this.User.asObservable().pipe(take(1));
    }

    getSelectedUser(id: number): Observable<User> {
        return this.http.get<User>(`/api/users/profile/${id}`);
    }


}
