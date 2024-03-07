import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../tasks.types';

@Component({
    selector: 'app-tasks-table',
    templateUrl: './tasks-table.component.html',
})
export class TasksTableComponent {
    constructor(public tasksService: TasksService) {
        this.tasksService.tasks$.subscribe(tasks => void (this.tasks = tasks));
    }

    handleRowReorder() {
        this.tasksService.setTasks(this.tasks);
    }

    protected tasks: Task[] = [];
}
