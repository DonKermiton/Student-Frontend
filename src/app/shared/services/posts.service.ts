import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    getUserPost(id: number, skip: number) {
        return this.http.get(`/api/posts/userPost?id=${id}&skip=${skip}`, {responseType: 'json'});
    }

    getUserPostNumber(id: number) {
        return this.http.get(`/api/posts/userPost/Count?id=${id}`, {responseType: 'text'});
    }

    createPost() {

    }

    deletePost(id: number) {
        return this.http.delete(`/api/posts/userPost?id=${id}`, {headers: {Authorization: localStorage.getItem('userToken')}});
    }

    getPostComment(postID: number, take: number) {
        return this.http.get(`/api/posts/userPost/Comment?postID=${postID}&skip=${take}`, {responseType: 'json'});
    }

}
