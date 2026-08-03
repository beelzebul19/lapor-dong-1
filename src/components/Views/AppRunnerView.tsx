import React, { useState, useEffect } from 'react';
import { WebApp } from '../../types';
import { sound } from '../../utils/audio';

interface AppRunnerViewProps {
  app: WebApp;
  onBackToDetail: () => void;
  onBackToMenu: () => void;
}

export const AppRunnerView: React.FC<AppRunnerViewProps> = ({
  app,
  onBackToDetail,
  onBackToMenu,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.querySelectorAll('.overflow-y-auto').forEach((el) => {
      el.scrollTop = 0;
    });
  }, [app]);
  // Demo 1: Analytics Simulator States
  const [streamActive, setStreamActive] = useState(true);
  const [telemetryEvents, setTelemetryEvents] = useState<number[]>([]);
  const [anomalyCount, setAnomalyCount] = useState(0);

  // Demo 2: AI Code Prompt Simulator States
  const [promptText, setPromptText] = useState('Create TypeScript Rate Limiter Middleware');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(`// CYBER_FORGE AI OUTPUT [TS / Node.js]
import { Request, Response, NextFunction } from 'express';

export function createRateLimiter(maxRequests: number, windowMs: number) {
  const ipHits = new Map<string, { count: number; resetTime: number }>();
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || '127.0.0.1';
    const now = Date.now();
    const hit = ipHits.get(ip) || { count: 0, resetTime: now + windowMs };
    if (now > hit.resetTime) { hit.count = 0; hit.resetTime = now + windowMs; }
    hit.count++;
    ipHits.set(ip, hit);
    if (hit.count > maxRequests) return res.status(429).json({ error: 'Too Many Requests' });
    next();
  };
}`);

  // Demo 3: Node Canvas Simulator States
  const [activeNode, setActiveNode] = useState<string | null>('Node #1: Auth Service');
  const [nodes, setNodes] = useState([
    { id: '1', name: 'Auth Gateway', status: 'OK', pingMs: 4, x: 10, y: 20 },
    { id: '2', name: 'Database Cluster', status: 'OK', pingMs: 2, x: 40, y: 15 },
    { id: '3', name: 'Analytics Pipeline', status: 'SYNCING', pingMs: 12, x: 70, y: 35 },
    { id: '4', name: 'Cache Layer (Redis)', status: 'OK', pingMs: 1, x: 30, y: 60 },
  ]);

  // Telemetry stream generator for App 1
  useEffect(() => {
    if (app.demoType !== 'ANALYTICS_SIM' || !streamActive) return;

    const interval = setInterval(() => {
      const val = Math.floor(Math.random() * 80) + 20;
      setTelemetryEvents((prev) => {
        const next = [...prev, val];
        if (next.length > 25) next.shift();
        return next;
      });

      if (val > 85) {
        setAnomalyCount((c) => c + 1);
        sound.playErrorBeep();
      }
    }, 400);

    return () => clearInterval(interval);
  }, [app.demoType, streamActive]);

  // AI Prompt generator logic for App 2
  const handleGenerateAiCode = (customPrompt?: string) => {
    const promptToUse = customPrompt || promptText;
    setIsGenerating(true);
    sound.playKeyClick();

    setTimeout(() => {
      if (promptToUse.toLowerCase().includes('graphql') || promptToUse.toLowerCase().includes('schema')) {
        setGeneratedCode(`// CYBER_FORGE GENERATED GRAPHQL SCHEMA
type Application {
  id: ID!
  name: String!
  codeName: String!
  version: String!
  status: SystemStatus!
}

enum SystemStatus { ONLINE, DEPLOYED, MAINTENANCE }

type Query {
  getApplication(id: ID!): Application
  listApplications: [Application!]!
}`);
      } else if (promptToUse.toLowerCase().includes('refactor') || promptToUse.toLowerCase().includes('hook')) {
        setGeneratedCode(`// CYBER_FORGE REFACTORED REACT HOOK
import { useState, useEffect, useCallback } from 'react';

export function useSystemTelemetry(pollInterval = 1000) {
  const [metrics, setMetrics] = useState({ cpu: 0, memory: 0 });
  
  const fetchMetrics = useCallback(async () => {
    const res = await fetch('/api/telemetry');
    const data = await res.json();
    setMetrics(data);
  }, []);

  useEffect(() => {
    const timer = setInterval(fetchMetrics, pollInterval);
    return () => clearInterval(timer);
  }, [fetchMetrics, pollInterval]);

  return metrics;
}`);
      } else {
        setGeneratedCode(`// CYBER_FORGE AI SYNTHESIZED CONTRACT
export interface CustomWorkerConfig {
  workerId: string;
  concurrency: number;
  retryAttempts: number;
  timeoutMs: number;
}

export async function processJobQueue(config: CustomWorkerConfig): Promise<boolean> {
  console.log(\`[FORGE] Processing job queue on \${config.workerId}\`);
  return true;
}`);
      }
      setIsGenerating(false);
      sound.playEnterKey();
    }, 600);
  };

  return (
    <div className="space-y-4 font-mono text-xs sm:text-sm select-none">
      {/* Runner Bar */}
      <div className="border border-[var(--crt-border)] p-2 bg-[var(--crt-bg)] flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[var(--crt-text-bright)]">
            EXECUTION MODE: {app.name}
          </span>
          <span className="text-[10px] px-2 py-0.5 border border-[var(--crt-border)] animate-pulse">
            [LIVE SIMULATOR ATTACHED]
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              sound.playKeyClick();
              onBackToDetail();
            }}
            className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] text-xs font-bold uppercase"
          >
            [F7] APP SPECS
          </button>
          <button
            onClick={() => {
              sound.playKeyClick();
              onBackToMenu();
            }}
            className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] text-xs font-bold uppercase"
          >
            [F3] MAIN MENU
          </button>
        </div>
      </div>

      {/* DEMO TYPE 1: DATA_CORE TELEMETRY STREAM SIMULATOR */}
      {app.demoType === 'ANALYTICS_SIM' && (
        <div className="space-y-3">
          <div className="border border-[var(--crt-border)] p-3 space-y-3">
            <div className="flex justify-between items-center border-b border-[var(--crt-border)] pb-2">
              <span className="font-bold text-[var(--crt-text-bright)] uppercase">
                REALTIME EVENT STREAM SPARKLINE (EVENTS / SEC)
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    sound.playKeyClick();
                    setStreamActive(!streamActive);
                  }}
                  className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] font-bold text-xs"
                >
                  {streamActive ? '[ PAUSE STREAM ]' : '[ RESUME STREAM ]'}
                </button>
                <button
                  onClick={() => {
                    sound.playErrorBeep();
                    setTelemetryEvents((prev) => [...prev, 98]);
                    setAnomalyCount((c) => c + 1);
                  }}
                  className="px-2 py-0.5 bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold text-xs"
                >
                  [ TRIGGER ANOMALY ]
                </button>
              </div>
            </div>

            {/* ASCII Chart Renderer */}
            <div className="bg-[var(--crt-bg)] border border-[var(--crt-border)] p-3 space-y-1">
              <div className="flex justify-between text-[11px] opacity-70">
                <span>100 EVENTS/S -|</span>
                <span>ANOMALY THRESHOLD: 85</span>
              </div>
              
              <div className="h-32 flex items-end justify-between space-x-1 border-b border-l border-[var(--crt-border)] p-1">
                {telemetryEvents.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full"
                  >
                    <div
                      className={`w-full transition-all duration-300 ${
                        val > 85
                          ? 'bg-[var(--crt-text-bright)] border-t-2 border-white'
                          : 'bg-[var(--crt-text-dim)] hover:bg-[var(--crt-text)]'
                      }`}
                      style={{ height: `${val}%` }}
                      title={`Time point ${idx}: ${val} events/s`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-[10px] opacity-60 pt-1">
                <span>T-30s</span>
                <span>T-15s</span>
                <span>NOW (LIVE STREAM)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
              <div className="border border-[var(--crt-border)] p-2">
                <span className="opacity-70 block text-[10px]">CURRENT RATE:</span>
                <strong className="font-bold text-[var(--crt-text-bright)] text-sm">
                  {telemetryEvents[telemetryEvents.length - 1] || 0} evt/s
                </strong>
              </div>
              <div className="border border-[var(--crt-border)] p-2">
                <span className="opacity-70 block text-[10px]">ANOMALIES DETECTED:</span>
                <strong className="font-bold text-[var(--crt-text-bright)] text-sm">
                  {anomalyCount}
                </strong>
              </div>
              <div className="border border-[var(--crt-border)] p-2">
                <span className="opacity-70 block text-[10px]">AVG LATENCY:</span>
                <strong className="font-bold text-[var(--crt-text-bright)] text-sm">
                  1.42 ms
                </strong>
              </div>
              <div className="border border-[var(--crt-border)] p-2">
                <span className="opacity-70 block text-[10px]">STREAM BUFFER:</span>
                <strong className="font-bold text-[var(--crt-text-bright)] text-sm">
                  {telemetryEvents.length} / 25
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEMO TYPE 2: CYBER_FORGE AI PROMPT SIMULATOR */}
      {app.demoType === 'AI_PROMPT_SIM' && (
        <div className="space-y-3">
          <div className="border border-[var(--crt-border)] p-3 space-y-3">
            <div className="font-bold text-[var(--crt-text-bright)] uppercase border-b border-[var(--crt-border)] pb-2">
              NEURAL ARCHITECTURE CODE SYNTHESIZER
            </div>

            {/* Prompt input */}
            <div className="space-y-1.5">
              <label className="text-xs opacity-80 block">ENTER ARCHITECTURE OR SPEC PROMPT:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="flex-1 bg-[var(--crt-bg)] border border-[var(--crt-border)] px-2 py-1 text-xs text-[var(--crt-text-bright)] font-mono outline-none"
                  placeholder="e.g. Generate GraphQL Schema or Refactor React Hook..."
                />
                <button
                  onClick={() => handleGenerateAiCode()}
                  disabled={isGenerating}
                  className="px-3 py-1 bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold text-xs uppercase hover:opacity-90 disabled:opacity-50"
                >
                  {isGenerating ? 'SYNTHESIZING...' : 'SYNTHESIZE'}
                </button>
              </div>
            </div>

            {/* Quick Prompt Presets */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="opacity-70">SAMPLE PROMPTS:</span>
              <button
                onClick={() => {
                  setPromptText('Generate GraphQL Schema');
                  handleGenerateAiCode('Generate GraphQL Schema');
                }}
                className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)]"
              >
                [ GraphQL Schema ]
              </button>
              <button
                onClick={() => {
                  setPromptText('Refactor React Hook');
                  handleGenerateAiCode('Refactor React Hook');
                }}
                className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)]"
              >
                [ React Hook ]
              </button>
              <button
                onClick={() => {
                  setPromptText('Create TypeScript Rate Limiter Middleware');
                  handleGenerateAiCode('Create TypeScript Rate Limiter Middleware');
                }}
                className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)]"
              >
                [ Express Middleware ]
              </button>
            </div>

            {/* Synthesized Output Preview */}
            <div className="border border-[var(--crt-border)] p-3 bg-[var(--crt-bg)] space-y-1">
              <div className="flex justify-between items-center text-[11px] border-b border-[var(--crt-border)] pb-1 opacity-80">
                <span>SYNTHESIZED CODE OUTPUT</span>
                <span>STATUS: {isGenerating ? 'PARSING AST...' : 'COMPILE READY'}</span>
              </div>
              <pre className="text-xs text-[var(--crt-text-bright)] overflow-x-auto whitespace-pre p-2 bg-black/40 font-mono leading-relaxed">
                {generatedCode}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* DEMO TYPE 3: NEURAL_GRID SPATIAL NODE CANVAS SIMULATOR */}
      {app.demoType === 'NODE_CANVAS_SIM' && (
        <div className="space-y-3">
          <div className="border border-[var(--crt-border)] p-3 space-y-3">
            <div className="flex justify-between items-center border-b border-[var(--crt-border)] pb-2">
              <span className="font-bold text-[var(--crt-text-bright)] uppercase">
                SPATIAL NODE CANVAS SIMULATOR (MULTIPLAYER SYNC)
              </span>
              <span className="text-xs opacity-80">ACTIVE NODES: 4 | FPS: 60</span>
            </div>

            {/* Interactive Grid Canvas Box */}
            <div className="relative h-56 bg-black/50 border border-[var(--crt-border)] p-4 overflow-hidden">
              {/* ASCII Grid lines overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none text-[8px] leading-tight select-none overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i}>
                    +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
                  </div>
                ))}
              </div>

              {/* Canvas Nodes */}
              {nodes.map((node) => (
                <div
                  key={node.id}
                  onClick={() => {
                    sound.playKeyClick();
                    setActiveNode(`${node.name} (${node.status})`);
                    setNodes((prev) =>
                      prev.map((n) =>
                        n.id === node.id ? { ...n, pingMs: Math.floor(Math.random() * 8) + 1 } : n
                      )
                    );
                  }}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute p-2 border cursor-pointer transition-all ${
                    activeNode?.includes(node.name)
                      ? 'border-[var(--crt-text-bright)] bg-[var(--crt-text)] text-[var(--crt-bg)] font-bold shadow-[0_0_12px_var(--crt-text)]'
                      : 'border-[var(--crt-border)] bg-[var(--crt-bg)] hover:border-[var(--crt-text-bright)]'
                  }`}
                >
                  <div className="text-[11px] font-bold uppercase truncate max-w-[120px]">
                    [{node.id}] {node.name}
                  </div>
                  <div className="text-[9px] opacity-80 flex justify-between gap-2">
                    <span>{node.status}</span>
                    <span>{node.pingMs}ms</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Node Inspector */}
            <div className="border border-[var(--crt-border)] p-2 text-xs flex justify-between items-center">
              <div>
                <span className="opacity-70">SELECTED NODE: </span>
                <strong className="text-[var(--crt-text-bright)] font-bold">
                  {activeNode || 'None selected'}
                </strong>
              </div>
              <button
                onClick={() => {
                  sound.playEnterKey();
                  setNodes((prev) =>
                    prev.map((n) => ({ ...n, pingMs: Math.floor(Math.random() * 5) + 1 }))
                  );
                }}
                className="px-2 py-0.5 border border-[var(--crt-border)] hover:bg-[var(--crt-text)] hover:text-[var(--crt-bg)] font-bold text-xs uppercase"
              >
                [ PING ALL NODES ]
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
