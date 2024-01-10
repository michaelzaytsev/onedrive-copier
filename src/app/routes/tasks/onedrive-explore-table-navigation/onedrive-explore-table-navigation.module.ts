import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { OneDriveExploreTableNavigationComponent } from './onedrive-explore-table-navigation.component';

@NgModule({
    imports: [ButtonModule, CommonModule, MenuModule],
    declarations: [OneDriveExploreTableNavigationComponent],
    exports: [OneDriveExploreTableNavigationComponent],
})
export class OneDriveExploreTableNavigationModule {}
