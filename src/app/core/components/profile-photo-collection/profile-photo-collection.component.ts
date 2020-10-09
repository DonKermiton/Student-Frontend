import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../../auth/services/users.service';

@Component({
  selector: 'app-profile-photo-collection',
  templateUrl: './profile-photo-collection.component.html',
  styleUrls: ['./profile-photo-collection.component.scss']
})
export class ProfilePhotoCollectionComponent implements OnInit {

  constructor(public users: UsersService) { }

  ngOnInit() {
  }

}
