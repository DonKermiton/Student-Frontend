import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'studentApp';

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    if (this.auth.getToken()) {
        this.auth.autoLogin();
    }

  }
}
