import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';

@Component({
    selector: 'app-write-text',
    templateUrl: './write-text.component.html',
    styleUrls: ['./write-text.component.scss']
})
export class WriteTextComponent implements OnInit {

    @Output() emitCloseModal = new EventEmitter<void>();
    @Output() emitText = new EventEmitter<string>();
    @ViewChild('inputArea', {static: false}) textarea: ElementRef;

    private keySub: Subscription;

    constructor() {
    }

    ngOnInit() {
        this.keySub = fromEvent(document, 'keyup').subscribe((event) => {
            console.log(event)
        });
    }

    emitValue() {
        this.emitText.emit(this.textarea.nativeElement.value);
    }

    hideModal() {
        this.emitCloseModal.emit();
        this.keySub.unsubscribe();
    }
}
