import type { LocalizedString } from './common';

export type PublicationCategory =
  | 'architecture'
  | 'ai_optimization'
  | 'career'
  | 'engineering';

export interface Publication {
  id: string;
  title: string;
  slug: string;
  category: PublicationCategory;
  published_date: string;
  reading_time: string;
  excerpt: LocalizedString;
  external_url: string | null;
  is_published: boolean;
  technology_ids: string[];
  project_ids: string[];
  order: number;
}
