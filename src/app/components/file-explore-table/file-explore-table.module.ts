import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../../shared/shared.module';
import { FileExploreTableComponent } from './file-explore-table.component';

@NgModule({
    imports: [CommonModule, SharedModule, TableModule],
    declarations: [FileExploreTableComponent],
    exports: [FileExploreTableComponent],
})
export class FileExploreTableModule {}
