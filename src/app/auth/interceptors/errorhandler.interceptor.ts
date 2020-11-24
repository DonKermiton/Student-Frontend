import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';

@Injectable()
export class ErrorhandlerInterceptor implements HttpInterceptor {
    constructor(private notifier: NotifierService,
                private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {


                } else {
                    if (error.status === 403) {
                        this.notifier.notify(
                            'error',
                            error.error,
                            'error.403'
                        );
                    }
                    if (error.status === 406) {
                        this.notifier.notify(
                            'error',
                            error.error,
                            'error.406'
                        );
                    }

                }
                return throwError(error);
            })
        );


    }
}
