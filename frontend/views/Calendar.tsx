import React, { useState, useMemo } from 'react';
import { EnrichedTask } from '../types';
import { COLORS } from '../constants';
import { getTodayStr, diffDays } from '../utils';
import { Badge } from '../components/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  tasks: EnrichedTask[];
}

const Calendar: React.FC<CalendarProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const todayStr = getTodayStr();

  const pendingTasks = useMemo(() => tasks.filter(t => t.status === 'Pending'), [tasks]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sun, 1 = Mon...
    
    const days = [];
    // Backtrack to Sunday
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startingDayOfWeek);

    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dayTasks = tasks.filter(t => t.deadline === dateStr && t.status !== 'Completed');
      
      days.push({
        date: d,
        dateStr,
        isCurrentMonth: d.getMonth() === month,
        isToday: dateStr === todayStr,
        tasks: dayTasks
      });
    }
    return days;
  }, [currentDate, tasks, todayStr]);

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="flex flex-col lg:flex-row gap-4 animate-in fade-in duration-300 h-[calc(100vh-120px)]">
      
      {/* Sidebar: Pending Tasks */}
      <div className="w-full lg:w-1/4 flex flex-col bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
        <div 
          className="py-3 px-4 text-center font-bold text-sm"
          style={{ backgroundColor: COLORS.SOFT_YELLOW, color: COLORS.CRIMSON }}
        >
          You have {pendingTasks.length} Tasks Pending
        </div>
        <div className="grid grid-cols-4 text-xs font-bold text-center py-2 text-white" style={{ backgroundColor: COLORS.NAVY }}>
          <div className="col-span-2 px-2 text-left">Task</div>
          <div className="px-1">Status</div>
          <div className="px-1">Due In</div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {pendingTasks.map(t => {
            const dueIn = t.deadline ? diffDays(todayStr, t.deadline) * (t.deadline < todayStr ? -1 : 1) : null;
            return (
              <div key={t.id} className="grid grid-cols-4 gap-1 text-xs items-center border-b border-gray-100 pb-2 last:border-0">
                <div className="col-span-2 truncate px-1" title={t.task}>
                  <span className="text-[10px] text-gray-500 block truncate">{t.type}</span>
                  {t.task}
                </div>
                <div className="text-center"><Badge text={t.status} type="status" /></div>
                <div className={`text-center font-bold ${dueIn !== null && dueIn < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                  {dueIn !== null ? `${dueIn}d` : '-'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Calendar Grid */}
      <div className="w-full lg:w-3/4 flex flex-col bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center py-3 px-6" style={{ backgroundColor: COLORS.SAGE, color: COLORS.WHITE }}>
          <button onClick={prevMonth} className="p-1 hover:bg-white/20 rounded transition-colors"><ChevronLeft size={24} /></button>
          <h2 className="text-xl font-bold uppercase tracking-wider">{monthName}</h2>
          <button onClick={nextMonth} className="p-1 hover:bg-white/20 rounded transition-colors"><ChevronRight size={24} /></button>
        </div>
        
        {/* Day Names */}
        <div className="grid grid-cols-7 border-b border-gray-200" style={{ backgroundColor: COLORS.SAGE, color: COLORS.WHITE }}>
          {dayNames.map(day => (
            <div key={day} className="py-2 text-center text-sm font-bold border-r border-white/20 last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 grid grid-cols-7 grid-rows-6 bg-gray-200 gap-[1px]">
          {calendarDays.map((day, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col bg-white overflow-hidden ${!day.isCurrentMonth ? 'opacity-50 bg-gray-50' : ''} ${day.isToday ? 'ring-2 ring-inset ring-blue-500' : ''}`}
            >
              <div className="text-right p-1 text-xs font-bold text-gray-500" style={{ backgroundColor: COLORS.LIGHT_GREY }}>
                {day.date.getDate()}
              </div>
              <div className="flex-1 p-1 overflow-y-auto space-y-1">
                {day.tasks.map(t => (
                  <div key={t.id} className="text-[10px] leading-tight p-1 rounded bg-blue-50 text-blue-900 border border-blue-100 truncate" title={t.task}>
                    {t.task}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Calendar;
