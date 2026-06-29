export type TaskStatus = 'Not Started' | 'Pending' | 'Completed';
export type TaskPriority = '1 - High' | '2 - Medium' | '3 - Low';

export interface Task {
  id: string;
  type: string;
  task: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string; // YYYY-MM-DD
  link: string;
  focusArea: string;
  valueAdd: string;
  notes: string;
  taskAdded: string; // YYYY-MM-DD
  taskStarted: string; // YYYY-MM-DD
  taskCompleted: string; // YYYY-MM-DD
}

export interface EnrichedTask extends Task {
  metDeadline: 'Yes' | 'No' | '';
  weekStart: string; // YYYY-MM-DD (Monday of the week taskAdded)
}

export interface RecurringTask {
  id: string;
  day: string;
  type: string;
  taskList: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
  link: string;
  taskFocus: string;
  lastAdded: string;
  daysSinceLast: number;
  toAdd: boolean;
}

export interface CommsTask {
  id: string;
  channel: string;
  recipient: string;
  subject: string;
  message: string;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
  sentAt: string;
  notes: string;
}
