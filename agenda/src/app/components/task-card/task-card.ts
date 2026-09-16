import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCardComponent {

  @Input() task!: Task;

  @Output() edit = new EventEmitter<Task>();

  @Output() delete = new EventEmitter<number>();

  @Output() toggle = new EventEmitter<number>();

  get priorityLabel(): string {
    const labels = {
      baixa: 'Baixa',
      media: 'Média',
      alta: 'Alta'
    };

    return labels[this.task.priority];
  }

  get isOverdue(): boolean {
    if (this.task.completed) {
      return false;
    }

    return new Date(this.task.dueDate) < new Date();
  }
}