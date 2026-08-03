import { WebApp } from '../types';

export const INITIAL_WEB_APPS: WebApp[] = [
  {
    id: 'app-datacore',
    optionNumber: 1,
    name: 'PANTAU_ISU',
    codeName: 'PANTAU',
    version: 'v3.4.1',
    category: 'Monitoring Dashboard',
    status: 'ONLINE',
    shortDescription: 'Dasbor internal bagi tim sukses untuk memantau isu di media sosial dan portal berita online.',
    fullDescription: 'PANTAU_ISU adalah dasbor internal bagi tim sukses untuk memantau tren media sosial, isu terkini, serta agregasi portal berita online secara real-time. Dilengkapi analisis sentimen otomatis, pelacakan tagar, dan peringatan potensi krisis isu.',
    techStack: ['Ruby', 'TypeScript', 'WebGL / Canvas', 'D3.js Engine', 'WebSocket Streaming', 'Tailwind CSS'],
    specs: [
      { label: 'INGESTION RATE', value: '142,000 events/sec' },
      { label: 'AVERAGE LATENCY', value: '< 1.8ms p99' },
      { label: 'PIPELINE MEMORY', value: '38.4 MB (Zero Leaks)' },
      { label: 'RETENTION WINDOW', value: '90 Days Rolling' }
    ],
    features: [
      'Interactive WebGL time-series incident & issue visualizer',
      'Instant AI-driven anomaly detection and alert thresholds',
      'Custom SQL-like expression query builder for system logs',
      'Exportable JSON, CSV, and Apache Parquet diagnostic datasets',
      'Live WebSocket multi-node issue heartbeat monitoring'
    ],
    metrics: {
      users: '18,450 Monthly Active Engineers',
      uptime: '99.998%',
      latency: '1.8ms',
      requestsPerSec: '142k/sec'
    },
    demoType: 'ANALYTICS_SIM',
    liveUrl: 'https://pantau-isu.vercel.app/',
    repoUrl: 'https://github.com/developer/pantau-isu-dashboard',
    systemJobName: 'QPANTAU/QINTER_01',
    asciiArtBanner: `
  ___  _   _  _ _____  _  _   _    ___ ___  _   _ 
 | _ \\/_\\ | \\| |_   _|/_\\| | | |  |_ _/ __|| | | |
 |  _/ _ \\| .\` | | | / _ \\ |_| |   | |\\__ \\| |_| |
 |_|/_/ \\_\\_|\\_| |_|/_/ \\_\\___/   |___|___/ \\___/ `
  },
  {
    id: 'app-cyberforge',
    optionNumber: 2,
    name: 'BAGI_NARASI',
    codeName: 'NARASI',
    version: 'v2.1.0',
    category: 'Broadcast Hub',
    status: 'ONLINE',
    shortDescription: 'Tools bagi tim sukses untuk membagikan narasi kampanye kandidat ke para relawan.',
    fullDescription: 'BAGI_NARASI adalah tools bagi tim sukses untuk membagikan narasi kampanye kandidat ke para relawan secara terstruktur, cepat, dan mudah disebarkan ke media sosial maupun grup komunikasi.',
    techStack: ['Next.js', 'Gemini AI API', 'Node.js', 'Babel AST Parser', 'Monaco Editor', 'Tailwind CSS'],
    specs: [
      { label: 'AI ACCURACY', value: '99.4% Syntax Clean' },
      { label: 'COMPILATION TIME', value: '< 340ms AST parse' },
      { label: 'TOKENS / SEC', value: '88.5 tokens/s' },
      { label: 'SUPPORTED LANGS', value: 'TS, Python, Go, SQL, Rust' }
    ],
    features: [
      'Natural language to type-safe TypeScript code generator',
      'Automated pull request code review & security audit',
      'Interactive architecture diagram & API schema generator',
      'One-click sandbox compilation and test suite generation',
      'Context-aware refactoring with zero hallucinated imports'
    ],
    metrics: {
      users: '34,200 Developers',
      uptime: '99.95%',
      accuracy: '99.4%',
      requestsPerSec: '520/min'
    },
    demoType: 'AI_PROMPT_SIM',
    liveUrl: 'https://bagi-narasi.base44.app/',
    repoUrl: 'https://github.com/developer/bagi-narasi',
    systemJobName: 'QBAGI/QBATCH_02',
    asciiArtBanner: `
  ___   _   ___ ___ _  _   _   ___    ____ ___ 
 | _ ) /_\\ / __|_ _| \\| | /_\\ | _ \\  / __|_ _|
 | _ \\/ _ \\ (_ || || .\` |/ _ \\|   /  \\__ \\| | 
 |___/_/ \\_\\___|___|_|\\_/_/ \\_\\_|_\\  |___/___|`
  },
  {
    id: 'app-neuralgrid',
    optionNumber: 3,
    name: 'LAPOR_DONG',
    codeName: 'LAPOR',
    version: 'v4.0.8',
    category: 'Aspiration Portal',
    status: 'ONLINE',
    shortDescription: 'Portal bagi tim sukses untuk menampung aspirasi warga agar dapat segera direspon oleh kandidat.',
    fullDescription: 'LAPOR_DONG adalah portal bagi tim sukses untuk menampung aspirasi warga, keluhan publik, serta masukan komunitas agar dapat segera direspon dan ditindaklanjuti secara cepat oleh kandidat dan tim lapangan.',
    techStack: ['Python', 'HTML5 Canvas', 'CRDTs (Yjs)', 'WebRTC / WebSockets', 'Tailwind CSS', 'Motion'],
    specs: [
      { label: 'MAX CANVAS NODES', value: '10,000+ Smooth FPS' },
      { label: 'SYNC LATENCY', value: '< 9ms P2P WebRTC' },
      { label: 'ENCRYPTION', value: 'AES-256-GCM End-to-End' },
      { label: 'FRAME RATE', value: '60 FPS Constant' }
    ],
    features: [
      'Infinite zoom and pan canvas grid with grid-snapping',
      'Realtime multiplayer cursors and collaborative node editing',
      'Custom executable node triggers and API webhooks',
      'Built-in markdown notes, image embed, and flowchart connectors',
      'Dark mode and vintage AS/400 terminal vector skin themes'
    ],
    metrics: {
      users: '22,100 Teams',
      uptime: '99.99%',
      latency: '9ms',
      requestsPerSec: '89k sync/s'
    },
    demoType: 'NODE_CANVAS_SIM',
    liveUrl: 'https://lapor-dong.base44.app',
    repoUrl: 'https://github.com/developer/neuralgrid-canvas',
    systemJobName: 'QNEUGRD/QINTER_03',
    asciiArtBanner: `
 _   _ _____ _   _______   ___  _     _____ _____ _____ _____ 
| \\ | |  ___| | | | ___ \\ / _ \\| |   |  __ \\  ___|_   _/  ___|
|  \\| | |__ | | | | |_/ // /_\\ \\ |   | |  \\/ |__   | | \\ '--. 
| .   |  __|| | | |    / |  _  | |   | | __|  __|  | |  '--. \\
| |\\  | |___| |_| | |\\ \\ | | | | |___| |_\\ \\ |___ _| |_/\\__/ /
\\_| \\_/\\____/\\___/\\_| \\_|\\_| |_/\\____/\\____/\\____/ \\___/\\____/ `
  }
];
