import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {getDaysInMonth} from "date-fns";

@Component({
    selector: 'app-small-event-callendar',
    templateUrl: './small-event-callendar.component.html',
    styleUrls: ['./small-event-callendar.component.scss']
})
export class SmallEventCallendarComponent implements OnInit {
    todayIs: number;

    daysArray = [];
    weekday = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
    ];
    months = ['January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'];


    year: number = null;
    month: number = null;
    actualDate = new Date();

    @ViewChild('divElement', {static: true}) showBox: ElementRef;

    constructor() {

    }

    daysInMonth(): void {
        //
        // const daysArray = [];
        // const date = new Date(this.actualDate.setMonth(this.actualDate.getMonth() + 1));
        //
        // console.log();
        this.daysArray = [];
        for (let i = 0; i < new Date(this.actualDate.getFullYear(), this.actualDate.getMonth(), 1).getDay() - 1; i++) {
            this.daysArray.push(0);
            // console.log(firstDay)
            // if(weekday[i] == firstDay)
        }

        for (let i = 0; i < getDaysInMonth(this.actualDate); i++) {
            console.log(new Date(this.year, this.month, i).getDay())
            this.daysArray.push(new Date(this.year, this.month, i + 1));
        }


    }

    detectChange(isUp: boolean) {
        if (isUp && this.month == 11) {
            this.year++;
            this.month = 0;
        } else if (!isUp && this.month == 0) {
            this.year--;
            this.month = 11;
        } else if (isUp) {
            this.month++;
        } else if (!isUp) {
            this.month--;
        }

        this.actualDate = new Date(this.year, this.month, 1);
        this.daysInMonth();
    }

    ngOnInit(): void {
        this.year = this.actualDate.getFullYear();
        this.month = this.actualDate.getMonth();
        this.daysInMonth();
        setTimeout(() => {
             document.querySelectorAll('.day-item').forEach(el => {
                 // el.addEventListener("mouseover", (e) => {
                 //     // @ts-ignore
                 //     console.log(e.target.offsetTop);
                 //     console.log(this.showBox.nativeElement.offsetTop = e.target.offsetTop)
                 //     // this.showBox.nativeElement.style.top = e.taet.offsetTop;
                 // })
             });

        },1);

    }


    dateClick(day: Date) {
        alert(day);
    }
}
