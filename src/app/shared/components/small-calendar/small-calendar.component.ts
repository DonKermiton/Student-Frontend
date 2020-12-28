import {Component, OnInit} from '@angular/core';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-small-calendar',
    templateUrl: './small-calendar.component.html',
    styleUrls: ['./small-calendar.component.scss']
})
export class SmallCalendarComponent implements OnInit {
    faAngleDoubleDown = faAngleDoubleDown;
    constructor() {
    }

    ngOnInit(): void {
    }



}
