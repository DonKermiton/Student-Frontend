import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../auth/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userData: User;
  @Output() hideMenu = new EventEmitter<void>();


  constructor(
    public auth: AuthService
  ) {
  }

  ngOnInit() {
  /*  this.auth.User.subscribe((user: User) => {
      this.userData = user;
    });*/

  }

  emitHide() {
    this.hideMenu.emit();
  }

}
