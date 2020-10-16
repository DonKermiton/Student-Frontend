import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {map, switchMap, tap} from 'rxjs/operators';
import {photoModel} from "../../core/models/photo.model";
import {PhotoService} from '../../shared/services/photo.service';

@Injectable({
    providedIn: 'root',
})

export class UsersService {
    User = new BehaviorSubject<User>(null);
    userID: number;

    constructor(private http: HttpClient) {
    }

    getUserInfo(id: string): void {
        this.http.get<User>(`users/profile/${id}`, {responseType: 'json'}).pipe((
                tap((user: User) => {
                    this.User.next(user);
                    this.userID = user.id;
                })),
            switchMap(() => this.getUserFrontProfile(this.userID)),
            switchMap(() => this.getUserBackProfile(this.userID)),
        ).subscribe(console.log);
    }

    getUserFrontProfile(id: number) {
        return this.http.get(`/photo/getUserProfile/Front/${id}`, {responseType: 'text'})
    }

    getUserBackProfile(id: number) {
        return this.http.get(`/photo/getUserProfile/Back/${id}`, {responseType: 'text'})
    }

    uploadPhoto(form) {
        let formData = new FormData();
        formData.append('file', form)

        this.http.put('photo/upload', formData,
            {
                responseType: 'text',
                headers: {Authorization: localStorage.getItem('userToken')}
            })
            .subscribe(console.log);
    }

    countUserPhotos(id: number) {
        return this.http.get(`photo/countUserPhoto/${id}`).pipe(
            map(data => data)
        );
    }

    getPhotoCollection(limit: number = 6, id: number = 5): Observable<photoModel[]> {
        return this.http.get<photoModel[]>(`photo/getPhotoCollectionInfo/${limit}/${id}`).pipe(
            map((photo: photoModel[]) => {
                return photo;
            })
        )
    }

    getPhotoByUrl(id: number, url: string){
        return this.http.get(`/photo/getSelectedPhoto/${id}/${url}`, {responseType: "text"})
    }

    getUser() {
        return this.User.asObservable();
    }

    getSelectedUser(id: number): Observable<User> {
        return this.http.get<User>(`/users/profile/${id}`);
    }


}
