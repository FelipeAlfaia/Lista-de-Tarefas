import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskFormComponent {

  @Input() editingTask: Task | null = null;

  @Output() save = new EventEmitter<Omit<Task, 'id'>>();

  @Output() cancel = new EventEmitter<void>();

  form;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['Estudos', Validators.required],
      priority: ['media', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnChanges(): void {

    if (this.editingTask) {

      this.form.patchValue({
        title: this.editingTask.title,
        description: this.editingTask.description,
        category: this.editingTask.category,
        priority: this.editingTask.priority,
        dueDate: this.editingTask.dueDate
      });

    } else {

      this.form.reset({
        title: '',
        description: '',
        category: 'Estudos',
        priority: 'media',
        dueDate: ''
      });

    }
  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.getRawValue() as Omit<Task, 'id'>);

    this.form.reset({
      title: '',
      description: '',
      category: 'Estudos',
      priority: 'media',
      dueDate: ''
    });
  }
}