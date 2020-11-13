import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {NotifierService} from 'angular-notifier';
import {mergeMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private auth: AuthService,
              private notifier: NotifierService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  login() {

    this.auth.login(this.loginForm.value)
      .pipe(
        tap((data) => {
          console.log(data);
          this.notifier.notify(
            'success',
            'Logged',
            'THAT_NOTIFICATION_ID'
          );
        }, error => {
          this.notifier.notify(
            'error',
            error.error.text,
            'error_login'
          );
        }),
        mergeMap(user => this.auth.getUserData())
      )
      .subscribe(((data: User) => {
        this.auth.autoLogin();
        this.router.navigateByUrl('dashboard').then(
          () => {
            this.notifier.notify(
              'success',
              'Forwarding',
              'Forwarding'
            );
          }
        );
      }));
  }

  private initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
