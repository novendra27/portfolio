import type { LocalizedList, LocalizedString } from './common';

export type ServiceCategory =
  | 'mvp_launch'
  | 'custom_system'
  | 'architecture_audit';

export interface FAQItem {
  question: LocalizedString;
  answer: LocalizedString;
}

export interface PricingService {
  id: string;
  tier_name: string;
  slug: string;
  tagline: LocalizedString;
  category: ServiceCategory;
  price_starting: string;
  estimated_timeline: LocalizedString;
  deliverables: LocalizedList;
  is_popular: boolean;
  faq_items: FAQItem[];
  order: number;
}
