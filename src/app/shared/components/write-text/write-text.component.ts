import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {fromEvent} from 'rxjs';

@Component({
    selector: 'app-write-text',
    templateUrl: './write-text.component.html',
    styleUrls: ['./write-text.component.scss']
})
export class WriteTextComponent implements OnInit {

    @Output() emitCloseModal = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit() {
        fromEvent(document, 'keyup').subscribe(event => {
            console.log(event);
        })
    }

    hideModal() {
        this.emitCloseModal.emit();
    }
}
