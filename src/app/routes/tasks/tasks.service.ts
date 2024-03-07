import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveTask, Task, TaskStatus } from './tasks.types';

const TASKS_STORAGE_KEY = 'odc-tasks';

@Injectable()
export class TasksService {
    readonly activeTask$ = new BehaviorSubject<ActiveTask | null>(null);
    readonly tasks$ = new BehaviorSubject<Task[]>([]);

    constructor() {
        this.loadTasks();
        // this.activeTask$.next(null);
        // this.tasks$.next([]);
        // this.saveTasks();
    }

    addTask(task: Task): void {
        if (this.activeTask$.getValue()) {
            const tasks = this.tasks$.getValue();
            tasks.push(task);
            this.tasks$.next(tasks);
        } else {
            this.activeTask$.next(this.makeTaskActive(task));
        }
        this.saveTasks();
    }

    setTasks(tasks: Task[]): void {
        this.tasks$.next(tasks);
        this.saveTasks();
    }

    setActiveTask(task: ActiveTask): void {
        this.activeTask$.next(task);
        this.saveTasks();
    }

    unsetActiveTaskAndReleaseNextOneIfExists(): void {
        const tasks = this.tasks$.getValue();
        if (tasks.length) {
            const [task] = tasks.splice(0, 1);
            this.tasks$.next(tasks);
            this.activeTask$.next(this.makeTaskActive(task));
        } else {
            this.activeTask$.next(null);
        }
        this.saveTasks();
    }

    private makeTaskActive(task: Task): ActiveTask {
        return {
            ...task,
            status: TaskStatus.Active,
            activeSourceItemIndex: -1,
            startedAtMs: Date.now(),
        };
    }

    private loadTasks(): void {
        const tasks = this.readTasks();
        let activeTaskIndex = tasks.findIndex(task => task.status === TaskStatus.Active);
        if (activeTaskIndex >= 0) {
            this.activeTask$.next(tasks[activeTaskIndex] as ActiveTask);
            tasks.splice(activeTaskIndex, 1);
        }
        this.tasks$.next(tasks);
    }

    private saveTasks(): void {
        const tasks = [...this.tasks$.getValue()];
        const activeTask = this.activeTask$.getValue();
        if (activeTask) {
            tasks.unshift(activeTask);
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
