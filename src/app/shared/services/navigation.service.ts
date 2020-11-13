import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private previousUrl: string;
    private currentUrl: string;

    constructor(private router: Router) {
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log(event.url);
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
            }
        });
    }

    public getPreviousUrl() {
        return this.previousUrl;
    }

}
