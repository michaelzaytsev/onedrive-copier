import { Component, HostListener } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PRIMENG_BREAKPOINT_XL_MIN } from '../../../primeng/primeng.consts';
import {
    OneDriveDriveType,
    OneDriveExploreTableItem,
    OneDriveExploreTableType,
} from '../onedrive-explore-table/onedrive-explore-table.types';
import {
    DIALOG_CONTENT_PADDINGS,
    DIALOG_FOOTER_HEIGHT,
    DIALOG_HEADER_HEIGHT,
    DIALOG_HEIGHT_RATE,
    TABLE_BREADCRUMB_HEIGHT,
    TABLE_TITLE_HEIGHT,
} from './add-task-dialog.consts';

@Component({
    selector: 'app-add-task-dialog-body',
    templateUrl: './add-task-dialog-body.component.html',
    styles: ':host { display: flex; }',
})
export class AddTaskDialogBodyComponent {
    OneDriveExploreTableType = OneDriveExploreTableType;

    constructor(private config: DynamicDialogConfig) {
        this.onSourceSelected = this.config.data.onSourceSelected;
        this.onTargetSelected = this.config.data.onTargetSelected;
        this.updateTableScrollHeight();
    }

    @HostListener('window:resize')
    onResize(): void {
        this.updateTableScrollHeight();
    }

    protected tableScrollHeight?: string;

    protected sourceDriveType = OneDriveDriveType.SharedWithMe;
    protected targetDriveType = OneDriveDriveType.Root;

    protected sourceTableLoading = false;
    protected targetTableLoading = false;

    protected handleSourceDriveTypeChange(driveType: OneDriveDriveType): void {
        this.sourceDriveType = driveType;
        this.targetDriveType = this.getOppositeDriveType(driveType);
    }

    protected handleTargetDriveTypeChange(driveType: OneDriveDriveType): void {
        this.targetDriveType = driveType;
        this.sourceDriveType = this.getOppositeDriveType(driveType);
    }

    protected handleSourceTableLoadingChange(loading: boolean): void {
        setTimeout(() => {
            this.sourceTableLoading = loading;
        }, 0);
    }

    protected handleTargetTableLoadingChange(loading: boolean): void {
        setTimeout(() => {
            this.targetTableLoading = loading;
        }, 0);
    }

    protected handleSourceTableSelectionChange(items: OneDriveExploreTableItem | OneDriveExploreTableItem[]): void {
        this.onSourceSelected(items as OneDriveExploreTableItem[]);
    }

    protected handleTargetTableSelectionChange(
        item: null | OneDriveExploreTableItem | OneDriveExploreTableItem[],
    ): void {
        this.onTargetSelected(this.targetDriveType, item as null | OneDriveExploreTableItem);
    }

    private onSourceSelected: (items: OneDriveExploreTableItem[]) => void;
    private onTargetSelected: (driveType: OneDriveDriveType, item: null | OneDriveExploreTableItem) => void;

    private getOppositeDriveType(driveType: OneDriveDriveType): OneDriveDriveType {
        return driveType === OneDriveDriveType.Root ? OneDriveDriveType.SharedWithMe : OneDriveDriveType.Root;
    }

    private updateTableScrollHeight(): void {
        const scrollHeight =
            window.innerWidth >= PRIMENG_BREAKPOINT_XL_MIN
                ? DIALOG_HEIGHT_RATE * window.innerHeight -
                  DIALOG_HEADER_HEIGHT -
                  DIALOG_FOOTER_HEIGHT -
                  DIALOG_CONTENT_PADDINGS -
                  TABLE_TITLE_HEIGHT -
                  TABLE_BREADCRUMB_HEIGHT
                : (DIALOG_HEIGHT_RATE * window.innerHeight -
                      DIALOG_HEADER_HEIGHT -
                      DIALOG_FOOTER_HEIGHT -
                      DIALOG_CONTENT_PADDINGS -
                      2 * TABLE_TITLE_HEIGHT -
                      2 * TABLE_BREADCRUMB_HEIGHT) /
                  2;
        this.tableScrollHeight = `${scrollHeight}px`;
    }
}
