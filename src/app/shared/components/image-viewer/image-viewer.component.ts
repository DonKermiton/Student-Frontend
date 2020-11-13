import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  showMenu = false;

  constructor() { }

  ngOnInit() {
    document.addEventListener('touchstart', () => {
      this.showMenu = !this.showMenu;
    });
  }

}
