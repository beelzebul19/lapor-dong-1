import React, { useEffect } from 'react';
import { WebApp } from '../../types';
import { sound } from '../../utils/audio';

interface AppDetailViewProps {
  app: WebApp;
  onRunDemo: (appId: string) => void;
  onBackToMenu: () => void;
  onEditApp?: (appId: string) => void;
}

export const AppDetailView: React.FC<AppDetailViewProps> = ({
  app,
  onRunDemo,
  onBackToMenu,
  onEditApp,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll('.overflow-y-auto').forEach((el) => {
      el.scrollTop = 0;
    });
  }, [app]);
  return (
    <div className="space-y-4 font-mono text-xs sm:text-sm select-none">
      {/* ASCII Art Title Banner */}
      {app.asciiArtBanner && (
        <div className="hidden sm:block text-[var(--crt-text-bright)] text-[9px] md:text-xs overflow-x-auto leading-tight text-center border-b border-[var(--crt-border)] pb-2">
          <pre className="inline-block text-left">{app.asciiArtBanner}</pre>
        </div>
      )}

      {/* Main Title Header Box */}
      <div className="border border-[var(--crt-border)] p-3 bg-[var(--crt-bg)] flex flex-wrap justify-between items-center gap-2">
        <div>
          <div className="text-base sm:text-lg font-bold text-[var(--crt-text-bright)]">
            OPTION {app.optionNumber}: {app.name} ({app.version})
          </div>
          <div className="text-xs opacity-80">
            Category: <strong className="text-[var(--crt-text-bright)]">{app.category}</strong> | System Job: <strong className="text-[var(--crt-text-bright)]">{app.systemJobName}</strong>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 border border-[var(--crt-border)] font-bold uppercase text-xs">
            STATUS: {app.status}
          </span>
        </div>
      </div>

      {/* Overview & Description */}
      <div className="border border-[var(--crt-border)] p-3 space-y-2">
        <div className="font-bold text-[var(--crt-text-bright)] uppercase tracking-wider border-b border-[var(--crt-border)] pb-1">
          APPLICATION OVERVIEW & ARCHITECTURE
        </div>
        <p className="opacity-90 leading-relaxed">
          {app.fullDescription}
        </p>
      </div>

      {/* Specifications & Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Specs Table */}
        <div className="border border-[var(--crt-border)] p-3 space-y-2">
          <div className="font-bold text-[var(--crt-text-bright)] uppercase tracking-wider border-b border-[var(--crt-border)] pb-1">
            HARDWARE & PERFORMANCE SPECS
          </div>
          <div className="space-y-1.5 text-xs">
            {app.specs.map((spec, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-[var(--crt-border)]/30 pb-1">
                <span className="opacity-70">{spec.label} . . . :</span>
                <span className="font-bold text-[var(--crt-text-bright)]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Table */}
        <div className="border border-[var(--crt-border)] p-3 space-y-2">
          <div className="font-bold text-[var(--crt-text-bright)] uppercase tracking-wider border-b border-[var(--crt-border)] pb-1">
            DEPLOYMENT TELEMETRY & USAGE
          </div>
          <div className="space-y-1.5 text-xs">
            {app.metrics.users && (
              <div className="flex justify-between items-center border-b border-[var(--crt-border)]/30 pb-1">
                <span className="opacity-70">ACTIVE USERS . . . . :</span>
                <span className="font-bold text-[var(--crt-text-bright)]">{app.metrics.users}</span>
              </div>
            )}
            {app.metrics.uptime && (
              <div className="flex justify-between items-center border-b border-[var(--crt-border)]/30 pb-1">
                <span className="opacity-70">SYSTEM UPTIME . . . . :</span>
                <span className="font-bold text-[var(--crt-text-bright)]">{app.metrics.uptime}</span>
              </div>
            )}
            {app.metrics.latency && (
              <div className="flex justify-between items-center border-b border-[var(--crt-border)]/30 pb-1">
                <span className="opacity-70">AVG RESPONSE TIME . . :</span>
                <span className="font-bold text-[var(--crt-text-bright)]">{app.metrics.latency}</span>
              </div>
            )}
            {app.metrics.requestsPerSec && (
              <div className="flex justify-between items-center border-b border-[var(--crt-border)]/30 pb-1">
                <span className="opacity-70">THROUGHPUT . . . . . :</span>
                <span className="font-bold text-[var(--crt-text-bright)]">{app.metrics.requestsPerSec}</span>
              </div>
            )}
            {app.metrics.accuracy && (
              <div className="flex justify-between items-center border-b border-[var(--crt-border)]/30 pb-1">
                <span className="opacity-70">MODEL ACCURACY . . . :</span>
                <span className="font-bold text-[var(--crt-text-bright)]">{app.metrics.accuracy}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Features & Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Features */}
        <div className="border border-[var(--crt-border)] p-3 space-y-2">
          <div className="font-bold text-[var(--crt-text-bright)] uppercase tracking-wider border-b border-[var(--crt-border)] pb-1">
            KEY CAPABILITIES & FEATURES
          </div>
          <ul className="space-y-1 text-xs list-none">
            {app.features.map((feat, idx) => (
              <li key={idx} className="flex items-start space-x-1.5">
                <span className="text-[var(--crt-text-bright)] font-bold">&gt;</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="border border-[var(--crt-border)] p-3 space-y-2">
          <div className="font-bold text-[var(--crt-text-bright)] uppercase tracking-wider border-b border-[var(--crt-border)] pb-1">
            TECHNOLOGY STACK
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {app.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 border border-[var(--crt-border)] bg-[var(--crt-bg)] text-xs font-bold text-[var(--crt-text-bright)] uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="border-t-2 border-[var(--crt-border)] pt-3 flex flex-wrap items-center justify-between gap-2">
        <button
          onClick={() => {
            sound.playKeyClick();
            onBackToMenu();
          }}
          className="px-3 py-1.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] font-bold uppercase transition-colors"
        >
          &lt;-- [F3] MAIN MENU
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {app.repoUrl && (
            <a
              href={app.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playKeyClick()}
              className="px-3 py-1.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] font-bold uppercase transition-colors"
            >
              [GITHUB REPO] &#8599;
            </a>
          )}

          {app.liveUrl && (
            <a
              href={app.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playKeyClick()}
              className="px-3 py-1.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] font-bold uppercase transition-colors"
            >
              [OPEN LIVE SITE] &#8599;
            </a>
          )}

          {onEditApp && (
            <button
              onClick={() => {
                sound.playKeyClick();
                onEditApp(app.id);
              }}
              className="px-3 py-1.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] font-bold uppercase transition-colors"
            >
              [EDIT APP]
            </button>
          )}

          <button
            onClick={() => {
              sound.playEnterKey();
              onRunDemo(app.id);
            }}
            className="px-4 py-1.5 bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold hover:opacity-90 uppercase tracking-wider"
          >
            [ RUN TERMINAL DEMO SIMULATOR ] &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
