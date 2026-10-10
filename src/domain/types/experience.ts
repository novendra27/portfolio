import type { LocalizedList } from './common';

export type ExperienceType =
  | 'fulltime'
  | 'contract'
  | 'freelance'
  | 'internship'
  | 'community';

export interface Experience {
  id: string;
  role: string;
  organization_id: string;
  type: ExperienceType;
  period_start: string;
  period_end: string | null;
  is_current: boolean;
  location: string;
  highlights: LocalizedList;
  technology_ids: string[];
  order: number;
}

export interface Education {
  id: string;
  organization_id: string;
  degree: string;
  period: string;
  gpa: string;
  thesis_title: string;
  thesis_project_id: string | null;
  order: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer_id: string;
  issue_date: string;
  credential_url: string;
  credential_id: string;
  technology_ids: string[];
  order: number;
}
