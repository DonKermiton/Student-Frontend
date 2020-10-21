import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appShowComments]'
})
export class ShowCommentsDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click') onMouseClick() {
    console.log(this.el.nativeElement)
  }

}
