import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {ConfirmDialogService} from "../../services/confirm-dialog.service";


@Component({
    selector: 'app-confirm-action',
    templateUrl: './confirm-action.component.html',
    styleUrls: ['./confirm-action.component.scss']
})
export class ConfirmActionComponent implements OnInit, OnDestroy {
    @Output() closeModalEmitter = new EventEmitter<void>();
    @Input() messageBox: string;
    timer= 0;
    modalTimerHandler: Subscription;

    constructor(private confirmService: ConfirmDialogService) {
    }

    ngOnInit() {
        this.modalTimerHandler = interval(1000)
            .subscribe((number) => {
                this.timer = number;
                if(number >= 20) this.handleCloseModal()
            })
    }

    ngOnDestroy(): void {
        this.modalTimerHandler.unsubscribe();
    }


    emitResponse(confirmAction: boolean) {
        this.confirmService.confirmSubject.next(confirmAction);
    }

    closeModal() {
        this.closeModalEmitter.emit();
    }

    private handleCloseModal() {
        this.modalTimerHandler.unsubscribe();
        this.closeModal();
    }
}
