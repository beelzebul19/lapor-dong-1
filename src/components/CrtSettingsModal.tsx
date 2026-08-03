import React from 'react';
import { CrtSettings, PhosphorTheme } from '../types';
import { sound } from '../utils/audio';

interface CrtSettingsModalProps {
  settings: CrtSettings;
  onUpdateSettings: (newSettings: Partial<CrtSettings>) => void;
  onClose: () => void;
}

export const CrtSettingsModal: React.FC<CrtSettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  const themes: { id: PhosphorTheme; name: string; colorHex: string }[] = [
    { id: 'green', name: 'Green Phosphorus (IBM 3179)', colorHex: '#00FF66' },
    { id: 'amber', name: 'Amber Phosphorus (IBM 3477)', colorHex: '#FFB000' },
    { id: 'cyan', name: 'Cyan High-Vis Terminal', colorHex: '#00E5FF' },
    { id: 'white', name: 'Paper White Phosphor (IBM 3151)', colorHex: '#F0F0F0' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 font-mono select-none">
      <div className="w-full max-w-xl border-2 border-[var(--crt-border)] bg-[var(--crt-bg)] text-[var(--crt-text)] p-4 sm:p-6 shadow-[0_0_30px_var(--crt-glow)]">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[var(--crt-border)] pb-2 mb-4">
          <h2 className="text-base sm:text-lg font-bold text-[var(--crt-text-bright)] tracking-wider">
            [F10] CRT DISPLAY & HARDWARE SETTINGS
          </h2>
          <button
            onClick={onClose}
            className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] font-bold text-xs"
          >
            [X] ESC
          </button>
        </div>

        {/* Theme Select */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold mb-2 opacity-90">
              PHOSPHOR DISPLAY PALETTE:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    sound.playKeyClick();
                    onUpdateSettings({ theme: t.id });
                  }}
                  className={`p-2 border text-left flex items-center space-x-2 transition-all ${
                    settings.theme === t.id
                      ? 'border-[var(--crt-text-bright)] bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold'
                      : 'border-[var(--crt-border)] hover:border-[var(--crt-text-bright)]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black"
                    style={{ backgroundColor: t.colorHex }}
                  />
                  <span className="truncate">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[var(--crt-border)]">
            <button
              onClick={() => {
                sound.playKeyClick();
                onUpdateSettings({ scanlines: !settings.scanlines });
              }}
              className="p-2 border border-[var(--crt-border)] flex justify-between items-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)]"
            >
              <span>CRT SCANLINES:</span>
              <strong className="font-bold">{settings.scanlines ? '[ ON ]' : '[ OFF ]'}</strong>
            </button>

            <button
              onClick={() => {
                sound.playKeyClick();
                onUpdateSettings({ curvature: !settings.curvature });
              }}
              className="p-2 border border-[var(--crt-border)] flex justify-between items-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)]"
            >
              <span>CURVED MONITOR BEZEL:</span>
              <strong className="font-bold">{settings.curvature ? '[ ON ]' : '[ OFF ]'}</strong>
            </button>

            <button
              onClick={() => {
                sound.playKeyClick();
                onUpdateSettings({ glow: !settings.glow });
              }}
              className="p-2 border border-[var(--crt-border)] flex justify-between items-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)]"
            >
              <span>PHOSPHOR BLOOM GLOW:</span>
              <strong className="font-bold">{settings.glow ? '[ ON ]' : '[ OFF ]'}</strong>
            </button>

            <button
              onClick={() => {
                sound.playKeyClick();
                onUpdateSettings({ flicker: !settings.flicker });
              }}
              className="p-2 border border-[var(--crt-border)] flex justify-between items-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)]"
            >
              <span>RASTER SCAN FLICKER:</span>
              <strong className="font-bold">{settings.flicker ? '[ ON ]' : '[ OFF ]'}</strong>
            </button>

            <button
              onClick={() => {
                const nextVal = !settings.soundEnabled;
                sound.setEnabled(nextVal);
                if (nextVal) sound.playKeyClick();
                onUpdateSettings({ soundEnabled: nextVal });
              }}
              className="p-2 border border-[var(--crt-border)] flex justify-between items-center hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] col-span-1 sm:col-span-2"
            >
              <span>MECHANICAL KEYBOARD AUDIO FX:</span>
              <strong className="font-bold">{settings.soundEnabled ? '[ AUDIO ACTIVE ]' : '[ MUTED ]'}</strong>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-[var(--crt-border)] pt-3 flex justify-between items-center text-xs">
          <span className="opacity-70">Changes apply immediately in real time.</span>
          <button
            onClick={() => {
              sound.playKeyClick();
              onClose();
            }}
            className="px-4 py-1.5 bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold hover:opacity-90 uppercase"
          >
            CONFIRM & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
