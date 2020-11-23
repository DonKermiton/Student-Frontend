import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap, tap} from 'rxjs/operators';
import {StorageService} from '../../../shared/services/filestorage.service';

@Component({
    selector: 'app-view-files',
    templateUrl: './view-files.component.html',
    styleUrls: ['./view-files.component.scss']
})
export class ViewFilesComponent implements OnInit {
    occupiedSpace: number;
    activeUrl = '';
    selectedFile = '';
    selectedFilePath = '';
    fileArray = [];

    constructor(private user: UsersService,
                private storage: StorageService) {
    }

    ngOnInit() {
        this.user.getUser()
            .pipe(
                mergeMap((user) => {
                    this.activeUrl = `${user.id}`;
                    return this.storage.getOccupiedSpace()
                }),
                mergeMap((space) => {
                    this.occupiedSpace = space;
                    return this.storage.getSelectedUrl(this.activeUrl)
                }),
                tap((files: []) => {
                    this.fileArray = files;
                    console.log(this.fileArray)
                })
            )
            .subscribe()
    }

    clickHandler(name: string, isDir: boolean) {
        if (isDir) {
            this.activeUrl = this.activeUrl + `/${name}`;
            this.storage.getSelectedUrl(this.activeUrl).subscribe((data: []) => {
                this.fileArray = data;
            })
        } else {
            this.selectedFile = name;
            this.selectedFilePath = this.activeUrl;
        }

    }

    goUp() {
        this.activeUrl = this.activeUrl.substring(0, this.activeUrl.lastIndexOf("/") + 1)
        this.storage.getSelectedUrl(this.activeUrl).subscribe((data: []) => {
            this.fileArray = data;
        })
    }

    createDirectory($event: MouseEvent) {

    }

    deleteDirectory($event: MouseEvent) {
        this.storage.deleteDirectory(this.activeUrl, true, false).subscribe(console.log)

    }
}
