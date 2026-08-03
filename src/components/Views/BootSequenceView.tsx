import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/audio';

interface BootSequenceViewProps {
  onComplete: () => void;
}

export const BootSequenceView: React.FC<BootSequenceViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const bootLogs = [
    'POWER ON SELF TEST (POST) INITIATED...',
    'CHECKING MAIN STORAGE: 1024 MB ALLOCATED [OK]',
    'TESTING PROCESSOR SUBSYSTEM (4 CORES) [OK]',
    'LOADING LICENSED INTERNAL CODE (LIC V7R4M0)...',
    'MOUNTING DASD DISK UNITS 1-4... ALL ONLINE',
    'INITIALIZING SYSTEM VALUES & SUBSYSTEM QINTER...',
    'VERIFYING NETWORK ADAPTER 1000BASE-T... CONNECTED',
    'STARTING WEB APPLICATION SHOWCASE INTERFACE...',
    'SYSTEM IPL COMPLETED SUCCESSFULLY. SIGN-ON READY.'
  ];

  useEffect(() => {
    sound.playIplChime();

    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < bootLogs.length - 1) {
          sound.playKeyClick();
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-6 font-mono text-xs sm:text-sm select-none p-4">
      {/* IBM Logo */}
      <div className="text-center space-y-2">
        <div className="text-xl sm:text-2xl font-bold tracking-widest text-[var(--crt-text-bright)]">
          IBM System i5 / AS400
        </div>
        <div className="text-xs opacity-75">
          INITIAL PROGRAM LOAD (IPL) IN PROGRESS
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md border border-[var(--crt-border)] p-1 bg-black">
        <div
          className="bg-[var(--crt-text)] h-4 transition-all duration-300"
          style={{ width: `${((step + 1) / bootLogs.length) * 100}%` }}
        />
      </div>

      {/* Log Console Box */}
      <div className="w-full max-w-lg border border-[var(--crt-border)] p-3 bg-black/60 space-y-1 h-44 overflow-y-auto">
        {bootLogs.slice(0, step + 1).map((log, idx) => (
          <div key={idx} className="flex space-x-2 text-xs">
            <span className="text-[var(--crt-text-bright)] font-bold">&gt;</span>
            <span className={idx === step ? 'font-bold text-[var(--crt-text-bright)]' : 'opacity-80'}>
              {log}
            </span>
          </div>
        ))}
      </div>

      {step === bootLogs.length - 1 && (
        <button
          onClick={() => {
            sound.playEnterKey();
            onComplete();
          }}
          className="px-6 py-2 bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold uppercase tracking-wider text-sm hover:opacity-90 animate-bounce"
        >
          [ ENTER MAIN MENU ] &rarr;
        </button>
      )}
    </div>
  );
};
