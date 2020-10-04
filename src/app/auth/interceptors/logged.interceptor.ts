/*
import {Injectable} from '@angular/core';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class LoggedInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    /!*  return this.auth.tokenAsObservable().pipe(
        take(1),
        exhaustMap((token => {
          console.log(token);
          if (!token) {
            console.log('jestem');
            this.router.navigateByUrl('/auth/login');
            return next.handle(req);
          }
          const modifiedReq = req.clone({
            headers: new HttpHeaders().set('Authorization', this.auth.getToken())
          });
          return next.handle(modifiedReq);
        }))
      );*!/
/!*
    const token = this.auth.getToken() || '';
    console.log(req.url === 'auth/login' );
    console.log(token);
    console.log(req.headers);
    if (token) {
      console.log('jest token');
      this.router.navigateByUrl('/core/profile');
      return next.handle(req.clone({
        headers: new HttpHeaders().set('Authorization', token)}));
    }
    console.log('nie ma token');
    const modifiedReq = req.clone({
      headers: new HttpHeaders().set('Authorization', token)
    });
    console.log(modifiedReq);
    return next.handle(modifiedReq);*!/


  }

}
*/
