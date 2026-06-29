import React, { useState, useMemo } from 'react';
import { INITIAL_TASKS, INITIAL_COMMS, COLORS } from './constants';
import { enrichTasks } from './utils';
import { LayoutDashboard, Database, Calendar as CalendarIcon, CalendarDays, Repeat, Send } from 'lucide-react';

import Dashboard from './views/Dashboard';
import AllTasks from './views/AllTasks';
import Calendar from './views/Calendar';
import WeeklyTracker from './views/WeeklyTracker';
import RecurringEngine from './views/RecurringEngine';
import CommsScheduler from './views/CommsScheduler';

type Tab = 'dashboard' | 'all_tasks' | 'calendar' | 'weekly' | 'recurring' | 'comms';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  
  // In a real app, these would be fetched and managed with more complex state/context
  const [tasks] = useState(INITIAL_TASKS);
  const [comms] = useState(INITIAL_COMMS);

  const enrichedTasks = useMemo(() => enrichTasks(tasks), [tasks]);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'all_tasks', label: 'All Tasks', icon: Database },
    { id: 'calendar', label: 'Monthly Calendar', icon: CalendarIcon },
    { id: 'weekly', label: 'Weekly Tracker', icon: CalendarDays },
    { id: 'recurring', label: 'Recurring Engine', icon: Repeat },
    { id: 'comms', label: 'Comms Scheduler', icon: Send },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#1F4E79] flex items-center justify-center text-white font-bold">
                  RT
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">Rolling Tracker</span>
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                        ${isActive 
                          ? 'bg-blue-50 text-[#1F4E79]' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                      `}
                    >
                      <Icon size={16} className={`mr-2 ${isActive ? 'text-[#1F4E79]' : 'text-gray-400'}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
        {/* Mobile nav scrollable row */}
        <div className="md:hidden overflow-x-auto flex border-t border-gray-100 bg-gray-50 px-2 py-2 space-x-2">
           {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap inline-flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${isActive ? 'bg-blue-100 text-[#1F4E79]' : 'text-gray-600 bg-white border border-gray-200'}
                  `}
                >
                  <Icon size={14} className="mr-1.5" />
                  {tab.label}
                </button>
              );
            })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        {activeTab === 'dashboard' && <Dashboard tasks={enrichedTasks} />}
        {activeTab === 'all_tasks' && <AllTasks tasks={enrichedTasks} />}
        {activeTab === 'calendar' && <Calendar tasks={enrichedTasks} />}
        {activeTab === 'weekly' && <WeeklyTracker tasks={enrichedTasks} />}
        {activeTab === 'recurring' && <RecurringEngine />}
        {activeTab === 'comms' && <CommsScheduler comms={comms} />}
      </main>
    </div>
  );
};

export default App;
