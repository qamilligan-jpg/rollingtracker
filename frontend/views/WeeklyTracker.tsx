import React, { useState, useMemo } from 'react';
import { EnrichedTask } from '../types';
import { COLORS } from '../constants';
import { getTodayStr, getMonday, addDays } from '../utils';
import { SectionHeader, Table, Th, Td, Badge } from '../components/ui';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface WeeklyTrackerProps {
  tasks: EnrichedTask[];
}

const WeeklyTracker: React.FC<WeeklyTrackerProps> = ({ tasks }) => {
  const today = getTodayStr();
  const currentMonday = getMonday(today);
  const [selectedWeekStart, setSelectedWeekStart] = useState(currentMonday);

  const weekTasks = useMemo(() => {
    return tasks.filter(t => t.weekStart === selectedWeekStart);
  }, [tasks, selectedWeekStart]);

  const completedThisWeek = useMemo(() => {
    return weekTasks.filter(t => t.status === 'Completed').length;
  }, [weekTasks]);

  const prevWeek = () => setSelectedWeekStart(addDays(selectedWeekStart, -7));
  const nextWeek = () => setSelectedWeekStart(addDays(selectedWeekStart, 7));
  const goToCurrent = () => setSelectedWeekStart(currentMonday);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <SectionHeader title="WEEKLY ACTION ITEMS" />
      
      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-gray-700">Weekly Start Date:</span>
          <div className="flex items-center gap-2">
            <button onClick={prevWeek} className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={18} /></button>
            <span className="font-bold text-lg" style={{ color: COLORS.NAVY }}>{selectedWeekStart}</span>
            <button onClick={nextWeek} className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={18} /></button>
          </div>
          {selectedWeekStart !== currentMonday && (
            <button onClick={goToCurrent} className="text-xs text-blue-600 hover:underline">Go to Current Week</button>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-lg">
          <span className="font-bold text-gray-700">Completed This Week:</span>
          <span className="font-bold" style={{ color: COLORS.SAGE }}>{completedThisWeek}</span>
        </div>
      </div>

      <Table>
        <thead className="bg-gray-50">
          <tr>
            <Th>Type</Th>
            <Th>Task List</Th>
            <Th>Progress</Th>
            <Th>Priority</Th>
            <Th>Deadline</Th>
            <Th>Link</Th>
            <Th>Task Focus</Th>
            <Th>Notes</Th>
            <Th>Value Add</Th>
            <Th>Added</Th>
            <Th>Started</Th>
            <Th>Completed</Th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {weekTasks.length === 0 ? (
            <tr>
              <td colSpan={12} className="px-4 py-8 text-center text-gray-500 italic">
                No Actions Logged For This Week
              </td>
            </tr>
          ) : (
            weekTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                <Td>{task.type}</Td>
                <Td className="font-medium text-gray-900 max-w-xs truncate" title={task.task}>{task.task}</Td>
                <Td><Badge text={task.status} type="status" /></Td>
                <Td><Badge text={task.priority} type="priority" /></Td>
                <Td>{task.deadline}</Td>
                <Td>
                  {task.link && (
                    <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center justify-center">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </Td>
                <Td>{task.focusArea}</Td>
                <Td className="max-w-xs truncate text-xs" title={task.notes}>{task.notes}</Td>
                <Td>{task.valueAdd}</Td>
                <Td>{task.taskAdded}</Td>
                <Td>{task.taskStarted}</Td>
                <Td>{task.taskCompleted}</Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      <p className="text-xs text-gray-500 italic mt-2">
        [1] Automatically rolling tracker updates to the Monday before today. Use arrows to navigate weeks.
      </p>
    </div>
  );
};

export default WeeklyTracker;
