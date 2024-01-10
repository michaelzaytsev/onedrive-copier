import { FileExploreTableItem } from '../../../components/file-explore-table/file-explore-table.types';

export enum OneDriveDriveType {
    Root = 'Root',
    SharedWithMe = 'SharedWithMe',
}

export interface OneDriveExploreTableItem extends FileExploreTableItem {
    driveId: string;
}

export enum OneDriveExploreTableType {
    Source = 'Source',
    Target = 'Target',
}
