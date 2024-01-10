import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppAuthService } from '../../../auth/auth.service';
import { OneDriveService } from '../../../providers/onedrive/onedrive.service';
import { OneDriveDriveType, OneDriveExploreTableItem } from '../onedrive-explore-table/onedrive-explore-table.types';
import { AddTaskDialogBodyComponent } from './add-task-dialog-body.component';
import { AddTaskDialogFooterComponent } from './add-task-dialog-footer.component';
import { AddTaskDialogServiceOnAdd } from './add-task-dialog.types';

@Injectable()
export class AddTaskDialogService {
    constructor(
        private auth: AppAuthService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private oneDrive: OneDriveService,
    ) {}

    open({ onAdd }: { onAdd: AddTaskDialogServiceOnAdd }): void {
        this.ref = this.dialogService.open(AddTaskDialogBodyComponent, {
            header: this.dialogTitle,
            width: '90vw',
            contentStyle: { overflow: 'auto' },
            templates: {
                footer: AddTaskDialogFooterComponent,
            },
            data: {
                onSourceSelected: this.handleSourceSelected.bind(this),
                onTargetSelected: this.handleTargetSelected.bind(this),
                onAdd: () => this.handleAdd.call(this, { onAdd }),
            },
        });
    }

    close(): void {
        if (this.ref) {
            this.ref.close();
        }
    }

    private dialogTitle = 'Add a task';
    private ref?: DynamicDialogRef;

    private sourceItems?: OneDriveExploreTableItem[];
    private targetDriveType?: OneDriveDriveType;
    private targetItem?: OneDriveExploreTableItem;

    private handleSourceSelected(items: OneDriveExploreTableItem[]): void {
        this.sourceItems = items;
    }

    private handleTargetSelected(driveType: OneDriveDriveType, item: OneDriveExploreTableItem): void {
        this.targetDriveType = driveType;
        this.targetItem = item;
    }

    private handleAdd({ onAdd }: { onAdd: AddTaskDialogServiceOnAdd }): void {
        if (!this.sourceItems?.length) {
            this.showWarnMessage('Source files are not selected.');
        } else if (!this.targetItem && this.targetDriveType === OneDriveDriveType.SharedWithMe) {
            this.showWarnMessage('A destination folder is not choosen.');
        } else if (this.targetItem) {
            onAdd({
                sourceItems: this.sourceItems,
                targetItem: this.targetItem,
            });
            this.close();
        } else {
            this.auth.getAccessToken$().subscribe(accessToken => {
                this.oneDrive.readRootDrive(accessToken).subscribe(response => {
                    onAdd({
                        sourceItems: this.sourceItems!,
                        targetDrive: response,
                    });
                    this.close();
                });
            });
        }
    }

    private showWarnMessage(detail: string): void {
        this.messageService.add({
            severity: 'warn',
            summary: this.dialogTitle,
            detail,
        });
    }
}
