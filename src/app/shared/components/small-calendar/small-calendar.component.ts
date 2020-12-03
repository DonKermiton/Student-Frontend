import {Component, OnInit} from '@angular/core';
import getMonth from 'date-fns/getMonth'

@Component({
    selector: 'app-small-calendar',
    templateUrl: './small-calendar.component.html',
    styleUrls: ['./small-calendar.component.scss']
})
export class SmallCalendarComponent implements OnInit {
    months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    day = {
        0: 'Monday',
        1: 'Tuesday',
        2: 'Wednesday',
        3: 'Thursday',
        4: 'Friday',
        5: 'Saturday',
        6: 'Sunday',

    }

    today: Date;
    month: string;
    days = [];

    constructor() {
    }

    ngOnInit() {
        this.today = new Date();
        this.month = this.months[getMonth(this.today)]

        for(let i = 0; i < this.daysInMonth(); i++) {
            this.days.push(i + 1);
        }
        console.log(this.day[this.days[0]])
    }



    daysInMonth(): number {
        return new Date(2020, getMonth(this.today), 0).getDate();
    }

}
