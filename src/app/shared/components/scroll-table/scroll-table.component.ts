import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostComment, PostModel} from '../../models/post.model';
import {formatDistanceToNow} from 'date-fns';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-scroll-table',
  templateUrl: './scroll-table.component.html',
  styleUrls: ['./scroll-table.component.scss']
})
export class ScrollTableComponent implements OnInit {

  @Output() sendMorePost = new EventEmitter<void>();
  @Output() showComments = new EventEmitter();
  @Input() postArray: PostModel[] = [];
  @Input() id: number;


  // infinite scroll variables
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  postNumber = 0;

  postComments: PostComment[] = [];


  constructor(private post: PostsService) { }

  ngOnInit() {
  }

  onScrollDown() {
    this.sendMorePost.emit();
  }

  getPostComment(postID: number, last: number ){
    console.log(postID);
    this.post.getPostComment(postID, last).subscribe((postComments: PostComment) => {
        if(postComments) {
          this.postComments.push(postComments);
          console.log(this.postComments);
        }
    })
  }

  getPostDate(date) {
    return formatDistanceToNow(new Date(date));
  }

  deletePost(postID: number) {

  }

  countSelectedPostComments(id: number) {
    return null;
  }

  test() {
    console.log('test');
  }
}
