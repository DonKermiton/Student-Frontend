import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-upload-post',
  templateUrl: './upload-post.component.html',
  styleUrls: ['./upload-post.component.scss']
})
export class UploadPostComponent implements OnInit {

  constructor(private post: PostsService) { }

  ngOnInit() {
  }

  hideModal() {
  }

  createPost() {

  }
}
