import { Task, RecurringTask, CommsTask } from './types';

export const COLORS = {
  NAVY: '#1F4E79',
  SAGE: '#385723',
  CRIMSON: '#C00000',
  BLUE: '#2F5597',
  AMBER: '#FFC000',
  ORANGE: '#ED7D31',
  SOFT_RED: '#FCE4D6',
  SOFT_BLUE: '#DDEBF7',
  SOFT_YELLOW: '#FFF2CC',
  SOFT_GREEN: '#E2EFDA',
  LIGHT_GREY: '#F2F2F2',
  WHITE: '#FFFFFF',
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    type: 'Project Completion',
    task: 'Deploy Client Portal update',
    status: 'Pending',
    priority: '1 - High',
    deadline: '2026-06-30',
    link: 'http://portal.dev',
    focusArea: 'Enablement',
    valueAdd: 'High',
    notes: 'QA passed, waiting for window',
    taskAdded: '2026-06-25',
    taskStarted: '2026-06-26',
    taskCompleted: ''
  },
  {
    id: 't2',
    type: 'Troubleshooting',
    task: 'Fix authentication latency issue',
    status: 'Not Started',
    priority: '2 - Medium',
    deadline: '2026-07-02',
    link: '',
    focusArea: 'Hygiene',
    valueAdd: 'Medium',
    notes: 'Investigation scheduled',
    taskAdded: '2026-06-28',
    taskStarted: '',
    taskCompleted: ''
  },
  {
    id: 't3',
    type: 'Reporting',
    task: 'Generate Q2 Performance Review',
    status: 'Completed',
    priority: '1 - High',
    deadline: '2026-06-28',
    link: '',
    focusArea: 'Reporting',
    valueAdd: 'High',
    notes: 'Delivered to leadership',
    taskAdded: '2026-06-20',
    taskStarted: '2026-06-22',
    taskCompleted: '2026-06-28'
  },
  {
    id: 't4',
    type: 'Special Project',
    task: 'Draft expansion strategy proposal',
    status: 'Pending',
    priority: '3 - Low',
    deadline: '2026-07-15',
    link: '',
    focusArea: 'Improved Profitability',
    valueAdd: 'High',
    notes: 'Collaborating with finance',
    taskAdded: '2026-06-29',
    taskStarted: '2026-06-29',
    taskCompleted: ''
  },
  {
    id: 't5',
    type: 'Tool Configuration',
    task: 'Configure webhook for Slack alerts',
    status: 'Pending',
    priority: '2 - Medium',
    deadline: '2026-06-25',
    link: '',
    focusArea: 'Tool Configuration',
    valueAdd: 'Medium',
    notes: 'API version mismatch investigated',
    taskAdded: '2026-06-20',
    taskStarted: '2026-06-22',
    taskCompleted: ''
  }
];

export const INITIAL_COMMS: CommsTask[] = [
  {
    id: 'CS-001',
    channel: 'Email',
    recipient: 'qamilligan@gmail.com',
    subject: 'Demo Subject',
    message: 'Demo full message text.',
    scheduledDate: '2026-06-28',
    scheduledTime: '10:50',
    status: 'Pending',
    sentAt: '',
    notes: 'Demo Note'
  }
];

export const FREQUENCIES = [
  { name: 'Daily', days: 1 },
  { name: 'Semi-Weekly', days: 3 },
  { name: 'Weekly', days: 7 },
  { name: 'Semi-Monthly', days: 14 },
  { name: 'Monthly', days: 30 },
  { name: 'Every 2 Months', days: 60 },
  { name: 'Quarterly', days: 92 },
  { name: 'Semi-Annual', days: 180 },
  { name: 'Annual', days: 365 }
];

export const TASK_TYPES = [
  'Increased Efficiency',
  'Improved Profitability',
  'Enablement',
  'Project Completion',
  'Special Project',
  'Hygiene',
  'Tool Configuration',
  'Reporting',
  'Troubleshooting'
];
