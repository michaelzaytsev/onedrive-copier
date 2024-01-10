import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { catchError } from 'rxjs';
import { AppAuthService } from '../../../auth/auth.service';
import { FileExploreTableItem } from '../../../components/file-explore-table/file-explore-table.types';
import { OneDriveService } from '../../../providers/onedrive/onedrive.service';
import { OneDriveExploreTableBreadcrumbItem } from '../onedrive-explore-table-navigation/onedrive-explore-table-navigation.types';
import { OneDriveDriveType, OneDriveExploreTableItem, OneDriveExploreTableType } from './onedrive-explore-table.types';
import { createOneDriveExploreTableItem } from './onedrive-explore-table.utils';

@Component({
    selector: 'app-onedrive-explore-table',
    templateUrl: './onedrive-explore-table.component.html',
})
export class OneDriveExploreTableComponent implements OnChanges {
    OneDriveExploreTableType = OneDriveExploreTableType;

    @Input()
    driveType!: OneDriveDriveType;

    @Input()
    loading!: boolean;

    @Input()
    scrollable?: boolean;

    @Input()
    scrollHeight?: string;

    @Input()
    type!: OneDriveExploreTableType;

    @Output()
    loadingChange = new EventEmitter<boolean>();

    @Output()
    selectionChange = new EventEmitter<OneDriveExploreTableItem | OneDriveExploreTableItem[]>();

    constructor(
        private auth: AppAuthService,
        private oneDrive: OneDriveService,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['driveType'] && changes['driveType'].currentValue !== changes['driveType'].previousValue) {
            this.handleHomeClick();
        }
    }

    protected breadcrumbItems: OneDriveExploreTableBreadcrumbItem[] = [];
    protected items: OneDriveExploreTableItem[] = [];
    protected selectedItems: null | OneDriveExploreTableItem | OneDriveExploreTableItem[] =
        this.type === OneDriveExploreTableType.Source ? [] : null;

    protected handleHomeClick(): void {
        if (this.type === OneDriveExploreTableType.Target) {
            this.currentDriveItem = null;
        }
        this.readRootDriveItems();
        this.breadcrumbItems = [];
        this.resetSelection();
    }

    protected handleNavigationItemClick(item: OneDriveExploreTableBreadcrumbItem): void {
        if (this.type === OneDriveExploreTableType.Target) {
            this.currentDriveItem = this.items.find(
                ({ id, driveId }) => id === item.driveItemId && driveId === item.driveId,
            )!;
        }
        this.readDriveItemChildren(item.driveId, item.driveItemId);
        this.setBreadcrumbItem(item);
        this.resetSelection();
    }

    protected handleFolderClick(event: FileExploreTableItem): void {
        const item = event as OneDriveExploreTableItem;
        if (this.type === OneDriveExploreTableType.Target) {
            this.currentDriveItem = item;
        }
        this.readDriveItemChildren(item.driveId, item.id);
        this.addBreadcrumItem(item);
        this.resetSelection();
    }

    protected handleSelectionChange(itemOrItems: null | FileExploreTableItem | FileExploreTableItem[]): void {
        if (itemOrItems) {
            this.selectionChange.emit(itemOrItems as OneDriveExploreTableItem | OneDriveExploreTableItem[]);
        } else if (this.currentDriveItem) {
            this.selectionChange.emit(this.currentDriveItem);
        } else {
            this.selectionChange.emit();
        }
    }

    // Nullable value means that the root directory is current.
    private currentDriveItem: OneDriveExploreTableItem | null = null;

    private readRootDriveItems(): void {
        this.loadingChange.emit(true);
        this.auth
            .getAccessToken$()
            .pipe(
                catchError((error, caught) => {
                    this.loadingChange.emit(false);
                    return caught;
                }),
            )
            .subscribe(accessToken => {
                if (this.driveType === OneDriveDriveType.Root) {
                    this.oneDrive.readRootDriveItems(accessToken).subscribe(response => {
                        this.items = response.value.map(item => createOneDriveExploreTableItem(item));
                        this.loadingChange.emit(false);
                    });
                } else if (this.driveType === OneDriveDriveType.SharedWithMe) {
                    this.oneDrive.readSharedWithMeDriveItems(accessToken).subscribe(response => {
                        this.items = response.value.map(item => createOneDriveExploreTableItem(item.remoteItem));
                        this.loadingChange.emit(false);
                    });
                } else {
                    this.loadingChange.emit(false);
                    throw new Error(`Unexpected drive type: ${this.driveType}`);
                }
            });
    }

    private readDriveItemChildren(driveId: string, driveItemId: string): void {
        this.loadingChange.emit(true);
        this.auth
            .getAccessToken$()
            .pipe(
                catchError((error, caught) => {
                    this.loadingChange.emit(false);
                    return caught;
                }),
            )
            .subscribe(accessToken => {
                this.oneDrive.readDriveItemChildren(driveId, driveItemId, accessToken).subscribe(response => {
                    this.items = response.value.map(item => createOneDriveExploreTableItem(item));
                    this.loadingChange.emit(false);
                });
            });
    }

    private addBreadcrumItem(item: OneDriveExploreTableItem): void {
        this.breadcrumbItems = [
            ...this.breadcrumbItems,
            {
                driveId: item.driveId,
                driveItemId: item.id,
                driveItemName: item.name,
            },
        ];
    }

    private setBreadcrumbItem(item: OneDriveExploreTableBreadcrumbItem): void {
        const breadcrumbItemIndex = this.breadcrumbItems.findIndex(
            ({ driveId, driveItemId }) => driveId === item.driveId && driveItemId === item.driveItemId,
        );
        if (breadcrumbItemIndex >= 0) {
            const breadcrumbItems = [...this.breadcrumbItems];
            breadcrumbItems.splice(breadcrumbItemIndex + 1, this.breadcrumbItems.length - breadcrumbItemIndex - 1);
            this.breadcrumbItems = breadcrumbItems;
        }
    }

    private resetSelection(): void {
        setTimeout(() => {
            this.selectedItems = this.type === OneDriveExploreTableType.Source ? [] : null;
            this.handleSelectionChange(this.selectedItems);
        }, 0);
    }
}
