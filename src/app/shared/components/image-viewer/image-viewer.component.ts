import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  showMenu = false;
  @ViewChild('actions', {static: false}) menuActions = ElementRef;
  constructor() { }

  ngOnInit() {
    document.addEventListener('touchstart', () => {
      this.showMenu = !this.showMenu;
    });
  }

}
