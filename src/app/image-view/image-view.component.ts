import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PhotoService} from '../shared/services/photo.service';
import {tap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {NavigationService} from '../shared/services/navigation.service';
import {photoModel} from '../core/models/photo.model';
import {fromEvent} from 'rxjs';



@Component({
    selector: 'app-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {

    isCollection = false;

    fullScreenEvent = false;
    imgLink: string;

    photoCollection: photoModel[];
    showButtons = false;
    timer;

    constructor(private route: ActivatedRoute,
                private photo: PhotoService,
                private router: Router,
                private location: Location,
                public navigationService: NavigationService) {
    }

    ngOnInit() {
        this.handleTimeout();
        fromEvent(document, 'mousemove').subscribe(() => {
            this.showButtons = true;
            this.handleTimeout();
        });
        fromEvent(document, 'touchstart').subscribe(() => {
            this.showButtons = true;
            this.handleTimeout();
        });


        this.route.queryParams
            .pipe(
                tap((params: Params) => {
                    this.imgLink = params.id;
                }),
            )
            .subscribe();
    }

    backToPreviousPage() {
        if (this.navigationService.getPreviousUrl() === '/') {
            this.router.navigate(['dashboard']);
        } else {
            this.location.back();
        }
    }

    findPhotoInCollection() {
        return this.photoCollection.findIndex(e => e.imgLink === this.imgLink)
    }

    previousPhotoInCollection() {
        this.imgLink = this.photoCollection[this.findPhotoInCollection() - 1].imgLink;
    }

    nextPhotoInCollection() {
        this.imgLink = this.photoCollection[this.findPhotoInCollection() + 1].imgLink;
    }

    handlePhotoCollection($event: photoModel[]) {
        this.photoCollection = $event;
        if (this.photoCollection.length > 1) {
            this.isCollection = true;
        }
    }

    private handleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.showButtons = false;
        }, 1300);
    }
}
