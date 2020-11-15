import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Navigation, NavigationEnd, NavigationStart, Params, Router} from '@angular/router';
import {PhotoService} from '../shared/services/photo.service';
import {filter, mergeMap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {NavigationService} from '../shared/services/navigation.service';

@Component({
    selector: 'app-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

    fullScreenEvent = false;
    imgLink: string;


    constructor(private route: ActivatedRoute,
                private photo: PhotoService,
                private router: Router,
                private location: Location,
                public navigationService: NavigationService) {
    }

    ngOnInit() {
        this.route.queryParams
            .pipe(
                mergeMap((params: Params) => {
                    this.imgLink = params.id;
                    return this.photo.getPhoto(params.id)
                }),
            )
            .subscribe(console.log)
    }

    backToPreviousPage() {
       if(this.navigationService.getPreviousUrl() === '/') {
           this.router.navigate(['dashboard']);
       } else {
           this.location.back();
       }
    }
}
