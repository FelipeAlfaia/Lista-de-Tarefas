import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly storageKey = 'lista_tarefas';

  private tasksSubject = new BehaviorSubject<Task[]>(
    this.loadTasks()
  );

  tasks$ = this.tasksSubject.asObservable();

  private loadTasks(): Task[] {
  const saved = localStorage.getItem(this.storageKey);

  if (saved) {
    return JSON.parse(saved);
  }

  return [];
}

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(tasks)
    );

    this.tasksSubject.next(tasks);
  }

  getTasks(): Task[] {
    return this.tasksSubject.value;
  }

  addTask(task: Omit<Task, 'id'>): void {
    const tasks = this.getTasks();

    const newTask: Task = {
      ...task,
      id: Date.now()
    };

    this.saveTasks([...tasks, newTask]);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks().map(task =>
      task.id === updatedTask.id
        ? updatedTask
        : task
    );

    this.saveTasks(tasks);
  }

  deleteTask(id: number): void {
    const tasks = this.getTasks().filter(
      task => task.id !== id
    );

    this.saveTasks(tasks);
  }

  toggleTask(id: number): void {
    const tasks = this.getTasks().map(task =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed
          }
        : task
    );

    this.saveTasks(tasks);
  }
}
