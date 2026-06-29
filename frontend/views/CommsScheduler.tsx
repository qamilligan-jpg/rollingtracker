import React from 'react';
import { CommsTask } from '../types';
import { SectionHeader, Table, Th, Td, Badge } from '../components/ui';

interface CommsSchedulerProps {
  comms: CommsTask[];
}

const CommsScheduler: React.FC<CommsSchedulerProps> = ({ comms }) => {
  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <SectionHeader title="COMMUNICATIONS & OUTBOUND DISPATCH SCHEDULER" />
      
      <Table>
        <thead className="bg-gray-50">
          <tr>
            <Th>ID</Th>
            <Th>Channel</Th>
            <Th>Recipient/To</Th>
            <Th>Subject / Preview</Th>
            <Th>Full Message</Th>
            <Th>Scheduled Date</Th>
            <Th>Time</Th>
            <Th>Status</Th>
            <Th>Sent At</Th>
            <Th>Notes</Th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {comms.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50 transition-colors">
              <Td className="font-mono text-xs text-gray-500">{c.id}</Td>
              <Td>{c.channel}</Td>
              <Td>{c.recipient}</Td>
              <Td className="font-medium text-gray-900">{c.subject}</Td>
              <Td className="max-w-xs truncate text-xs text-gray-500" title={c.message}>{c.message}</Td>
              <Td>{c.scheduledDate}</Td>
              <Td>{c.scheduledTime}</Td>
              <Td><Badge text={c.status} type="status" /></Td>
              <Td>{c.sentAt}</Td>
              <Td className="text-xs text-gray-500">{c.notes}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CommsScheduler;
