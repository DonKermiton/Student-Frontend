import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../auth/services/users.service';
import {ActivatedRoute, Params} from '@angular/router';
import {map} from 'rxjs/operators';
import {User} from '../../auth/models/user.model';

@Component({
  selector: 'app-spy-profile',
  templateUrl: './spy-profile.component.html',
  styleUrls: ['./spy-profile.component.scss']
})
export class SpyProfileComponent implements OnInit {
  userInfo: User;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private user: UsersService) {
  }

  ngOnInit() {
/*    this.route.params.pipe(
      map((params: Params) => {
        return params.id;
      })
    ).subscribe((id: string) => {
      this.usersService.getUserInfo(id).subscribe((users: User) => {
        this.userInfo = users;
      }, error => alert(error.error.text));
    });*/


  }

}
