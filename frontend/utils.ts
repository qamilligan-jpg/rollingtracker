import { Task, EnrichedTask } from './types';

// Date Helpers
export const getTodayStr = (): string => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

export const getMonday = (dateStr: string): string => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split('T')[0];
};

export const addDays = (dateStr: string, days: number): string => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const diffDays = (dateStr1: string, dateStr2: string): number => {
  const d1 = new Date(dateStr1);
  const d2 = new Date(dateStr2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isOverdue = (deadline: string, status: string): boolean => {
  if (status === 'Completed' || !deadline) return false;
  return deadline < getTodayStr();
};

// Data Enrichment
export const enrichTask = (task: Task): EnrichedTask => {
  let metDeadline: 'Yes' | 'No' | '' = '';
  const today = getTodayStr();

  if (task.status === 'Completed') {
    metDeadline = (task.taskCompleted && task.deadline && task.taskCompleted <= task.deadline) ? 'Yes' : 'No';
  } else if (task.deadline && task.deadline < today) {
    metDeadline = 'No';
  }

  const weekStart = task.taskAdded ? getMonday(task.taskAdded) : '';

  return {
    ...task,
    metDeadline,
    weekStart
  };
};

export const enrichTasks = (tasks: Task[]): EnrichedTask[] => {
  return tasks.map(enrichTask);
};
