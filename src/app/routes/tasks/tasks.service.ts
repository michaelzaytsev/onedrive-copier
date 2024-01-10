import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TASKS_STORAGE_KEY = 'odc-tasks';

@Injectable({ providedIn: 'platform' })
export class TasksService {
    readonly activeTask$ = new BehaviorSubject<Task | null>(null);
    readonly tasks$ = new BehaviorSubject<Task[]>([]);

    constructor() {
        this.loadTasks();
    }

    addTask(task: Task): void {
        if (this.activeTask$.getValue()) {
            const tasks = this.tasks$.getValue();
            tasks.push(task);
            this.tasks$.next(tasks);
        } else {
            this.activeTask$.next(task);
        }
        this.saveTasks();
    }

    private loadTasks(): void {
        const tasks = this.readTasks();
        const activeTaskIndex = tasks.findIndex(task => task.status === TaskStatus.Active);
        if (activeTaskIndex >= 0) {
            this.activeTask$.next(tasks[activeTaskIndex]);
            tasks.splice(activeTaskIndex, 1);
        }
        this.tasks$.next(tasks);
    }

    private saveTasks(): void {
        const tasks = this.tasks$.getValue();
        const activeTask = this.activeTask$.getValue();
        if (activeTask) {
            tasks.push(activeTask);
        }
        this.writeTasks(tasks);
    }

    private readTasks(): Task[] {
        const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
        return tasks ? JSON.parse(tasks) : [];
    }

    private writeTasks(tasks: Task[]): void {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }
}

export interface Task {
    status: TaskStatus;
}

enum TaskStatus {
    Active = 'Active',
    Waiting = 'Waiting',
    Completed = 'Completed',
}
