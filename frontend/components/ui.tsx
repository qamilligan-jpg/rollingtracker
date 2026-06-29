import React from 'react';
import { COLORS } from '../constants';

export const SectionHeader: React.FC<{ title: string; bgColor?: string; textColor?: string }> = ({ 
  title, 
  bgColor = COLORS.NAVY, 
  textColor = COLORS.WHITE 
}) => (
  <div 
    className="w-full py-3 px-4 text-center font-bold text-lg uppercase tracking-wider shadow-sm rounded-t-md"
    style={{ backgroundColor: bgColor, color: textColor }}
  >
    {title}
  </div>
);

export const Badge: React.FC<{ text: string; type?: 'status' | 'priority' | 'default' }> = ({ text, type = 'default' }) => {
  let bg = 'bg-gray-200';
  let textCol = 'text-gray-800';

  if (type === 'status') {
    if (text === 'Completed') { bg = 'bg-[#E2EFDA]'; textCol = 'text-[#385723]'; }
    else if (text === 'Pending') { bg = 'bg-[#FFF2CC]'; textCol = 'text-[#B8860B]'; }
    else if (text === 'Not Started') { bg = 'bg-[#DDEBF7]'; textCol = 'text-[#2F5597]'; }
  } else if (type === 'priority') {
    if (text.includes('1')) { bg = 'bg-[#FCE4D6]'; textCol = 'text-[#C00000]'; }
    else if (text.includes('2')) { bg = 'bg-[#FFF2CC]'; textCol = 'text-[#B8860B]'; }
    else if (text.includes('3')) { bg = 'bg-[#E2EFDA]'; textCol = 'text-[#385723]'; }
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${bg} ${textCol}`}>
      {text}
    </span>
  );
};

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="overflow-x-auto bg-white shadow-sm rounded-b-md border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200 text-sm">
      {children}
    </table>
  </div>
);

export const Th: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => (
  <th 
    className={`px-4 py-3 text-left font-bold text-white uppercase tracking-wider border-r border-white/20 last:border-r-0 ${className}`}
    style={{ backgroundColor: COLORS.NAVY, ...style }}
  >
    {children}
  </th>
);

export const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <td className={`px-4 py-2 whitespace-nowrap border-r border-gray-200 last:border-r-0 text-gray-700 ${className}`}>
    {children}
  </td>
);
