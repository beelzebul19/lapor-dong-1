import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';

interface SysInfoViewProps {
  onBackToMenu: () => void;
}

export const SysInfoView: React.FC<SysInfoViewProps> = ({ onBackToMenu }) => {
  const [cpuUsage, setCpuUsage] = useState(14);
  const [memUsed, setMemUsed] = useState(412);
  const totalMem = 1024;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll('.overflow-y-auto').forEach((el) => {
      el.scrollTop = 0;
    });
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 22) + 8);
      setMemUsed(400 + Math.floor(Math.random() * 40));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 font-mono text-xs sm:text-sm select-none">
      {/* Title Header */}
      <div className="border border-[var(--crt-border)] p-2 bg-[var(--crt-bg)] text-center font-bold text-[var(--crt-text-bright)] uppercase tracking-wider">
        SYSTEM DIAGNOSTICS & HARDWARE STATUS [DSPSYS]
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Hardware & Memory */}
        <div className="border border-[var(--crt-border)] p-3 space-y-3">
          <div className="font-bold text-[var(--crt-text-bright)] uppercase border-b border-[var(--crt-border)] pb-1">
            PROCESSOR & MEMORY ALLOCATION
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span>CPU UTILIZATION (4 CORES) . . :</span>
                <strong className="text-[var(--crt-text-bright)]">{cpuUsage}%</strong>
              </div>
              <div className="w-full bg-black border border-[var(--crt-border)] h-3 p-0.5">
                <div
                  className="bg-[var(--crt-text)] h-full transition-all duration-500"
                  style={{ width: `${cpuUsage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>MAIN STORAGE ALLOCATION . . :</span>
                <strong className="text-[var(--crt-text-bright)]">{memUsed} MB / {totalMem} MB</strong>
              </div>
              <div className="w-full bg-black border border-[var(--crt-border)] h-3 p-0.5">
                <div
                  className="bg-[var(--crt-text)] h-full transition-all duration-500"
                  style={{ width: `${(memUsed / totalMem) * 100}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--crt-border)] space-y-1">
              <div className="flex justify-between">
                <span className="opacity-70">SYSTEM MODEL . . . . :</span>
                <span className="font-bold">IBM System i5 Model 520</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">OS VERSION . . . . . :</span>
                <span className="font-bold">i5/OS V7R4M0</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">SERIAL NUMBER . . . . :</span>
                <span className="font-bold">10-8A492X</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Subsystem Jobs */}
        <div className="border border-[var(--crt-border)] p-3 space-y-3">
          <div className="font-bold text-[var(--crt-text-bright)] uppercase border-b border-[var(--crt-border)] pb-1">
            ACTIVE SUBSYSTEM JOBS [WRKACTJOB]
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between font-bold border-b border-[var(--crt-border)]/50 pb-1 opacity-80">
              <span>JOB NAME / USER</span>
              <span>TYPE</span>
              <span>CPU %</span>
              <span>STATUS</span>
            </div>

            <div className="flex justify-between">
              <span>QINTER/GUEST_DEV</span>
              <span>INT</span>
              <span>0.4</span>
              <span className="text-[var(--crt-text-bright)]">RUN</span>
            </div>
            <div className="flex justify-between">
              <span>QPANTAU/QINTER_01</span>
              <span>BCH</span>
              <span>2.1</span>
              <span className="text-[var(--crt-text-bright)]">RUN</span>
            </div>
            <div className="flex justify-between">
              <span>QCYBFRG/QBATCH_02</span>
              <span>BCH</span>
              <span>1.8</span>
              <span className="text-[var(--crt-text-bright)]">RUN</span>
            </div>
            <div className="flex justify-between">
              <span>QNEUGRD/QINTER_03</span>
              <span>INT</span>
              <span>0.9</span>
              <span className="text-[var(--crt-text-bright)]">RUN</span>
            </div>
            <div className="flex justify-between">
              <span>QSYSWRK/QHTTP_01</span>
              <span>SYS</span>
              <span>0.2</span>
              <span className="text-[var(--crt-text-bright)]">WAIT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="border-t border-[var(--crt-border)] pt-3 flex justify-between">
        <button
          onClick={() => {
            sound.playKeyClick();
            onBackToMenu();
          }}
          className="px-3 py-1.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] font-bold uppercase transition-colors"
        >
          &lt;-- [F3] MAIN MENU
        </button>
      </div>
    </div>
  );
};
