import { FileExploreTableItemType } from '../../../components/file-explore-table/file-explore-table.types';
import { OneDriveDriveItem } from '../../../providers/onedrive/onedrive.types';
import { OneDriveExploreTableItem } from './onedrive-explore-table.types';

export const createOneDriveExploreTableItem = (item: OneDriveDriveItem): OneDriveExploreTableItem => ({
    id: item.id,
    driveId: item.parentReference.driveId,
    type: item.folder ? FileExploreTableItemType.Folder : FileExploreTableItemType.File,
    name: item.name,
    size: item.size,
    modifiedAt: new Date(item.lastModifiedDateTime),
});
