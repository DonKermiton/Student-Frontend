import {Component, OnInit} from '@angular/core';
import getMonth from 'date-fns/getMonth'

@Component({
    selector: 'app-small-calendar',
    templateUrl: './small-calendar.component.html',
    styleUrls: ['./small-calendar.component.scss']
})
export class SmallCalendarComponent implements OnInit {
    public minDate: Date = new Date ("05/07/2017");
    public maxDate: Date = new Date ("08/27/2017");
    public value: Date = new Date ("05/16/2017");

    constructor() {
    }

    ngOnInit(): void {
    }



}
