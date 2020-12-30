import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {PostComment, PostModel} from '../models/post.model';
import {UsersService} from '../../auth/services/users.service';
import {NotifierService} from 'angular-notifier';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient,
                private users: UsersService,
                private notifier: NotifierService) {
    }

    getUserPost(id: number, skip: number) {
        const params = new HttpParams({
            fromObject: {
                id: `${id}`,
                skip: `${skip}`,
            }
        });
        return this.http.get(`/api/posts/userPost/selected`, {params, responseType: 'json'});
    }

    getUserPostDashboard(skip: number) {
        const params = new HttpParams({
            fromObject: {
                skip: `${skip}`,
            }
        });
        return this.http.get(`/api/posts/userPost/dashboard`, {params, responseType: 'json'});
    }

    getUserPostNumber(id: number) {
        return this.http.get(`/api/posts/userPost/Count?id=${id}`, {responseType: 'text'});
    }

    createPost(post: string) {
        const postObj = {
            text: post
        };
        return this.http.put(`/api/posts/userPost/create`, postObj, {headers: {Authorization: localStorage.getItem('userToken')}});
    }

    deletePost(id: number) {
        return this.http.delete(`/api/posts/userPost?id=${id}`, {headers: {Authorization: localStorage.getItem('userToken')}});
    }

    // get post Comments
    getPostComment(postID: number, take: number): Observable<PostComment> {
        const params = new HttpParams({
            fromObject: {
                postID: `${postID}`,
                skip: `${take}`,
            }
        });

        return this.http.get<PostComment>(`/api/posts/userPost/Comment`, {params, responseType: 'json'});
    }

    getAllPostComments(postID: number): Observable<PostComment[]> {
        const params = new HttpParams({
            fromObject: {
                postID: `${postID}`,
            }
        });

        return this.http.get<PostComment[]>(`/api/posts/userPost/Comment/all`, {params, responseType: 'json'});
    }

    createPostComment(postID: number, text: string) {
        const obj = {
            postID,
            text
        };

        return this.http.put(`/api/posts/userPost/comment/create`, obj, {
            headers: {Authorization: localStorage.getItem('userToken')},
            responseType: 'json'
        });
    }

    getSelectedPost(post: number): Observable<PostModel> {
        const params = new HttpParams({
            fromObject: {
                id: `${post}`,
            }
        });
        return this.http.get<PostModel>(`/api/posts/userPost/single`, {params, responseType: 'json'});
    }

    // count post Comments
    countPostComments(id: number): Observable<number> {
        return this.http.get<number>(`/api/posts/userPost/Comments/Count?id=${id}`);
    }

    isInYourLikes(postID: number): Observable<number> {
        return this.http.get<number>(`/api/posts/userPost/Like/your?id=${postID}`);
    }

    sendLike(postID: number) {
        return this.http.put(`/api/posts/userPost/like?id=${postID}`, {}, {headers: {Authorization: localStorage.getItem('userToken')}});
    }

    deleteLike(postID: number) {
        return this.http.delete(`/api/posts/userPost/like?id=${postID}`, {headers: {Authorization: localStorage.getItem('userToken')}});
    }


}
