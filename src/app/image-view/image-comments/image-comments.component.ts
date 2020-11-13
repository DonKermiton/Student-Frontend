import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-comments',
  templateUrl: './image-comments.component.html',
  styleUrls: ['./image-comments.component.scss']
})
export class ImageCommentsComponent implements OnInit {
  postComments = [];
  showMore = false;

  @Input() showComments = true;

  constructor() { }

  ngOnInit() {

    for (let i = 0; i < 100; i++) {
      this.postComments.push(i);
    }
  }

}
