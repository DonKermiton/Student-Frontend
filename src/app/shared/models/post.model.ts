import {photoModel} from '../../core/models/photo.model';

export interface PostModel {
    postID: number;
    ownerID: number;
    created: Date;
    text: string;
    group: string;
    photos: photoModel[];
    user: {
        id: number;
        first_name: string;
        last_name: string;
    };
    comments: number;
    likes: number;
    PostComment: PostComment[];
    isInYourLikes: boolean;
}

export interface PostComment {
    postID: number;
    ownerID: number;
    created: Date;
    text: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
    };
}
