import React from 'react';
import { EnrichedTask } from '../types';
import { SectionHeader, Table, Th, Td, Badge } from '../components/ui';
import { ExternalLink } from 'lucide-react';

interface AllTasksProps {
  tasks: EnrichedTask[];
}

const AllTasks: React.FC<AllTasksProps> = ({ tasks }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <SectionHeader title="MASTER TASK DATABASE" />
      
      <Table>
        <thead className="bg-gray-50">
          <tr>
            <Th>Type</Th>
            <Th>Task</Th>
            <Th>Status</Th>
            <Th>Priority</Th>
            <Th>Deadline</Th>
            <Th>Link</Th>
            <Th>Focus Area</Th>
            <Th>Value Add</Th>
            <Th>Notes</Th>
            <Th>Added</Th>
            <Th>Started</Th>
            <Th>Completed</Th>
            <Th>Met Deadline</Th>
            <Th>Week Start</Th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
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
              <Td>{task.valueAdd}</Td>
              <Td className="max-w-xs truncate text-xs" title={task.notes}>{task.notes}</Td>
              <Td>{task.taskAdded}</Td>
              <Td>{task.taskStarted}</Td>
              <Td>{task.taskCompleted}</Td>
              <Td>
                <span className={`font-bold ${task.metDeadline === 'Yes' ? 'text-green-600' : task.metDeadline === 'No' ? 'text-red-600' : ''}`}>
                  {task.metDeadline}
                </span>
              </Td>
              <Td className="text-gray-500 text-xs">{task.weekStart}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllTasks;
