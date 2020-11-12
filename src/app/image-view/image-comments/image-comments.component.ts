import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-comments',
  templateUrl: './image-comments.component.html',
  styleUrls: ['./image-comments.component.scss']
})
export class ImageCommentsComponent implements OnInit {
  postComments = [];
  showMore = false;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.postComments.push(i);
    }
  }

}
