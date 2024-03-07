import { Component, OnDestroy } from '@angular/core';
import { AddTaskDialogService } from './add-task-dialog/add-task-dialog.service';
import { TasksService } from './tasks.service';
import { Task } from './tasks.types';

@Component({
    selector: 'app-tasks-route',
    templateUrl: './tasks.component.html',
})
export class TasksRouteComponent implements OnDestroy {
    constructor(
        private addTaskDialogService: AddTaskDialogService,
        private tasksService: TasksService,
    ) {}

    ngOnDestroy(): void {
        this.addTaskDialogService.close();
    }

    protected handleAddTaskClick(): void {
        this.addTaskDialogService.open({ onAdd: this.handleTaskAdd.bind(this) });
    }

    private handleTaskAdd(task: Task): void {
        this.tasksService.addTask(task);
    }
}
