import { Component, OnDestroy } from '@angular/core';
import { AddTaskDialogService } from './add-task-dialog/add-task-dialog.service';
import { AddTaskDialogServiceOnAdd } from './add-task-dialog/add-task-dialog.types';

@Component({
    selector: 'app-tasks-route',
    templateUrl: './tasks.component.html',
})
export class TasksRouteComponent implements OnDestroy {
    constructor(private addTaskDialogService: AddTaskDialogService) {}

    ngOnDestroy(): void {
        this.addTaskDialogService.close();
    }

    protected handleAddTaskClick(): void {
        this.addTaskDialogService.open({ onAdd: this.handleTaskAdd.bind(this) });
    }

    private handleTaskAdd(options: Parameters<AddTaskDialogServiceOnAdd>[0]): void {
        console.log('handleTaskAdd', options);
    }
}
