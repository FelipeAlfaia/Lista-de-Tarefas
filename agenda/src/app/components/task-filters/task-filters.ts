import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface TaskFilter {
  status: string;
  category: string;
  priority: string;
  sort: string;
}

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-filters.html',
  styleUrl: './task-filters.scss'
})
export class TaskFiltersComponent {

  @Output() filtersChange = new EventEmitter<TaskFilter>();

  filters: TaskFilter = {
    status: 'todas',
    category: 'todas',
    priority: 'todas',
    sort: 'recentes'
  };

  changeFilters(): void {
    this.filtersChange.emit(this.filters);
  }
}