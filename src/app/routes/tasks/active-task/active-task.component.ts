import { Component } from '@angular/core';
import { Task, TasksService } from '../tasks.service';

@Component({
    selector: 'app-active-task',
    templateUrl: './active-task.component.html',
})
export class ActiveTaskComponent {
    constructor(private tasksService: TasksService) {
        this.tasksService.activeTask$.subscribe(task => void (this.task = task));
    }

    protected task: Task | null = null;
}
