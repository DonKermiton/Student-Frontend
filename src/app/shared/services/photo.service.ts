import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {photoModel} from '../../core/models/photo.model';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PostModel} from '../models/post.model';

@Injectable({
    providedIn: 'root'
})

export class PhotoService {

    constructor(private http: HttpClient,
                private auth: AuthService,
                private router: Router) {
    }

    navigateToImageInfo(imgLink) {
        this.router.navigate(['/image-view'], {queryParams: {id: imgLink}})
    }

    getSelectedPhoto(userID: string, photoID: string) {
        return this.http.get(`/api/photo/getPhoto/${userID}/${photoID}`, {responseType: 'text'});
    }

    getPhoto(imgLink: string) {
        return this.http.get(`/api/photo/getPhotoWithUser?id=${imgLink}`, {responseType: 'text'});
    }

    getPhotoCredentials(imgLink: string) {
        return this.http.get(`/api/photo/getPhotoCredentials?id=${imgLink}`);
    }


    deleteSelectedPhoto(id: number, png: photoModel) {
        return this.http.delete(`/api/photo/delete/${png.imgLink}/${id}`, {
            responseType: 'text',
            headers: {Authorization: `${this.auth.getToken()}`}
        });
    }

    selectPhotoAsFront(photoID: number) {
        return this.http.patch(`/api/photo/setImageAsFront/${photoID}`, {}, {
            responseType: 'text',
            headers: {Authorization: `${this.auth.getToken()}`}
        });
    }

    selectPhotoAsBack(photoID: number) {
        return this.http.patch(`/api/photo/setImageAsBack/${photoID}`, {}, {
            responseType: 'text',
            headers: {Authorization: `${this.auth.getToken()}`}
        });
    }

    getPostPhotoCollection(postID: number):Observable<photoModel[]> {
        const params = new HttpParams({
            fromObject: {
                postID: `${postID}`,
            }
        });

        return this.http.get<photoModel[]>(`/api/photo/post/collection`, {params})
    }


}
