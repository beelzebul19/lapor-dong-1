import React from 'react';
import { CrtSettings } from '../types';

interface CrtOverlayProps {
  settings: CrtSettings;
  children: React.ReactNode;
  onTogglePower?: () => void;
  onToggleSound?: () => void;
  onOpenSettings?: () => void;
}

export const CrtOverlay: React.FC<CrtOverlayProps> = ({
  settings,
  children,
  onTogglePower,
  onToggleSound,
  onOpenSettings,
}) => {
  const themeClass = `data-theme-${settings.theme}`;

  return (
    <div 
      data-theme={settings.theme}
      className={`min-h-screen w-full bg-[var(--crt-bg)] text-[var(--crt-text)] transition-colors duration-300 flex flex-col justify-between p-2 sm:p-4 md:p-6 ${
        settings.flicker ? 'crt-flicker-active' : ''
      }`}
    >
      {/* Outer Curved Monitor Bezel if enabled */}
      <div 
        className={`relative flex-1 flex flex-col w-full max-w-7xl mx-auto border border-[var(--crt-border)] ${
          settings.curvature ? 'crt-curved-container p-3 sm:p-6' : 'p-2 sm:p-4 border-2'
        } ${settings.glow ? 'crt-border-glow' : ''} ${settings.scanlines ? 'scanlines' : ''}`}
      >
        {/* Hardware Status LEDs Header bar inside bezel */}
        <div className="flex items-center justify-between border-b border-[var(--crt-border)] pb-2 mb-2 text-xs opacity-90 select-none">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="flex items-center space-x-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--crt-text)] animate-pulse shadow-[0_0_8px_var(--crt-text)]"></span>
              <span className="font-bold tracking-wider">IBM AS/400</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-[11px] opacity-80">
              <span>SYS: <strong className="text-[var(--crt-text-bright)]">ONLINE</strong></span>
              <span>COMM: <strong className="text-[var(--crt-text-bright)]">ESTABLISHED</strong></span>
              <span>BAUD: <strong>19200</strong></span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onToggleSound}
              className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors text-[11px] uppercase tracking-wider"
              title="Toggle retro click audio sound effects"
            >
              SOUND: {settings.soundEnabled ? 'ON' : 'MUTED'}
            </button>

            <button
              onClick={onOpenSettings}
              className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors text-[11px] uppercase tracking-wider hidden sm:inline-block"
            >
              [F10] DISPLAY OPT
            </button>

            {onTogglePower && (
              <button
                onClick={onTogglePower}
                className="px-2 py-0.5 bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold hover:opacity-80 text-[11px] tracking-wider"
                title="Reboot AS/400 System (IPL)"
              >
                REBOOT
              </button>
            )}
          </div>
        </div>

        {/* Main Display Area */}
        <div className={`flex-1 flex flex-col justify-between overflow-y-auto ${settings.glow ? 'crt-glow' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
