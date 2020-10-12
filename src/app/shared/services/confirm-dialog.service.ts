import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService implements OnInit{
    confirmSubject = new BehaviorSubject<boolean>(null)

    ngOnInit(): void {

    }

    getConfirmStream() {
      return this.confirmSubject.asObservable();
    }



}
