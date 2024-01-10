import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-task-dialog-footer',
    templateUrl: './add-task-dialog-footer.component.html',
})
export class AddTaskDialogFooterComponent {
    constructor(
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig,
    ) {
        this.onAdd = this.config.data.onAdd;
    }

    protected handleCancel(): void {
        if (this.ref) {
            this.ref.close();
        }
    }

    protected handleAdd(): void {
        this.onAdd();
    }

    private onAdd: () => void;
}
