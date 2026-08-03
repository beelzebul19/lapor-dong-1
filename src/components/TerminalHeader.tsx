import React, { useState, useEffect } from 'react';
import { TerminalViewMode } from '../types';

interface TerminalHeaderProps {
  currentView: TerminalViewMode;
  systemName?: string;
  activeAppTitle?: string;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  currentView,
  systemName = 'IBM-AS400-S10',
  activeAppTitle,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', { hour12: false })
      );
      setDateStr(
        now.toISOString().split('T')[0]
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getViewTitle = (): string => {
    switch (currentView) {
      case 'MAIN_MENU':
        return 'WEB APPLICATION SHOWCASE - MAIN MENU';
      case 'APP_DETAIL':
        return activeAppTitle ? `APPLICATION SPECIFICATION: ${activeAppTitle.toUpperCase()}` : 'APPLICATION DETAILS';
      case 'APP_RUNNER':
        return activeAppTitle ? `TERMINAL RUNNER: ${activeAppTitle.toUpperCase()}` : 'APPLICATION EXECUTION ENVIRONMENT';
      case 'SYS_INFO':
        return 'SYSTEM DIAGNOSTICS & HARDWARE STATUS';
      case 'HELP_MANUAL':
        return 'TERMINAL OPERATOR MANUAL & COMMAND HELP';
      case 'EDIT_APPS':
        return 'APPLICATION CONFIGURATION EDITOR (EDTF)';
      case 'COMMAND_LOG':
        return 'TERMINAL COMMAND LOG & AUDIT STREAM';
      case 'MATRIX_RAIN':
        return 'NEURAL SUBSYSTEM DATA STREAM';
      default:
        return 'IBM SYSTEM i5 / AS400 MAIN MENU';
    }
  };

  return (
    <div className="select-none font-mono text-xs sm:text-sm border-b border-[var(--crt-border)] pb-2 mb-3 space-y-1">
      {/* Line 1 */}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <div>
          <span className="opacity-70">System . . . . : </span>
          <span className="font-bold text-[var(--crt-text-bright)]">{systemName}</span>
        </div>
        <div className="font-bold text-[var(--crt-text-bright)] tracking-wider px-2 py-0.5 border border-[var(--crt-border)] bg-[var(--crt-bg)]">
          {getViewTitle()}
        </div>
        <div>
          <span className="opacity-70">Date . . . . . : </span>
          <span>{dateStr || '2026-08-02'}</span>
        </div>
      </div>

      {/* Line 2 */}
      <div className="flex flex-wrap justify-between items-center gap-2 text-xs opacity-90">
        <div>
          <span className="opacity-70">Subsystem . . : </span>
          <span>QINTER</span>
        </div>
        <div className="text-[11px] opacity-75 hidden md:block">
          Select choice or enter command at ===&gt; prompt.
        </div>
        <div>
          <span className="opacity-70">Time . . . . . : </span>
          <span>{timeStr || '08:14:00'}</span>
        </div>
      </div>

      {/* Line 3 */}
      <div className="flex flex-wrap justify-between items-center gap-2 text-xs opacity-80">
        <div>
          <span className="opacity-70">Display . . . : </span>
          <span>DSP01</span>
        </div>
        <div>
          <span className="opacity-70">User . . . . . : </span>
          <span className="font-bold">GUEST_DEV</span>
        </div>
      </div>

      {/* High Contrast AS/400 Header Divider */}
      <div className="w-full overflow-hidden whitespace-nowrap opacity-60 text-[10px] sm:text-xs">
        +------------------------------------------------------------------------------------------------------------------------+
      </div>
    </div>
  );
};
