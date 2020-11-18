import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {PostComment} from '../../models/post.model';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  @Output() emitCloseModal = new EventEmitter<void>();
  @Output() wroteComment = new EventEmitter<PostComment>();
  @Input() postID: string;

  @ViewChild('areaElement', {static: false}) textField: ElementRef;
  constructor(private post: PostsService) { }

  ngOnInit() {

  }

  closeModal() {
      this.emitCloseModal.emit();
  }

  createComment() {

    this.post.createPostComment(this.postID, this.textField.nativeElement.value).subscribe(
        (post:any) => {
          const obj:PostComment = {
            created: new Date(),
            ownerID: post.id,
            postID: +this.postID,
            text: this.textField.nativeElement.value,
            user: {first_name: post.first_name, id: post.id, last_name: post.last_name}
          }
          this.wroteComment.emit(obj);

        }

    )
  }
}
