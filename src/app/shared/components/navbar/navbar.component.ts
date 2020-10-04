import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../auth/models/user.model';
import {UsersService} from "../../../auth/services/users.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userData: User;
  @Output() hideMenu = new EventEmitter<void>();


  constructor(public users: UsersService,
              public auth: AuthService) {
  }

  ngOnInit() {

  }

  emitHide() {
    this.hideMenu.emit();
  }

}
