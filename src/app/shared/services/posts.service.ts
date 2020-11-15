import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostComment} from '../models/post.model';
import {map, tap} from 'rxjs/operators';
import {UsersService} from "../../auth/services/users.service";
import {photoModel} from "../../core/models/photo.model";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient,
                private users: UsersService) {
    }

    getUserPost(id: number, skip: number) {
        const params = new HttpParams({
            fromObject: {
                id: `${id}`,
                skip: `${skip}`,
            }
        });
        return this.http.get(`/api/posts/userPost`, {params, responseType: 'json'});
    }

    getUserPostNumber(id: number) {
        return this.http.get(`/api/posts/userPost/Count?id=${id}`, {responseType: 'text'});
    }

    createPost(post: string) {
        const postObj = {
            text: post
        }
        return this.http.put(`/api/posts/userPost/create`, postObj, {headers: {Authorization: localStorage.getItem('userToken')}})
    }

    deletePost(id: number) {
        return this.http.delete(`/api/posts/userPost?id=${id}`, {headers: {Authorization: localStorage.getItem('userToken')}});
    }

    getPostComment(postID: number, take: number): Observable<PostComment> {
        const params = new HttpParams({
            fromObject: {
                postID: `${postID}`,
                skip: `${take}`,
            }
        });

        return this.http.get<PostComment>(`/api/posts/userPost/Comment`, {params, responseType: 'json'});
    }

    countPostComments(id: number) {
        console.log(id);
        return this.http.get(`/api/posts/userPost/Comments/Count?id=${id}`);
    }

    countPostLikes(id: number) {
        return this.http.get(`/api/posts/userPost/likes/count?id=${id}`);
    }
}
