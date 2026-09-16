export type Priority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
}