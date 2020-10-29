export interface PostModel {
    postID: number;
    ownerID: number;
    created: Date;
    text: string;
    group: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
    };
    comments: number;
    likes: number;

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
