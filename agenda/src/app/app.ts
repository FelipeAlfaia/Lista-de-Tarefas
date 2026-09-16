import { Component } from '@angular/core';

import { Task } from './models/task.model';

import { TaskService } from './services/task.service';

import {
  TaskFilter,
  TaskFiltersComponent
} from './components/task-filters/task-filters';

import { TaskSummaryComponent } from './components/task-summary/task-summary';

import { TaskFormComponent } from './components/task-form/task-form';

import { TaskCardComponent } from './components/task-card/task-card';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    TaskSummaryComponent,
    TaskFiltersComponent,
    TaskFormComponent,
    TaskCardComponent
  ],

  templateUrl: './app.html',

  styleUrl: './app.scss'
})
export class App {

  tasks: Task[] = [];

  filteredTasks: Task[] = [];

  showForm = false;

  editingTask: Task | null = null;

  filters: TaskFilter = {
    status: 'todas',
    category: 'todas',
    priority: 'todas',
    sort: 'recentes'
  };

  constructor(
    private taskService: TaskService
  ) {

    this.taskService.tasks$.subscribe(tasks => {

      this.tasks = tasks;

      this.applyFilters();

    });

  }

  openNewTask(): void {

    this.editingTask = null;

    this.showForm = true;

  }

  openEditTask(task: Task): void {

    this.editingTask = task;

    this.showForm = true;

  }

  closeForm(): void {

    this.showForm = false;

    this.editingTask = null;

  }

  saveTask(data: Omit<Task, 'id'>): void {

    if (this.editingTask) {

      this.taskService.updateTask({
        ...this.editingTask,
        ...data
      });

    } else {

      this.taskService.addTask(data);

    }

    this.closeForm();

  }

  deleteTask(id: number): void {

    this.taskService.deleteTask(id);

  }

  toggleTask(id: number): void {

    this.taskService.toggleTask(id);

  }

  updateFilters(filters: TaskFilter): void {

    this.filters = filters;

    this.applyFilters();

  }

  applyFilters(): void {

    let result = [...this.tasks];

    if (this.filters.status === 'pendentes') {

      result = result.filter(task => !task.completed);

    }

    if (this.filters.status === 'concluidas') {

      result = result.filter(task => task.completed);

    }

    if (this.filters.category !== 'todas') {

      result = result.filter(
        task => task.category === this.filters.category
      );

    }

    if (this.filters.priority !== 'todas') {

      result = result.filter(
        task => task.priority === this.filters.priority
      );

    }

    if (this.filters.sort === 'prazo') {

      result.sort(
        (a, b) =>
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
      );

    }

    if (this.filters.sort === 'prioridade') {

      const priorityOrder = {
        alta: 1,
        media: 2,
        baixa: 3
      };

      result.sort(
        (a, b) =>
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
      );

    }

    this.filteredTasks = result;

  }
}