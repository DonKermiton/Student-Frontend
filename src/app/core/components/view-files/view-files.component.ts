import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../../auth/services/users.service';
import {mergeMap, tap} from 'rxjs/operators';
import {StorageService} from '../../../shared/services/filestorage.service';
import {ConfirmDialogService} from '../../../shared/services/confirm-dialog.service';
import {Subscription} from 'rxjs';
import {photoModel} from '../../models/photo.model';
import {HttpEventType} from '@angular/common/http';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';

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


    faTrash = faTrash;
    faFolderOpen = faFolderOpen;
    faFolder = faFolder;
    faFile = faFile;
    constructor(public user: UsersService,
                private storage: StorageService,
                private confirmService: ConfirmDialogService) {
    }

    ngOnInit() {
        this.user.getUser()
            .pipe(
                mergeMap((user) => {
                    this.activeUrl = `${user.id}/`;
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

    deleteDirectory(isDir: boolean) {
        this.confirmActionModal = true;
        this.confirmActionMessage = this.fileArray.length ? 'Directory is not empty. Are you Sure' : ''


        this.confirmActionSub = this.confirmService.getConfirmStream()
            .subscribe(confirm => {
                console.log(confirm);
                if (confirm == true) {
                    this.storage.deleteDirectory(isDir ? this.activeUrl : this.activeUrl + this.selectedFile, isDir, false).subscribe(() => {
                        if (isDir) {
                            this.goUp();
                        }

                    })
                } else {
                    if (this.confirmActionSub) {
                        this.confirmActionSub.unsubscribe();
                    }
                }
            });
    }

    uploadFiles($event) {
        console.log($event.name);


        this.storage.uploadFile($event, this.activeUrl).subscribe((resp) => {
            let result;

            if (resp.type === HttpEventType.Response) {
                for (const el of $event) {
                    console.log(el);
                    this.fileArray.push({name: el.name, isDir: false});
                    this.occupiedSpace += +( el.size / 1024 / 1024).toFixed(2)
                }
                result = 'Upload complete';
            }
            if (resp.type === HttpEventType.UploadProgress) {
                // console.log('Progress ' + percentDone + '%');
                result = Math.round(100 * resp.loaded / resp.total);
            }


        });
    }

    deleteFile() {

    }
}
