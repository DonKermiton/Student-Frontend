import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[appShowPostOptions]'
})
export class ShowPostOptionsDirective {

    constructor(private el: ElementRef) {
    }

    @HostListener('click') onClick() {
        this.el.nativeElement.lastChild.style.display = 'block';

    }

    @HostListener('mouseleave') onLeave() {
        this.el.nativeElement.lastChild.style.display = 'none';
        console.log('leave');
    }

}
