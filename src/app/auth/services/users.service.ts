import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {map, switchMap, tap} from 'rxjs/operators';
import {photoModel} from "../../core/models/photo.model";

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
            switchMap(() => this.getUserPhoto(1, this.userID)),
            switchMap(() => this.getUserPhoto(0, this.userID)),
        ).subscribe(console.log);
    }

    getUserPhoto(background: number, userID: number): Observable<any> {
        return this.http.get(`photo/getUserProfilePhoto/${background}/${userID}`, {responseType: 'text'});
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


}
