import React, { useState, useEffect } from 'react';
import { WebApp } from '../../types';
import { sound } from '../../utils/audio';

interface EditAppsViewProps {
  apps: WebApp[];
  initialAppId?: string;
  onSaveApp: (updatedApp: WebApp) => void;
  onResetDefaults: () => void;
  onBackToMenu: () => void;
}

export const EditAppsView: React.FC<EditAppsViewProps> = ({
  apps,
  initialAppId,
  onSaveApp,
  onResetDefaults,
  onBackToMenu,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll('.overflow-y-auto').forEach((el) => {
      el.scrollTop = 0;
    });
  }, []);
  const [selectedAppId, setSelectedAppId] = useState<string>(
    initialAppId || apps[0]?.id || 'app-datacore'
  );

  const selectedApp = apps.find((a) => a.id === selectedAppId) || apps[0];

  const [formData, setFormData] = useState<WebApp>(selectedApp);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSelectAppChange = (appId: string) => {
    sound.playKeyClick();
    setSelectedAppId(appId);
    const target = apps.find((a) => a.id === appId);
    if (target) {
      setFormData(target);
    }
    setSavedNotice(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playEnterKey();
    onSaveApp(formData);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-4 font-mono text-xs sm:text-sm select-none">
      {/* Title */}
      <div className="border border-[var(--crt-border)] p-2 bg-[var(--crt-bg)] text-center font-bold text-[var(--crt-text-bright)] uppercase tracking-wider">
        APPLICATION CONFIGURATION EDITOR [EDTF / OPT 5]
      </div>

      {/* Select App to Edit */}
      <div className="flex flex-wrap items-center justify-between gap-2 border border-[var(--crt-border)] p-2 bg-[var(--crt-bg)]">
        <span className="font-bold text-[var(--crt-text-bright)]">SELECT APP TO MODIFY:</span>
        <div className="flex gap-2">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => handleSelectAppChange(app.id)}
              className={`px-2 py-1 border text-xs font-bold ${
                selectedAppId === app.id
                  ? 'border-[var(--crt-text-bright)] bg-[var(--crt-text)] text-[var(--crt-bg)]'
                  : 'border-[var(--crt-border)] hover:border-[var(--crt-text-bright)]'
              }`}
            >
              OPT {app.optionNumber}: {app.codeName}
            </button>
          ))}
        </div>
      </div>

      {savedNotice && (
        <div className="border border-[var(--crt-text-bright)] p-2 text-center bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold animate-pulse">
          *** APPLICATION DATA SUCCESSFULLY SAVED & UPDATED IN AS/400 SYSTEM ***
        </div>
      )}

      {/* Form Editor */}
      <form onSubmit={handleSubmit} className="border border-[var(--crt-border)] p-3 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block font-bold opacity-80 mb-1">APP TITLE / NAME:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black border border-[var(--crt-border)] p-1.5 text-[var(--crt-text-bright)] font-mono outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold opacity-80 mb-1">CATEGORY:</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-black border border-[var(--crt-border)] p-1.5 text-[var(--crt-text-bright)] font-mono outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold opacity-80 mb-1">SHORT SUMMARY DESCRIPTION:</label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full bg-black border border-[var(--crt-border)] p-1.5 text-[var(--crt-text-bright)] font-mono outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold opacity-80 mb-1">FULL ARCHITECTURE DESCRIPTION:</label>
            <textarea
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              rows={3}
              className="w-full bg-black border border-[var(--crt-border)] p-1.5 text-[var(--crt-text-bright)] font-mono outline-none resize-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold opacity-80 mb-1">TECH STACK (COMMA SEPARATED):</label>
            <input
              type="text"
              value={formData.techStack.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
              className="w-full bg-black border border-[var(--crt-border)] p-1.5 text-[var(--crt-text-bright)] font-mono outline-none"
            />
          </div>

          <div>
            <label className="block font-bold opacity-80 mb-1">LIVE DEMO SITE URL:</label>
            <input
              type="text"
              value={formData.liveUrl || ''}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full bg-black border border-[var(--crt-border)] p-1.5 text-[var(--crt-text-bright)] font-mono outline-none"
            />
          </div>

          <div>
            <label className="block font-bold opacity-80 mb-1">GITHUB REPOSITORY URL:</label>
            <input
              type="text"
              value={formData.repoUrl || ''}
              onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
              className="w-full bg-black border border-[var(--crt-border)] p-1.5 text-[var(--crt-text-bright)] font-mono outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-3 border-t border-[var(--crt-border)] flex flex-wrap justify-between items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playKeyClick();
              onResetDefaults();
              setSavedNotice(true);
            }}
            className="px-3 py-1.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] text-xs font-bold uppercase"
          >
            [ RESET TO DEFAULTS ]
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playKeyClick();
                onBackToMenu();
              }}
              className="px-3 py-1.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] text-xs font-bold uppercase"
            >
              [F3] CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold text-xs uppercase hover:opacity-90"
            >
              [ SAVE CHANGES ]
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
