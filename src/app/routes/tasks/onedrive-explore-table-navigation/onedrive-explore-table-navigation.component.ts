import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OneDriveExploreTableBreadcrumbItem } from './onedrive-explore-table-navigation.types';

@Component({
    selector: 'app-onedrive-explore-table-navigation',
    templateUrl: './onedrive-explore-table-navigation.component.html',
})
export class OneDriveExploreTableNavigationComponent implements OnChanges {
    @Input()
    disabled?: boolean;

    @Input()
    items!: OneDriveExploreTableBreadcrumbItem[];

    @Output()
    homeClick = new EventEmitter<void>();

    @Output()
    itemClick = new EventEmitter<OneDriveExploreTableBreadcrumbItem>();

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['items'] && changes['items'].currentValue.lenght !== changes['items'].previousValue?.length) {
            const items = changes['items'].currentValue as OneDriveExploreTableBreadcrumbItem[];
            this.currentItem = items.length ? items[items.length - 1] : undefined;
            this.menuItems = items
                .filter((an, index, items) => index < items.length - 1)
                .map(item => ({
                    label: item.driveItemName,
                    command: () => this.handleMenuItemClick(item),
                }));
        }
    }

    protected currentItem?: OneDriveExploreTableBreadcrumbItem;
    protected menuItems: MenuItem[] = [];

    protected handleRefreshClick(): void {
        if (this.currentItem) {
            this.handleMenuItemClick(this.currentItem);
        } else {
            this.handleHomeClick();
        }
    }

    protected handleHomeClick(): void {
        this.homeClick.emit();
    }

    protected handleUpClick(): void {
        if (this.items.length === 1) {
            this.handleHomeClick();
        } else if (this.items.length) {
            this.handleMenuItemClick(this.items[this.items.length - 2]);
        }
    }

    private handleMenuItemClick(item: OneDriveExploreTableBreadcrumbItem): void {
        this.itemClick.emit(item);
    }
}
