import React, { useEffect } from 'react';
import { sound } from '../../utils/audio';

interface HelpManualViewProps {
  onBackToMenu: () => void;
}

export const HelpManualView: React.FC<HelpManualViewProps> = ({ onBackToMenu }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll('.overflow-y-auto').forEach((el) => {
      el.scrollTop = 0;
    });
  }, []);
  return (
    <div className="space-y-4 font-mono text-xs sm:text-sm select-none">
      {/* Title */}
      <div className="border border-[var(--crt-border)] p-2 bg-[var(--crt-bg)] text-center font-bold text-[var(--crt-text-bright)] uppercase tracking-wider">
        TERMINAL OPERATOR MANUAL & COMMAND HELP [HELP / F1]
      </div>

      <div className="border border-[var(--crt-border)] p-3 space-y-3">
        <div className="font-bold text-[var(--crt-text-bright)] uppercase border-b border-[var(--crt-border)] pb-1">
          1. NAVIGATION & OPTION COMMANDS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">1, 2, 3</strong>
            <span className="opacity-80">Select and inspect Showcase Web Application 1, 2, or 3.</span>
          </div>
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">LAUNCH &lt;1|2|3&gt; or DEMO &lt;1|2|3&gt;</strong>
            <span className="opacity-80">Directly run the interactive terminal demo simulator for an app.</span>
          </div>
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">4 or DSPSYS</strong>
            <span className="opacity-80">Display real-time system diagnostics, CPU load, and active jobs.</span>
          </div>
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">5 or EDTF</strong>
            <span className="opacity-80">Open application editor to customize app titles, stack, links, or description.</span>
          </div>
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">7 or MATRIX</strong>
            <span className="opacity-80">Launch falling green-phosphor matrix data stream Easter egg.</span>
          </div>
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">8 or REBOOT</strong>
            <span className="opacity-80">Re-initialize AS/400 Initial Program Load (IPL) boot sequence.</span>
          </div>
        </div>
      </div>

      <div className="border border-[var(--crt-border)] p-3 space-y-3">
        <div className="font-bold text-[var(--crt-text-bright)] uppercase border-b border-[var(--crt-border)] pb-1">
          2. COLOR & CRT DISPLAY COMMANDS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">THEME GREEN / AMBER / CYAN / WHITE</strong>
            <span className="opacity-80">Switch phosphor screen color scheme immediately.</span>
          </div>
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">10 or F10</strong>
            <span className="opacity-80">Open display option panel (Scanlines, Curvature, Glow, Audio).</span>
          </div>
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">CLEAR or CLS</strong>
            <span className="opacity-80">Reset command line and return to clean view.</span>
          </div>
          <div className="border border-[var(--crt-border)] p-2">
            <strong className="text-[var(--crt-text-bright)] block">BEEP</strong>
            <span className="opacity-80">Test vintage terminal 1000Hz alert tone.</span>
          </div>
        </div>
      </div>

      <div className="border border-[var(--crt-border)] p-3 space-y-2 text-xs">
        <div className="font-bold text-[var(--crt-text-bright)] uppercase border-b border-[var(--crt-border)] pb-1">
          3. KEYBOARD SHORTCUTS
        </div>
        <p className="opacity-80">
          • Press <strong className="text-[var(--crt-text-bright)]">Up / Down Arrow Keys</strong> in the command line prompt to cycle through command history.
        </p>
        <p className="opacity-80">
          • Physical Function Keys <strong className="text-[var(--crt-text-bright)]">F1 through F12</strong> are mapped directly to screen actions.
        </p>
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
