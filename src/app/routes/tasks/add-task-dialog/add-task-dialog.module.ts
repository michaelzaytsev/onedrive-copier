import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { OneDriveDriveTypeSelectModule } from '../onedrive-drive-type-select/onedrive-drive-type-select.module';
import { OneDriveExploreTableModule } from '../onedrive-explore-table/onedrive-explore-table.module';
import { AddTaskDialogBodyComponent } from './add-task-dialog-body.component';
import { AddTaskDialogFooterComponent } from './add-task-dialog-footer.component';
import { AddTaskDialogService } from './add-task-dialog.service';

@NgModule({
    imports: [
        ButtonModule,
        DynamicDialogModule,
        OneDriveDriveTypeSelectModule,
        OneDriveExploreTableModule,
        SelectButtonModule,
    ],
    declarations: [AddTaskDialogBodyComponent, AddTaskDialogFooterComponent],
    providers: [AddTaskDialogService, DialogService],
})
export class AddTaskDialogModule {}
