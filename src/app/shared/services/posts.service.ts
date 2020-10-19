import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    getUserPost(id: number, skip: number) {
        return this.http.get(`/posts/userPost?id=${id}&skip=${skip}`,  { responseType: 'json'} );
    }

}
