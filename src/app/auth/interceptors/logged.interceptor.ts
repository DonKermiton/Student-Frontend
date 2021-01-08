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
        let authReq;

        if (!localStorage.getItem('userToken')) {
            authReq = req.clone();
            return next.handle(authReq)
        }

         authReq = req.clone({
            headers: req.headers.set('Authorization', localStorage.getItem('userToken'))
        });

        return next.handle(authReq)
    }
}
