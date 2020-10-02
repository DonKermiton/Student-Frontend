import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../services/photo.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {
  userID: string;
  photoID: string;

  constructor(private photoService: PhotoService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        tap((param: Params) => {
          this.userID = param.userID;
          this.photoID = param.photoID;
        }),
        switchMap(() => this.photoService.getSelectedPhoto(this.userID, this.photoID)
        ))
      .subscribe((file) => {
        console.log('works');
      });
  }

  activeRoute() {
    this.router.navigate([''], {queryParams: {userID: 4, photoID: 2}});
  }
}
