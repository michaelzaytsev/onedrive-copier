export interface OneDriveChildrenResponse<TDriveItem> {
    value: TDriveItem[];
}

export interface OneDriveSharedDriveItem extends OneDriveBaseItem {
    remoteItem: OneDriveDriveItem;
}

export interface OneDriveDriveItem extends OneDriveBaseItem {
    file?: OneDriveFile;
    folder?: OneDriveFolder;
    lastModifiedDateTime: string;
    size: number;
}

interface OneDriveBaseItem {
    id: string;
    name: string;
    parentReference: OneDriveParentReference;
}

interface OneDriveParentReference {
    driveId: string;
}

interface OneDriveFile {}

interface OneDriveFolder {}

export interface OneDriveDriveItemCopyProgress {
    percentageComplete: number;
    status: OneDriveDriveItemCopyProgressStatus;
    statusDescription: string;
}

export enum OneDriveDriveItemCopyProgressStatus {
    NotStarted = 'notStarted',
    InProgress = 'inProgress',
    Completed = 'completed',
}
