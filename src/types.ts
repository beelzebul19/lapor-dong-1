export type PhosphorTheme = 'green' | 'amber' | 'cyan' | 'white';

export type TerminalViewMode = 
  | 'MAIN_MENU'
  | 'APP_DETAIL'
  | 'APP_RUNNER'
  | 'SYS_INFO'
  | 'HELP_MANUAL'
  | 'IPL_BOOT'
  | 'EDIT_APPS'
  | 'COMMAND_LOG'
  | 'MATRIX_RAIN';

export interface WebApp {
  id: string;
  optionNumber: number;
  name: string;
  codeName: string;
  version: string;
  category: string;
  status: 'ONLINE' | 'ACTIVE' | 'DEPLOYED' | 'MAINTENANCE';
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
  metrics: {
    users?: string;
    uptime?: string;
    latency?: string;
    requestsPerSec?: string;
    accuracy?: string;
  };
  demoType: 'ANALYTICS_SIM' | 'AI_PROMPT_SIM' | 'NODE_CANVAS_SIM';
  liveUrl?: string;
  repoUrl?: string;
  asciiArtBanner?: string;
  systemJobName: string;
}

export interface CrtSettings {
  scanlines: boolean;
  curvature: boolean;
  glow: boolean;
  flicker: boolean;
  soundEnabled: boolean;
  theme: PhosphorTheme;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  type: 'COMMAND' | 'RESPONSE' | 'ERROR' | 'SYSTEM' | 'SUCCESS';
  text: string;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsedMb: number;
  memoryTotalMb: number;
  activeJobs: number;
  systemUptime: string;
  subsystem: string;
  terminalId: string;
  user: string;
}
