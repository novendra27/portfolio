import type { LocalizedString } from './common';

export type ArchitecturePatternType =
  | 'event_driven'
  | 'hybrid_algorithmic'
  | 'progressive_billing'
  | 'serverless_edge';

export interface ArchitectureSystem {
  id: string;
  title: string;
  slug: string;
  pattern_type: ArchitecturePatternType;
  problem_domain: LocalizedString;
  architectural_solution: LocalizedString;
  resilience_and_tradeoffs: LocalizedString;
  diagram_url: string;
  technology_ids: string[];
  project_ids: string[];
  is_featured: boolean;
  order: number;
}
