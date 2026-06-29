import React, { useMemo } from 'react';
import { EnrichedTask } from '../types';
import { COLORS } from '../constants';
import { getTodayStr, addDays } from '../utils';
import { SectionHeader, Badge } from '../components/ui';

interface DashboardProps {
  tasks: EnrichedTask[];
}

const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
  const today = getTodayStr();
  const threeDaysAgo = addDays(today, -3);

  const overdueTasks = useMemo(() => 
    tasks.filter(t => t.status !== 'Completed' && t.deadline && t.deadline < today),
  [tasks, today]);

  const notStartedTasks = useMemo(() => 
    tasks.filter(t => t.status === 'Not Started'),
  [tasks]);

  const pendingTasks = useMemo(() => 
    tasks.filter(t => t.status === 'Pending'),
  [tasks]);

  const recentCompletedTasks = useMemo(() => 
    tasks.filter(t => t.status === 'Completed' && t.taskCompleted >= threeDaysAgo),
  [tasks, threeDaysAgo]);

  const renderList = (title: string, data: EnrichedTask[], bgColor: string, headerBg: string, headerText: string) => (
    <div className="flex flex-col bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="py-3 px-4 text-center font-bold text-sm"
        style={{ backgroundColor: headerBg, color: headerText }}
      >
        {title} - {data.length}
      </div>
      <div className="grid grid-cols-3 text-xs font-bold text-center py-2 border-b border-gray-200" style={{ backgroundColor: bgColor }}>
        <div className="px-2">Task List</div>
        <div className="px-2">Priority</div>
        <div className="px-2">{title.includes('Completed') ? 'Completed' : 'Deadline'}</div>
      </div>
      <div className="flex-1 overflow-y-auto max-h-96 p-2 space-y-2">
        {data.length === 0 ? (
          <div className="text-center text-gray-400 text-xs py-4 italic">No tasks</div>
        ) : (
          data.map(t => (
            <div key={t.id} className="grid grid-cols-3 gap-2 text-xs items-center border-b border-gray-100 pb-2 last:border-0">
              <div className="truncate px-1" title={t.task}>{t.task}</div>
              <div className="text-center"><Badge text={t.priority} type="priority" /></div>
              <div className="text-center text-gray-500">{title.includes('Completed') ? t.taskCompleted : t.deadline}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <SectionHeader title="ROLLING TASK TRACKER - DASHBOARD" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderList('Overdue', overdueTasks, COLORS.SOFT_RED, COLORS.CRIMSON, COLORS.WHITE)}
        {renderList('Not Started', notStartedTasks, COLORS.SOFT_BLUE, COLORS.BLUE, COLORS.WHITE)}
        {renderList('Pending', pendingTasks, COLORS.SOFT_YELLOW, COLORS.AMBER, '#000000')}
        {renderList('Completed (Last 3 days)', recentCompletedTasks, COLORS.SOFT_GREEN, COLORS.SAGE, COLORS.WHITE)}
      </div>
    </div>
  );
};

export default Dashboard;
