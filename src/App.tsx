/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  WebApp,
  CrtSettings,
  TerminalViewMode,
  TerminalLog,
} from './types';
import { INITIAL_WEB_APPS } from './data/apps';
import { CrtOverlay } from './components/CrtOverlay';
import { TerminalHeader } from './components/TerminalHeader';
import { TerminalFooter } from './components/TerminalFooter';
import { CrtSettingsModal } from './components/CrtSettingsModal';
import { MainMenuView } from './components/Views/MainMenuView';
import { AppDetailView } from './components/Views/AppDetailView';
import { AppRunnerView } from './components/Views/AppRunnerView';
import { SysInfoView } from './components/Views/SysInfoView';
import { HelpManualView } from './components/Views/HelpManualView';
import { EditAppsView } from './components/Views/EditAppsView';
import { BootSequenceView } from './components/Views/BootSequenceView';
import { MatrixRainView } from './components/Views/MatrixRainView';
import { sound } from './utils/audio';

export default function App() {
  // Load initial apps from localStorage or fallback, syncing updated app configs
  const [apps, setApps] = useState<WebApp[]>(() => {
    try {
      const saved = localStorage.getItem('AS400_SHOWCASE_APPS');
      if (!saved) return INITIAL_WEB_APPS;
      const parsed: WebApp[] = JSON.parse(saved);
      // Migrate / sync app-datacore and app-cyberforge if old cached version is present
      return parsed.map((app) => {
        if (app.id === 'app-datacore' || app.name.includes('DATA_CORE') || app.codeName === 'DATCORE') {
          return { ...app, ...INITIAL_WEB_APPS[0] };
        }
        if (app.id === 'app-cyberforge' || app.name.includes('CYBER_FORGE') || app.codeName === 'CYBFORGE') {
          return { ...app, ...INITIAL_WEB_APPS[1] };
        }
        if (app.id === 'app-neuralgrid' || app.name.includes('NEURAL_GRID') || app.codeName === 'NEUGRID') {
          return { ...app, ...INITIAL_WEB_APPS[2] };
        }
        return app;
      });
    } catch {
      return INITIAL_WEB_APPS;
    }
  });

  const [currentView, setCurrentView] = useState<TerminalViewMode>('MAIN_MENU');
  const [selectedAppId, setSelectedAppId] = useState<string>('app-datacore');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [logs, setLogs] = useState<TerminalLog[]>([]);

  // CRT Settings
  const [crtSettings, setCrtSettings] = useState<CrtSettings>(() => {
    try {
      const saved = localStorage.getItem('AS400_CRT_SETTINGS');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          scanlines: true,
          curvature: true,
          glow: true,
          flicker: false,
          soundEnabled: true,
          theme: 'cyan',
          ...parsed,
        };
      }
      return {
        scanlines: true,
        curvature: true,
        glow: true,
        flicker: false,
        soundEnabled: true,
        theme: 'cyan',
      };
    } catch {
      return {
        scanlines: true,
        curvature: true,
        glow: true,
        flicker: false,
        soundEnabled: true,
        theme: 'cyan',
      };
    }
  });

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('AS400_SHOWCASE_APPS', JSON.stringify(apps));
    } catch {
      // ignore
    }
  }, [apps]);

  useEffect(() => {
    try {
      localStorage.setItem('AS400_CRT_SETTINGS', JSON.stringify(crtSettings));
    } catch {
      // ignore
    }
  }, [crtSettings]);

  const mainContentRef = React.useRef<HTMLDivElement>(null);

  // Always reset scroll position to top when page/view or active app changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    document.querySelectorAll('.overflow-y-auto').forEach((el) => {
      el.scrollTop = 0;
    });
  }, [currentView, selectedAppId]);

  const activeApp = apps.find((a) => a.id === selectedAppId) || apps[0];

  const addLog = (type: TerminalLog['type'], text: string) => {
    const newLog: TerminalLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type,
      text,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 50));
  };

  // Command Processor
  const handleCommandSubmit = (rawCmd: string) => {
    const cmd = rawCmd.trim().toUpperCase();
    setLastCommand(rawCmd);

    if (!cmd) return;

    addLog('COMMAND', `===> ${cmd}`);

    // Option 1, 2, 3
    if (cmd === '1' || cmd === 'OPT 1' || cmd === 'APP 1' || cmd === 'DATCORE' || cmd === 'PANTAU' || cmd === 'PANTAU_ISU') {
      addLog('RESPONSE', 'REDIRECTING TO OPTION 1: https://pantau-isu.vercel.app/');
      const newWin = window.open('https://pantau-isu.vercel.app/', '_blank');
      if (!newWin) {
        window.location.href = 'https://pantau-isu.vercel.app/';
      }
      return;
    }

    if (cmd === '2' || cmd === 'OPT 2' || cmd === 'APP 2' || cmd === 'CYBFORGE' || cmd === 'BAGI' || cmd === 'NARASI' || cmd === 'BAGI_NARASI') {
      addLog('RESPONSE', 'REDIRECTING TO OPTION 2: https://bagi-narasi.base44.app/');
      const newWin = window.open('https://bagi-narasi.base44.app/', '_blank');
      if (!newWin) {
        window.location.href = 'https://bagi-narasi.base44.app/';
      }
      return;
    }

    if (cmd === '3' || cmd === 'OPT 3' || cmd === 'APP 3' || cmd === 'NEUGRID' || cmd === 'LAPOR' || cmd === 'LAPOR_DONG') {
      addLog('RESPONSE', 'REDIRECTING TO OPTION 3: https://lapor-dong.base44.app');
      const newWin = window.open('https://lapor-dong.base44.app', '_blank');
      if (!newWin) {
        window.location.href = 'https://lapor-dong.base44.app';
      }
      return;
    }

    // Launch / Run commands (e.g. LAUNCH 1, RUN 2, DEMO 3)
    if (cmd.startsWith('LAUNCH') || cmd.startsWith('RUN') || cmd.startsWith('DEMO')) {
      const parts = cmd.split(' ');
      const targetNum = parseInt(parts[1] || '1', 10);
      if (targetNum >= 1 && targetNum <= apps.length) {
        const targetApp = apps[targetNum - 1];
        if (targetApp) {
          setSelectedAppId(targetApp.id);
          setCurrentView('APP_RUNNER');
          addLog('SUCCESS', `EXECUTING DEMO SIMULATOR FOR ${targetApp.name}`);
          return;
        }
      }
    }

    // System Utilities
    if (cmd === '4' || cmd === 'DSPSYS' || cmd === 'STATUS' || cmd === 'SYS') {
      setCurrentView('SYS_INFO');
      addLog('RESPONSE', 'OPENING SYSTEM DIAGNOSTICS [DSPSYS]');
      return;
    }

    if (cmd === '5' || cmd === 'EDTF' || cmd === 'EDIT') {
      setCurrentView('EDIT_APPS');
      addLog('RESPONSE', 'OPENING APPLICATION EDITOR [EDTF]');
      return;
    }

    if (cmd === '6' || cmd === 'HELP' || cmd === 'MANUAL' || cmd === '?') {
      setCurrentView('HELP_MANUAL');
      addLog('RESPONSE', 'OPENING OPERATOR MANUAL [HELP]');
      return;
    }

    if (cmd === '7' || cmd === 'MATRIX') {
      setCurrentView('MATRIX_RAIN');
      addLog('RESPONSE', 'INITIALIZING MATRIX NEURAL DATA STREAM');
      return;
    }

    if (cmd === '8' || cmd === 'REBOOT' || cmd === 'BOOT' || cmd === 'IPL') {
      setCurrentView('IPL_BOOT');
      addLog('RESPONSE', 'RE-INITIALIZING AS/400 SYSTEM IPL');
      return;
    }

    if (cmd === '10' || cmd === 'CRT' || cmd === 'SETTINGS' || cmd === 'F10') {
      setIsSettingsOpen(true);
      addLog('RESPONSE', 'OPENING CRT DISPLAY SETTINGS');
      return;
    }

    // Color themes
    if (cmd === 'THEME GREEN') {
      setCrtSettings((s) => ({ ...s, theme: 'green' }));
      addLog('SUCCESS', 'CHANGED PALETTE TO GREEN PHOSPHORUS');
      return;
    }
    if (cmd === 'THEME AMBER') {
      setCrtSettings((s) => ({ ...s, theme: 'amber' }));
      addLog('SUCCESS', 'CHANGED PALETTE TO AMBER PHOSPHORUS');
      return;
    }
    if (cmd === 'THEME CYAN') {
      setCrtSettings((s) => ({ ...s, theme: 'cyan' }));
      addLog('SUCCESS', 'CHANGED PALETTE TO CYAN TERMINAL');
      return;
    }
    if (cmd === 'THEME WHITE') {
      setCrtSettings((s) => ({ ...s, theme: 'white' }));
      addLog('SUCCESS', 'CHANGED PALETTE TO WHITE PHOSPHORUS');
      return;
    }

    if (cmd === 'CLEAR' || cmd === 'CLS') {
      setCurrentView('MAIN_MENU');
      setLogs([]);
      addLog('SYSTEM', 'SCREEN CLEARED - RETURNED TO MAIN MENU');
      return;
    }

    if (cmd === 'BEEP') {
      sound.playErrorBeep();
      addLog('SYSTEM', 'TESTING 1000HZ VINTAGE BELL BEEP');
      return;
    }

    // Unrecognized command handling
    sound.playErrorBeep();
    addLog('ERROR', `CPF0001: Command '${cmd}' not recognized in library *LIBL. Type HELP for manual.`);
  };

  // Function Key Handler
  const handleFKeyPress = (fKey: number) => {
    switch (fKey) {
      case 1:
        setCurrentView('HELP_MANUAL');
        addLog('RESPONSE', 'F1 KEY: HELP OPERATOR MANUAL');
        break;
      case 3:
      case 12:
        setCurrentView('MAIN_MENU');
        addLog('RESPONSE', 'F3/F12 KEY: RETURNED TO MAIN MENU');
        break;
      case 4:
        addLog('SYSTEM', 'F4 KEY: PROMPT READY AT ===>');
        break;
      case 5:
        setApps(INITIAL_WEB_APPS);
        addLog('SUCCESS', 'F5 KEY: REFRESHED SYSTEM DATA TO INITIAL STATE');
        break;
      case 7: {
        const currentIdx = apps.findIndex((a) => a.id === selectedAppId);
        const prevIdx = (currentIdx - 1 + apps.length) % apps.length;
        setSelectedAppId(apps[prevIdx].id);
        setCurrentView('APP_DETAIL');
        addLog('RESPONSE', `F7 KEY: PREVIOUS APP selected (${apps[prevIdx].name})`);
        break;
      }
      case 8: {
        const currentIdx = apps.findIndex((a) => a.id === selectedAppId);
        const nextIdx = (currentIdx + 1) % apps.length;
        setSelectedAppId(apps[nextIdx].id);
        setCurrentView('APP_DETAIL');
        addLog('RESPONSE', `F8 KEY: NEXT APP selected (${apps[nextIdx].name})`);
        break;
      }
      case 9:
        if (lastCommand) {
          addLog('SYSTEM', `F9 KEY: RETRIEVED COMMAND '${lastCommand}'`);
        }
        break;
      case 10:
        setIsSettingsOpen(true);
        addLog('RESPONSE', 'F10 KEY: DISPLAY SETTINGS MODAL OPENED');
        break;
      default:
        break;
    }
  };

  return (
    <CrtOverlay
      settings={crtSettings}
      onTogglePower={() => setCurrentView('IPL_BOOT')}
      onToggleSound={() => {
        const next = !crtSettings.soundEnabled;
        sound.setEnabled(next);
        setCrtSettings((s) => ({ ...s, soundEnabled: next }));
      }}
      onOpenSettings={() => setIsSettingsOpen(true)}
    >
      {/* Top Terminal Header */}
      <TerminalHeader
        currentView={currentView}
        activeAppTitle={activeApp?.name}
      />

      {/* Main Content View Switcher */}
      <div ref={mainContentRef} className="flex-1 my-2 overflow-y-auto pr-1">
        {currentView === 'MAIN_MENU' && (
          <MainMenuView
            apps={apps}
            onSelectOption={(num) => {
              if (num === 1) {
                addLog('RESPONSE', 'REDIRECTING TO OPTION 1: https://pantau-isu.vercel.app/');
                const newWin = window.open('https://pantau-isu.vercel.app/', '_blank');
                if (!newWin) {
                  window.location.href = 'https://pantau-isu.vercel.app/';
                }
                return;
              }
              if (num === 2) {
                addLog('RESPONSE', 'REDIRECTING TO OPTION 2: https://bagi-narasi.base44.app/');
                const newWin = window.open('https://bagi-narasi.base44.app/', '_blank');
                if (!newWin) {
                  window.location.href = 'https://bagi-narasi.base44.app/';
                }
                return;
              }
              if (num === 3) {
                addLog('RESPONSE', 'REDIRECTING TO OPTION 3: https://lapor-dong.base44.app');
                const newWin = window.open('https://lapor-dong.base44.app', '_blank');
                if (!newWin) {
                  window.location.href = 'https://lapor-dong.base44.app';
                }
                return;
              }
              const target = apps[num - 1];
              if (target) {
                setSelectedAppId(target.id);
                setCurrentView('APP_DETAIL');
              }
            }}
            onSelectCommand={(cmd) => handleCommandSubmit(cmd)}
          />
        )}

        {currentView === 'APP_DETAIL' && (
          <AppDetailView
            app={activeApp}
            onRunDemo={(id) => {
              setSelectedAppId(id);
              setCurrentView('APP_RUNNER');
            }}
            onBackToMenu={() => setCurrentView('MAIN_MENU')}
            onEditApp={(id) => {
              setSelectedAppId(id);
              setCurrentView('EDIT_APPS');
            }}
          />
        )}

        {currentView === 'APP_RUNNER' && (
          <AppRunnerView
            app={activeApp}
            onBackToDetail={() => setCurrentView('APP_DETAIL')}
            onBackToMenu={() => setCurrentView('MAIN_MENU')}
          />
        )}

        {currentView === 'SYS_INFO' && (
          <SysInfoView onBackToMenu={() => setCurrentView('MAIN_MENU')} />
        )}

        {currentView === 'HELP_MANUAL' && (
          <HelpManualView onBackToMenu={() => setCurrentView('MAIN_MENU')} />
        )}

        {currentView === 'EDIT_APPS' && (
          <EditAppsView
            apps={apps}
            initialAppId={selectedAppId}
            onSaveApp={(updatedApp) => {
              setApps((prev) =>
                prev.map((a) => (a.id === updatedApp.id ? updatedApp : a))
              );
            }}
            onResetDefaults={() => {
              setApps(INITIAL_WEB_APPS);
            }}
            onBackToMenu={() => setCurrentView('MAIN_MENU')}
          />
        )}

        {currentView === 'IPL_BOOT' && (
          <BootSequenceView onComplete={() => setCurrentView('MAIN_MENU')} />
        )}

        {currentView === 'MATRIX_RAIN' && (
          <MatrixRainView onExit={() => setCurrentView('MAIN_MENU')} />
        )}
      </div>

      {/* Terminal Footer with Command Input and Function Keys */}
      <TerminalFooter
        onCommandSubmit={handleCommandSubmit}
        onFKeyPress={handleFKeyPress}
        lastCommand={lastCommand}
      />

      {/* CRT Settings Modal */}
      {isSettingsOpen && (
        <CrtSettingsModal
          settings={crtSettings}
          onUpdateSettings={(newPartial) =>
            setCrtSettings((prev) => ({ ...prev, ...newPartial }))
          }
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </CrtOverlay>
  );
}
