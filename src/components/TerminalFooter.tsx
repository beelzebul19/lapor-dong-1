import React, { useState, useRef, useEffect } from 'react';
import { sound } from '../utils/audio';

interface TerminalFooterProps {
  onCommandSubmit: (cmd: string) => void;
  onFKeyPress: (fKey: number) => void;
  lastCommand?: string;
}

export const TerminalFooter: React.FC<TerminalFooterProps> = ({
  onCommandSubmit,
  onFKeyPress,
  lastCommand,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus command prompt
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Intercept physical F-Keys if needed
    if (e.key.startsWith('F') && e.key.length <= 3) {
      const fNum = parseInt(e.key.replace('F', ''), 10);
      if (!isNaN(fNum) && fNum >= 1 && fNum <= 12) {
        e.preventDefault();
        sound.playFKey();
        onFKeyPress(fNum);
        return;
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = inputVal.trim();
      sound.playEnterKey();
      if (trimmed) {
        setHistory((prev) => [trimmed, ...prev]);
        setHistoryIdx(-1);
        onCommandSubmit(trimmed);
        setInputVal('');
      } else {
        // Empty enter acts like refresh or submit default
        onCommandSubmit('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    } else {
      sound.playKeyClick();
    }
  };

  const handleFButtonClick = (num: number) => {
    sound.playFKey();
    onFKeyPress(num);
  };

  return (
    <div className="select-none font-mono text-xs sm:text-sm border-t border-[var(--crt-border)] pt-2 mt-3 space-y-2">
      {/* Command Prompt Input Line */}
      <div className="flex items-center space-x-2 bg-[var(--crt-bg)] py-1 px-2 border border-[var(--crt-border)]">
        <label htmlFor="terminal-input" className="font-bold text-[var(--crt-text-bright)] whitespace-nowrap">
          {'===>'}
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter option number or command (e.g. 1, 2, 3, HELP, MATRIX, THEME AMBER)..."
          className="flex-1 bg-transparent border-none outline-none text-[var(--crt-text-bright)] font-mono text-xs sm:text-sm focus:ring-0 uppercase tracking-wider"
          autoComplete="off"
          spellCheck="false"
        />
        <button
          onClick={() => {
            const trimmed = inputVal.trim();
            sound.playEnterKey();
            setHistory((prev) => [trimmed, ...prev]);
            setHistoryIdx(-1);
            onCommandSubmit(trimmed);
            setInputVal('');
          }}
          className="px-2 py-0.5 bg-[var(--crt-highlight-bg)] text-[var(--crt-highlight-fg)] font-bold text-xs uppercase hover:opacity-90 transition-opacity"
        >
          ENTER
        </button>
      </div>

      {/* Function Keys Legend Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1 text-[11px]">
        <button
          onClick={() => handleFButtonClick(1)}
          className="px-1 py-0.5 border border-[var(--crt-border)] text-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors truncate"
        >
          F1=Help
        </button>
        <button
          onClick={() => handleFButtonClick(3)}
          className="px-1 py-0.5 border border-[var(--crt-border)] text-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors truncate"
        >
          F3=Main Menu
        </button>
        <button
          onClick={() => handleFButtonClick(4)}
          className="px-1 py-0.5 border border-[var(--crt-border)] text-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors truncate"
        >
          F4=Prompt
        </button>
        <button
          onClick={() => handleFButtonClick(5)}
          className="px-1 py-0.5 border border-[var(--crt-border)] text-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors truncate"
        >
          F5=Refresh
        </button>
        <button
          onClick={() => handleFButtonClick(7)}
          className="px-1 py-0.5 border border-[var(--crt-border)] text-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors truncate"
        >
          F7=Prev App
        </button>
        <button
          onClick={() => handleFButtonClick(8)}
          className="px-1 py-0.5 border border-[var(--crt-border)] text-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors truncate"
        >
          F8=Next App
        </button>
        <button
          onClick={() => handleFButtonClick(9)}
          className="px-1 py-0.5 border border-[var(--crt-border)] text-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors truncate"
        >
          F9=Retrieve
        </button>
        <button
          onClick={() => handleFButtonClick(10)}
          className="px-1 py-0.5 border border-[var(--crt-border)] text-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors truncate"
        >
          F10=CRT Opt
        </button>
        <button
          onClick={() => handleFButtonClick(12)}
          className="px-1 py-0.5 border border-[var(--crt-border)] text-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors truncate"
        >
          F12=Cancel
        </button>
      </div>

      {/* System Status Line / Message Bar */}
      <div className="flex justify-between items-center text-[11px] opacity-75 pt-1">
        <div>
          <span>LAST CMD: </span>
          <span className="font-bold text-[var(--crt-text-bright)]">
            {lastCommand ? lastCommand.toUpperCase() : 'NONE'}
          </span>
        </div>
        <div className="hidden sm:block">
          <span>STATUS: </span>
          <span className="text-[var(--crt-text-bright)]">KB LOCK OFF (MW READY)</span>
        </div>
      </div>
    </div>
  );
};
