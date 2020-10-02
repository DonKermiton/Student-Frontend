import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../auth/services/users.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  constructor(public auth: UsersService,
              public users: UsersService) {
  }

  ngOnInit() {
    // this.users.getUserPhoto().subscribe();
  }

}
