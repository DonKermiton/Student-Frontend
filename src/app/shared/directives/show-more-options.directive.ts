import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[appShowMoreOptions]'
})
export class ShowMoreOptionsDirective {

    constructor(private el: ElementRef) {
    }

    @HostListener('click', ['$event']) onClick($event) {
        const isActive = this.el.nativeElement.lastChild.style.height == 'auto'
        if (!isActive) {
            this.el.nativeElement.lastChild.style.height = 'auto'
        } else {
            this.el.nativeElement.lastChild.style.height = '0'
        }

    }


}
