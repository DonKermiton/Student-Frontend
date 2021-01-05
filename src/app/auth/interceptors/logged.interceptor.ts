import {Injectable} from '@angular/core';
import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {of} from "rxjs";

@Injectable()
export class LoggedInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService,
                private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
       const authReq = req.clone({
           headers: new HttpHeaders({
               Authorization: localStorage.getItem('userToken')
           })
       });

       return next.handle(authReq)
    }
}
