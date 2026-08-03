import React, { useEffect } from 'react';
import { WebApp } from '../../types';
import { sound } from '../../utils/audio';

interface MainMenuViewProps {
  apps: WebApp[];
  onSelectOption: (optionNumber: number) => void;
  onSelectCommand: (cmd: string) => void;
}

export const MainMenuView: React.FC<MainMenuViewProps> = ({
  apps,
  onSelectOption,
  onSelectCommand,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll('.overflow-y-auto').forEach((el) => {
      el.scrollTop = 0;
    });
  }, []);
  return (
    <div className="space-y-4 font-mono text-xs sm:text-sm select-none">
      {/* ASCII Logo Header */}
      <div className="hidden sm:block text-center text-[var(--crt-text-bright)] opacity-90 leading-tight font-mono text-[10px] md:text-xs overflow-x-auto py-1">
        <pre className="inline-block text-left">
{` _   _  _____  __  __   _____  _____  _____  _   _  _      _____ 
| | | |/  _  \\ \\ \\/ /  |  _  \\/  _  \\|  _  \\| | | || |    |_   _|
| | | || | | |  \\  /   | |_| || | | || |_| || | | || |      | |  
\\ \\_/ /| |_| |  /  \\   |  ___/| |_| ||  ___/| |_| || |___  _| |_ 
 \\___/ \\_____/ /_/\\_\\  |_|    \\_____/|_|    \\_____/|_____||_____|`}
        </pre>
      </div>

      {/* Main Subtitle banner */}
      <div className="border border-[var(--crt-border)] bg-[var(--crt-bg)] p-2 text-center font-bold text-[var(--crt-text-bright)] tracking-wider">
        SELECT ONE OF THE FOLLOWING WEB APPLICATIONS OR SYSTEM COMMANDS
      </div>

      {/* App Showcase Options Grid (Options 1 - 3) */}
      <div className="space-y-3">
        <div className="text-xs uppercase font-bold text-[var(--crt-text-bright)] border-b border-[var(--crt-border)] pb-1 flex justify-between">
          <span>SHOWCASE WEB APPLICATIONS</span>
          <span className="hidden sm:inline opacity-75">TYPE OPTION NUMBER OR CLICK ENTRY</span>
        </div>

        {apps.map((app) => (
          <div
            key={app.id}
            onClick={() => {
              sound.playKeyClick();
              onSelectOption(app.optionNumber);
            }}
            className="group border border-[var(--crt-border)] p-2 sm:p-3 hover:border-[var(--crt-text-bright)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-all cursor-pointer relative"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm sm:text-base px-2 py-0.5 bg-[var(--crt-text)] text-[var(--crt-bg)] group-hover:bg-[var(--crt-bg)] group-hover:text-[var(--crt-text-bright)]">
                  OPTION {app.optionNumber}
                </span>
                <span className="font-bold text-sm sm:text-base tracking-wide group-hover:text-[var(--crt-bg)]">
                  {app.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 border border-current opacity-80 uppercase">
                  {app.codeName}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="opacity-75">{app.category}</span>
                <span className="font-bold border border-current px-1.5 py-0.5 text-[11px]">
                  [{app.status}]
                </span>
              </div>
            </div>

            <p className="text-xs opacity-90 line-clamp-2 my-1.5 group-hover:opacity-100">
              {app.shortDescription}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1 border-t border-[var(--crt-border)]/40 group-hover:border-[var(--crt-bg)]/40">
              <div className="flex flex-wrap gap-1">
                {app.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.2 bg-[var(--crt-bg)]/30 border border-[var(--crt-border)]/60 text-[10px] group-hover:border-[var(--crt-bg)] group-hover:text-[var(--crt-bg)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <span className="font-bold tracking-wider group-hover:underline">
                {app.optionNumber === 1 || app.optionNumber === 2 || app.optionNumber === 3 ? `[PRESS ${app.optionNumber} TO LAUNCH SITE] ↗` : `[PRESS ${app.optionNumber} TO INSPECT & RUN] →`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* System Command Options (Options 4 - 8) */}
      <div className="pt-2 space-y-2">
        <div className="text-xs uppercase font-bold text-[var(--crt-text-bright)] border-b border-[var(--crt-border)] pb-1">
          SYSTEM UTILITIES & COMMANDS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <button
            onClick={() => {
              sound.playKeyClick();
              onSelectCommand('4');
            }}
            className="p-2 border border-[var(--crt-border)] text-left hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors flex items-center justify-between"
          >
            <span><strong>OPT 4.</strong> SYSTEM DIAGNOSTICS</span>
            <span className="text-[10px] opacity-80">[DSPSYS]</span>
          </button>

          <button
            onClick={() => {
              sound.playKeyClick();
              onSelectCommand('5');
            }}
            className="p-2 border border-[var(--crt-border)] text-left hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors flex items-center justify-between"
          >
            <span><strong>OPT 5.</strong> CUSTOMIZE / EDIT APPS</span>
            <span className="text-[10px] opacity-80">[EDTF]</span>
          </button>

          <button
            onClick={() => {
              sound.playKeyClick();
              onSelectCommand('6');
            }}
            className="p-2 border border-[var(--crt-border)] text-left hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors flex items-center justify-between"
          >
            <span><strong>OPT 6.</strong> TERMINAL OPERATOR MANUAL</span>
            <span className="text-[10px] opacity-80">[HELP]</span>
          </button>

          <button
            onClick={() => {
              sound.playKeyClick();
              onSelectCommand('7');
            }}
            className="p-2 border border-[var(--crt-border)] text-left hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors flex items-center justify-between"
          >
            <span><strong>OPT 7.</strong> MATRIX DATA RAIN</span>
            <span className="text-[10px] opacity-80">[MATRIX]</span>
          </button>

          <button
            onClick={() => {
              sound.playKeyClick();
              onSelectCommand('8');
            }}
            className="p-2 border border-[var(--crt-border)] text-left hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors flex items-center justify-between"
          >
            <span><strong>OPT 8.</strong> SYSTEM BOOT SEQUENCE</span>
            <span className="text-[10px] opacity-80">[REBOOT]</span>
          </button>

          <button
            onClick={() => {
              sound.playKeyClick();
              onSelectCommand('10');
            }}
            className="p-2 border border-[var(--crt-border)] text-left hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] transition-colors flex items-center justify-between"
          >
            <span><strong>OPT 10.</strong> CRT / COLOR SETTINGS</span>
            <span className="text-[10px] opacity-80">[F10]</span>
          </button>
        </div>
      </div>
    </div>
  );
};
