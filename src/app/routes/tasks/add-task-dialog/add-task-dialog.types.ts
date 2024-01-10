import { OneDriveDrive } from '../../../providers/onedrive/onedrive.types';
import { OneDriveExploreTableItem } from '../onedrive-explore-table/onedrive-explore-table.types';

export type AddTaskDialogServiceOnAdd = (options: {
    sourceItems: OneDriveExploreTableItem[];
    targetDrive?: OneDriveDrive;
    targetItem?: OneDriveExploreTableItem;
}) => void;
