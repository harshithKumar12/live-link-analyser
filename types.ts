export interface SeoHealth {
  canonical: string;
  title: string;
  titleStatus: 'optimal' | 'missing' | 'too-long' | 'too-short';
  description: string;
  descriptionStatus: 'optimal' | 'missing' | 'too-long' | 'too-short';
  robotsTxt: string;
  metaRobots: string;
  brokenLinksEstimate: number;
}

export interface PerformanceMetrics {
  lcp: number; // seconds
  cls: number; // score
  ttfb: number; // milliseconds
  score: number; // 0-100
  imageIssues: string[];
}

export interface SecurityHeaders {
  https: boolean;
  hsts: boolean;
  xContentTypeOptions: boolean;
  contentSecurityPolicy: boolean;
  summary: string;
}

export interface TrackingInfo {
  thirdPartyScripts: Array<{ domain: string; category: string }>;
  commonTrackers: string[]; // e.g., "Google Analytics", "Facebook Pixel"
}

export interface TechStack {
  platform: string; // e.g., WordPress
  server: string; // e.g., Nginx
  frameworks: string[]; // e.g., React, Tailwind
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  url: string;
  overallScore: number;
  summary: string;
  actionItems: string[];
  seo: SeoHealth;
  performance: PerformanceMetrics;
  security: SecurityHeaders;
  tracking: TrackingInfo;
  techStack: TechStack;
  groundingSources: GroundingSource[];
}

export interface LoadingStep {
  id: number;
  label: string;
  status: 'pending' | 'loading' | 'completed';
}