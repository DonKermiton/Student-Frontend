import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {ConfirmDialogService} from "../../services/confirm-dialog.service";


@Component({
    selector: 'app-confirm-action',
    templateUrl: './confirm-action.component.html',
    styleUrls: ['./confirm-action.component.scss']
})
export class ConfirmActionComponent implements OnInit, OnDestroy, AfterViewInit {
    @Output() closeModalEmitter = new EventEmitter<void>();
    timer = 0;
    modalTimerHandler: Subscription;
    @ViewChild('wrapper', {static: true}) wrapper: ElementRef;
    @ViewChild('infobox', {static: true}) infobox: ElementRef;


    constructor(private confirmService: ConfirmDialogService) {
    }

    ngOnInit() {

        this.modalTimerHandler = interval(1000)
            .subscribe((number) => {
                this.timer = number;
                if (number >= 20) this.handleCloseModal(false)
            })
    }

    ngOnDestroy(): void {
        this.modalTimerHandler.unsubscribe();
        this.confirmService.confirmSubject.next(false);
    }


    emitResponse(confirmAction: boolean) {
        console.log(confirmAction);
        this.confirmService.confirmSubject.next(confirmAction);

        this.closeModal();
    }

    closeModal() {
        this.closeModalEmitter.emit();
    }

    handleCloseModal(value: boolean) {
        this.wrapper.nativeElement.classList.remove('active');
        this.infobox.nativeElement.classList.remove('active');

        setTimeout(() => {
            this.emitResponse(value);
            this.modalTimerHandler.unsubscribe();
            this.closeModal();
        }, 350);


    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.wrapper.nativeElement.classList.add('active');
            this.infobox.nativeElement.classList.add('active');
        }, 1)
    }

}
