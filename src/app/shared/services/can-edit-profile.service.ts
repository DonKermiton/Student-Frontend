import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CanEditProfileService {

    constructor() {
    }

   public canEditProfile(id: number, requested: number, accountType: number): boolean {
        return id === requested || accountType > 1;
    }

}
