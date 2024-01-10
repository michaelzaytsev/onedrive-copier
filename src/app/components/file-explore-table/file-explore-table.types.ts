export interface FileExploreTableItem {
    id: string;
    type: FileExploreTableItemType;
    name: string;
    size: number;
    modifiedAt: Date;
}

export enum FileExploreTableItemType {
    File = 'File',
    Folder = 'Folder',
}
