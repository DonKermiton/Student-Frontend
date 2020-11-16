import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/services/auth.service';
import {NavigationService} from './shared/services/navigation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'studentApp';

  constructor(auth: AuthService,
              navigationService: NavigationService) {

  }

  ngOnInit() {
  }
}
