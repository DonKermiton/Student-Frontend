import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[appDragAndUpload]'
})
export class DragAndUploadDirective {

    @Output() emitPhoto = new EventEmitter<any>();

    @HostBinding('class.fileover') fileover: boolean

    constructor() {
    }

    @HostListener('dragover', ['$event']) onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        console.log('drag over');
    }

    @HostListener('dragleave', ['$event']) onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        console.log('drag leave');
    }

    @HostListener('drop', ['$event']) onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        this.fileover = true;

        const files = evt.dataTransfer.files;
        if(files.length) {
            this.emitPhoto.emit(files);
        }

    }


}
