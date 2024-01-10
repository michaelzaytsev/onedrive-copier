import { NgModule } from '@angular/core';
import { FileExploreTableModule } from '../../../components/file-explore-table/file-explore-table.module';
import { OneDriveModule } from '../../../providers/onedrive/onedrive.module';
import { OneDriveExploreTableNavigationModule } from '../onedrive-explore-table-navigation/onedrive-explore-table-navigation.module';
import { OneDriveExploreTableComponent } from './onedrive-explore-table.component';

@NgModule({
    imports: [FileExploreTableModule, OneDriveExploreTableNavigationModule, OneDriveModule],
    declarations: [OneDriveExploreTableComponent],
    exports: [OneDriveExploreTableComponent],
})
export class OneDriveExploreTableModule {}
