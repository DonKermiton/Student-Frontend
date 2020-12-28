import { Component, OnInit } from '@angular/core';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  faChevronCircleRight = faChevronCircleRight;
  constructor() { }

  ngOnInit() {
  }

}
