import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.scss']
})
export class CommentsViewComponent implements OnInit {

  postComments = [];

  constructor() { }

  ngOnInit() {
    for(let i = 0; i < 100; i++) {
      this.postComments.push(i);
    }
  }

}
