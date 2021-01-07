import {AfterViewChecked, Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[appShowMoreOptions]'
})
export class ShowMoreOptionsDirective implements AfterViewChecked {

    @Input() isEnabled = false;

    constructor(private el: ElementRef) {
    }

    ngAfterViewChecked() {
        if (this.el.nativeElement.firstChild.classList.contains('text-info')) {
            // this.el.nativeElement.lastChild.style.height = 'auto'
        }

        // if (this.isEnabled) {
        //     this.el.nativeElement.lastChild.style.height =
        //         this.el.nativeElement.lastChild.children[0].clientHeight * this.el.nativeElement.lastChild.children.length + 'px';
        // }
    }

    @HostListener('click') onClick() {
        const isActive = this.el.nativeElement.lastChild.style.height.replace(/\D/g, '');
        console.log(isActive == '');
        this.el.nativeElement.lastChild.style.height = isActive == '0' || isActive == '' ?
            this.el.nativeElement.lastChild.children[0].clientHeight * this.el.nativeElement.lastChild.children.length + 'px' : '0vh';

    }


}
