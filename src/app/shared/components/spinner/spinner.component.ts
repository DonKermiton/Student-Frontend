import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: '<div class="d-flex justify-content-center">\n' +
      '  <div class="spinner-border" role="status">\n' +
      '    <span class="sr-only">Loading...</span>\n' +
      '  </div>\n' +
      '</div>',
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
