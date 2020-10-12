import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FunctionCall} from '@angular/compiler';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss']
})
export class ConfirmActionComponent implements OnInit {
  @Output() responseEmitter = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {

  }


  emitResponse(confirmAction: boolean) {
    this.responseEmitter.emit(confirmAction);
  }
}
