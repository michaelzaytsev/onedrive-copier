import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TasksTableComponent } from './tasks-table.component';

@NgModule({
    imports: [TableModule],
    declarations: [TasksTableComponent],
    exports: [TasksTableComponent],
})
export class TasksTableModule {}
