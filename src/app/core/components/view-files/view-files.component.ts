import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap, tap} from 'rxjs/operators';
import {StorageService} from '../../../shared/services/filestorage.service';
import {ConfirmDialogService} from '../../../shared/services/confirm-dialog.service';
import {Subscription} from 'rxjs';
import {photoModel} from '../../models/photo.model';

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
    addDirectoryModal = false;
    hideNavBar = true;

    confirmActionModal = false;
    confirmActionMessage: string;
    confirmActionSub: Subscription;

    constructor(public user: UsersService,
                private storage: StorageService,
                private confirmService: ConfirmDialogService) {
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
                    // get folder directory
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
        // check clicked element
        if (isDir) {
            // if is directory change directory
            this.activeUrl = this.activeUrl + `/${name}`;
            this.storage.getSelectedUrl(this.activeUrl).subscribe((data: []) => {
                this.fileArray = data;
            })
        } else {
            // spy selected file on right side
            this.selectedFile = name;
            this.selectedFilePath = this.activeUrl;
        }
    }

    goUp() {
        this.activeUrl = this.activeUrl.substring(0, this.activeUrl.lastIndexOf("/") + 1);
        this.storage.getSelectedUrl(this.activeUrl).subscribe((data: []) => {
            this.fileArray = data;
        });
    }

    createDirectory($event: string) {
        $event = $event.replace('.', '').replace('/', '');
        this.storage.createDirectory(this.activeUrl + '/' + $event).subscribe(() => {
            this.fileArray.unshift({name: $event, isDir: true});
            this.addDirectoryModal = false;
        }, err => console.log(err.error));
    }

    deleteDirectory() {
        this.confirmActionModal = true;
        this.confirmActionMessage = this.fileArray.length ? 'Directory is not empty. Are you Sure' : ''


        this.confirmActionSub = this.confirmService.getConfirmStream()
            .subscribe(confirm => {
                console.log(confirm);
                if (confirm == true) {
                    this.storage.deleteDirectory(this.activeUrl, true, false).subscribe(() => {
                        this.goUp();
                    })
                } else {
                    if (this.confirmActionSub) {
                        this.confirmActionSub.unsubscribe();
                    }
                }
            });
    }

    uploadFiles($event) {
        this.storage.uploadFile($event, this.activeUrl).subscribe(console.log);
    }
}
