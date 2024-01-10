import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileExploreTableItem, FileExploreTableItemType } from './file-explore-table.types';

@Component({
    selector: 'app-file-explore-table',
    templateUrl: './file-explore-table.component.html',
})
export class FileExploreTableComponent {
    FileExploreTableItemType = FileExploreTableItemType;

    @Input()
    loading!: boolean;

    @Input()
    items!: FileExploreTableItem[];

    @Input()
    scrollable?: boolean;

    @Input()
    scrollHeight?: string;

    @Input()
    selection!: null | FileExploreTableItem | FileExploreTableItem[];

    @Input()
    selectionMode!: 'multiple' | 'single';

    @Output()
    folderClick = new EventEmitter<FileExploreTableItem>();

    @Output()
    selectionChange = new EventEmitter<null | FileExploreTableItem | FileExploreTableItem[]>();

    protected handleFolderClick(item: FileExploreTableItem): void {
        this.folderClick.emit(item);
    }

    protected handleSelectionChange(itemOrItems: null | FileExploreTableItem | FileExploreTableItem[]): void {
        this.selectionChange.emit(itemOrItems);
    }
}
