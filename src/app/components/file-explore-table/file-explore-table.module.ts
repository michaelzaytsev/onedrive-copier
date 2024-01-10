import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FileExploreTableComponent } from './file-explore-table.component';

@NgModule({
    imports: [CommonModule, TableModule],
    declarations: [FileExploreTableComponent],
    exports: [FileExploreTableComponent],
})
export class FileExploreTableModule {}
