import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  constructor(private http: HttpClient) {
  }

  getSelectedPhoto(userID: string, photoID: string) {
    return this.http.get(`/photo/getPhoto/${userID}/${photoID}`, {responseType: 'text'});
  }


}
