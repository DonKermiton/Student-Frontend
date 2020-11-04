import {AfterViewChecked, Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
    selector: '[appShowMoreOptions]'
})
export class ShowMoreOptionsDirective implements AfterViewChecked {

    constructor(private el: ElementRef) {}

    ngAfterViewChecked() {
        if (this.el.nativeElement.firstChild.classList.contains('text-info')) {
            // this.el.nativeElement.lastChild.style.height = 'auto'
        }
    }

    @HostListener('click') onClick() {
        const isActive = this.el.nativeElement.lastChild.style.height.replace(/\D/g, '');
        console.log(isActive == '');
        this.el.nativeElement.lastChild.style.height = isActive == '0' || isActive == '' ?
            this.el.nativeElement.lastChild.children[0].clientHeight * this.el.nativeElement.lastChild.children.length + 'px' : '0vh';

    }


}
