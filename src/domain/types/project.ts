import type { LocalizedString } from './common';

export type ProjectLinkType =
  | 'github'
  | 'live_demo'
  | 'api_docs'
  | 'video'
  | 'presentation'
  | 'other';

export interface ProjectLink {
  id: string;
  project_id: string;
  title: string;
  url: string;
  type: ProjectLinkType;
  is_primary: boolean;
  order: number;
}

export type ProjectConfidentiality = 'public' | 'confidential_nda';
export type ProjectMediaType = 'image' | 'gif';

export interface ProjectMetric {
  label: LocalizedString;
  value: string;
}

export interface SystemTopologyNode {
  title: string;
  subtitle: string;
  badge?: string;
}

export interface ProjectPlaceholderInfo {
  tag: string;
  category: LocalizedString;
  protocol: string;
  title: LocalizedString;
  description: LocalizedString;
  nodes: [SystemTopologyNode, SystemTopologyNode, SystemTopologyNode];
  storage?: SystemTopologyNode;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary_bluf: LocalizedString;
  organization_id: string;
  architecture_system_id: string | null;
  category_ids: string[];
  technology_ids: string[];
  confidentiality: ProjectConfidentiality;
  thumbnail: string | null;
  placeholder_info?: ProjectPlaceholderInfo;
  media_type: ProjectMediaType;
  core_code_snippet: string;
  is_featured: boolean;
  order: number;
  problem_statement?: LocalizedString;
  solution_statement?: LocalizedString;
  key_metrics?: ProjectMetric[];
}
