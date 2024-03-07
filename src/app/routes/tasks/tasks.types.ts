import { OneDriveExploreTableItem } from './onedrive-explore-table/onedrive-explore-table.types';

export interface Task {
    sourceItems: OneDriveExploreTableItem[];
    targetItem: OneDriveExploreTableItem;
    status: TaskStatus;
}

export enum TaskStatus {
    Active = 'Active',
    Waiting = 'Waiting',
    Completed = 'Completed',
}

export interface ActiveTask extends Task {
    status: TaskStatus.Active;
    activeSourceItemIndex: number;
    activeSourceItemMonitorLink?: string;
    startedAtMs: number;
}
