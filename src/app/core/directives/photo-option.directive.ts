import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[appPhotoOption]'
})
export class PhotoOptionDirective {
    width: boolean;


    constructor(private el: ElementRef) {
        this.width = window.innerWidth >= 1024;
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.el.nativeElement.children[1].style.display = 'block';
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.width)
            this.el.nativeElement.children[1].style.display = 'none';
        // if (this.el.nativeElement.children[1].classList.contains('show'))
        // console.log(this.el.nativeElement.children[1].classList.remove('show'))

    }

}
