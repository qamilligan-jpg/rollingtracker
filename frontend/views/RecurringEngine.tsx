import React from 'react';
import { COLORS, FREQUENCIES, TASK_TYPES } from '../constants';
import { SectionHeader, Table, Th, Td } from '../components/ui';

const RecurringEngine: React.FC = () => {
  // Mock data for recurring tasks as it wasn't fully provided in the seed
  const mockRecurring = [
    { id: 'r1', day: 'Monday', type: 'Hygiene', taskList: 'Weekly Inbox Zero', status: 'Pending', priority: '2 - Medium', deadline: 'EOD', link: '', taskFocus: 'Hygiene', lastAdded: '2026-06-22', daysSinceLast: 7, toAdd: true }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <SectionHeader title="RECURRING SYSTEM CONFIGURATION ENGINE" bgColor={COLORS.ORANGE} />
      
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Main Table */}
        <div className="flex-1">
          <Table>
            <thead>
              <tr>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Day</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Type</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Task List</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Status</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Priority</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Deadline</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Link</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Task Focus</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Last Added</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>Days Since</Th>
                <Th style={{ backgroundColor: COLORS.ORANGE }}>To Add</Th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockRecurring.map((r) => (
                <tr key={r.id}>
                  <Td>{r.day}</Td>
                  <Td>{r.type}</Td>
                  <Td>{r.taskList}</Td>
                  <Td>{r.status}</Td>
                  <Td>{r.priority}</Td>
                  <Td>{r.deadline}</Td>
                  <Td>{r.link}</Td>
                  <Td>{r.taskFocus}</Td>
                  <Td>{r.lastAdded}</Td>
                  <Td className="text-center">{r.daysSinceLast}</Td>
                  <Td className="text-center">
                    <input type="checkbox" checked={r.toAdd} readOnly className="h-4 w-4 text-orange-600 rounded border-gray-300" />
                  </Td>
                </tr>
              ))}
              {mockRecurring.length === 0 && (
                <tr><td colSpan={11} className="p-4 text-center text-gray-500">No recurring tasks configured.</td></tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Reference Tables */}
        <div className="w-full xl:w-72 space-y-6">
          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="py-2 px-4 text-center font-bold text-white text-sm" style={{ backgroundColor: COLORS.SAGE }}>
              Frequencies Configuration
            </div>
            <div className="divide-y divide-gray-100">
              {FREQUENCIES.map(f => (
                <div key={f.name} className="flex justify-between px-4 py-2 text-sm">
                  <span className="text-gray-700">{f.name}</span>
                  <span className="font-mono text-gray-500">{f.days}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
            <div className="py-2 px-4 text-center font-bold text-white text-sm" style={{ backgroundColor: COLORS.SAGE }}>
              Reference Task Types
            </div>
            <div className="divide-y divide-gray-100">
              {TASK_TYPES.map(t => (
                <div key={t} className="px-4 py-2 text-sm text-gray-700">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecurringEngine;
