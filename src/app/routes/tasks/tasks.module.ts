import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ActiveTaskModule } from './active-task/active-task.module';
import { AddTaskDialogModule } from './add-task-dialog/add-task-dialog.module';
import { TasksRouterModule } from './tasks-router.module';
import { TasksTableModule } from './tasks-table/tasks-table.module';
import { TasksRouteComponent } from './tasks.component';
import { TasksService } from './tasks.service';

@NgModule({
    imports: [
        ActiveTaskModule,
        AddTaskDialogModule,
        ButtonModule,
        CommonModule,
        HttpClientModule,
        TasksRouterModule,
        TasksTableModule,
    ],
    declarations: [TasksRouteComponent],
    providers: [TasksService],
})
export class TasksRouteModule {}
