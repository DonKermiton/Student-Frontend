import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostComment, PostModel} from '../../models/post.model';
import {formatDistanceToNow} from 'date-fns';

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


  constructor() { }

  ngOnInit() {
  }

  onScrollDown() {
    console.log('test');
    this.sendMorePost.emit();
  }

  getPostComment(postID: number, last: number ){

  }

  getPostDate(date) {
    return formatDistanceToNow(new Date(date));
  }

  deletePost(postID: number) {

  }

  countSelectedPostComments(id: number) {

  }

}
