import type { LocalizedString } from './common';

export type CategoryTargetScope = 'technology' | 'project' | 'architecture';

export type CategoryGroupFacet =
  | 'domain_solution'
  | 'platform_target'
  | 'tech_tier'
  | 'project_purpose';

export interface Category {
  id: string;
  name: string;
  slug: string;
  target_scope: CategoryTargetScope;
  group_facet: CategoryGroupFacet;
  description: LocalizedString;
  order: number;
}

export type TechnologyProficiency = 'core_specialty' | 'secondary';

export interface Technology {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  proficiency: TechnologyProficiency;
  icon_key: string;
  official_docs_url: string;
  order: number;
}
