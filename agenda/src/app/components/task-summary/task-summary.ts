import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-summary',
  standalone: true,
  templateUrl: './task-summary.html',
  styleUrl: './task-summary.scss'
})
export class TaskSummaryComponent {

  @Input() tasks: Task[] = [];

  get total(): number {
    return this.tasks.length;
  }

  get completed(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get pending(): number {
    return this.tasks.filter(task => !task.completed).length;
  }
}