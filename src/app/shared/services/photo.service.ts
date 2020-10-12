import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {photoModel} from "../../core/models/photo.model";
import {AuthService} from "../../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})

export class PhotoService {

    constructor(private http: HttpClient,
                private auth: AuthService) {
    }

    getSelectedPhoto(userID: string, photoID: string) {
        return this.http.get(`/photo/getPhoto/${userID}/${photoID}`, {responseType: 'text'});
    }

    deleteSelectedPhoto(id: number, png: photoModel,) {
        return this.http.delete(`/photo/delete/${png.imgLink}/${id}`, {
            headers: {Authorization: `${this.auth.getToken()}`}
        })
    }


}
