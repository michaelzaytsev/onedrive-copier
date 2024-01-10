import { Component } from '@angular/core';
import { Task, TasksService } from '../tasks.service';

@Component({
    selector: 'app-tasks-table',
    templateUrl: './tasks-table.component.html',
})
export class TasksTableComponent {
    constructor(public tasksService: TasksService) {
        this.tasksService.tasks$.subscribe(tasks => void (this.tasks = tasks));
    }

    protected tasks: Task[] = [];
}
