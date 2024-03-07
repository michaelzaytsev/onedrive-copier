import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OneDriveExploreTableItem } from '../onedrive-explore-table/onedrive-explore-table.types';
import { Task, TaskStatus } from '../tasks.types';
import { AddTaskDialogBodyComponent } from './add-task-dialog-body.component';
import { AddTaskDialogFooterComponent } from './add-task-dialog-footer.component';

@Injectable()
export class AddTaskDialogService {
    constructor(
        private dialogService: DialogService,
        private messageService: MessageService,
    ) {}

    open({ onAdd }: { onAdd: (task: Task) => void }): void {
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
    private targetItem?: OneDriveExploreTableItem;

    private handleSourceSelected(items: OneDriveExploreTableItem[]): void {
        this.sourceItems = items;
    }

    private handleTargetSelected(item: OneDriveExploreTableItem): void {
        this.targetItem = item;
    }

    private handleAdd({ onAdd }: { onAdd: (task: Task) => void }): void {
        if (!this.sourceItems?.length) {
            this.showWarnMessage('Source files are not selected.');
        } else if (!this.targetItem) {
            this.showWarnMessage('A destination folder is not choosen.');
        } else if (this.targetItem) {
            onAdd({
                sourceItems: this.sourceItems,
                targetItem: this.targetItem,
                status: TaskStatus.Waiting,
            });
            this.close();
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
