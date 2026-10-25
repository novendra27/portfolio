import { z } from 'zod';
import type {
  ArchitectureSystem,
  Category,
  Certificate,
  Education,
  Experience,
  FAQItem,
  LocalizedString,
  LocalizedList,
  Organization,
  PricingService,
  Project,
  ProjectLink,
  ProjectMetric,
  ProjectPlaceholderInfo,
  Publication,
  Technology,
} from '../types';

/**
 * Dynamic Bilingual Validation Schemas
 */
export const LocalizedStringSchema: z.ZodType<LocalizedString> = z.object({
  id: z.string().min(1, 'Indonesian content is required'),
  en: z.string().min(1, 'English content is required'),
});

export const LocalizedListSchema: z.ZodType<LocalizedList> = z.object({
  id: z.array(z.string()).min(1, 'Indonesian list must contain at least 1 item'),
  en: z.array(z.string()).min(1, 'English list must contain at least 1 item'),
});

/**
 * 1. Category Schema (Master Taxonomy)
 */
export const CategorySchema: z.ZodType<Category> = z.object({
  id: z.string().min(1, 'Category ID is required'),
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Category slug is required'),
  target_scope: z.enum(['technology', 'project', 'architecture']),
  group_facet: z.enum([
    'domain_solution',
    'platform_target',
    'tech_tier',
    'project_purpose',
  ]),
  description: LocalizedStringSchema,
  order: z.number().int().nonnegative(),
});

/**
 * 2. Technology Schema
 */
export const TechnologySchema: z.ZodType<Technology> = z.object({
  id: z.string().min(1, 'Technology ID is required'),
  name: z.string().min(1, 'Technology name is required'),
  slug: z.string().min(1, 'Technology slug is required'),
  category_id: z.string().min(1, 'Category ID reference is required'),
  proficiency: z.enum(['core_specialty', 'secondary']),
  icon_key: z.string().min(1, 'Icon key is required'),
  official_docs_url: z.string().url('Official documentation URL must be valid'),
  order: z.number().int().nonnegative(),
});

/**
 * 3. Organization Schema
 */
export const OrganizationSchema: z.ZodType<Organization> = z.object({
  id: z.string().min(1, 'Organization ID is required'),
  name: z.string().min(1, 'Organization name is required'),
  slug: z.string().min(1, 'Organization slug is required'),
  type: z.enum(['corporate', 'client_business', 'academic', 'community']),
  logo: z.string(),
  website_url: z.string().url().or(z.literal('')),
  location: z.string(),
  is_confidential: z.boolean(),
});

/**
 * 4. Architecture System Schema
 */
export const ArchitectureSystemSchema: z.ZodType<ArchitectureSystem> = z.object({
  id: z.string().min(1, 'Architecture system ID is required'),
  title: z.string().min(1, 'Architecture title is required'),
  slug: z.string().min(1, 'Architecture slug is required'),
  pattern_type: z.enum([
    'event_driven',
    'hybrid_algorithmic',
    'progressive_billing',
    'serverless_edge',
  ]),
  problem_domain: LocalizedStringSchema,
  architectural_solution: LocalizedStringSchema,
  resilience_and_tradeoffs: LocalizedStringSchema,
  diagram_url: z.string(),
  technology_ids: z.array(z.string()),
  project_ids: z.array(z.string()),
  is_featured: z.boolean(),
  order: z.number().int().nonnegative(),
});

/**
 * 5. Project Links Schema (Relational Multi-Link)
 */
export const ProjectLinkSchema: z.ZodType<ProjectLink> = z.object({
  id: z.string().min(1, 'Project link ID is required'),
  project_id: z.string().min(1, 'Project ID reference is required'),
  title: z.string().min(1, 'Link title is required'),
  url: z.string().url('Link URL must be valid'),
  type: z.enum([
    'github',
    'live_demo',
    'api_docs',
    'video',
    'presentation',
    'other',
  ]),
  is_primary: z.boolean(),
  order: z.number().int().nonnegative(),
});

/**
 * 6. Project Schema
 */
export const ProjectMetricSchema: z.ZodType<ProjectMetric> = z.object({
  label: LocalizedStringSchema,
  value: z.string().min(1),
});

export const SystemTopologyNodeSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  badge: z.string().optional(),
});

export const ProjectPlaceholderInfoSchema: z.ZodType<ProjectPlaceholderInfo> = z.object({
  tag: z.string(),
  category: LocalizedStringSchema,
  protocol: z.string(),
  title: LocalizedStringSchema,
  description: LocalizedStringSchema,
  nodes: z.tuple([SystemTopologyNodeSchema, SystemTopologyNodeSchema, SystemTopologyNodeSchema]),
  storage: SystemTopologyNodeSchema.optional(),
});

export const ProjectSchema: z.ZodType<Project> = z.object({
  id: z.string().min(1, 'Project ID is required'),
  title: z.string().min(1, 'Project title is required'),
  slug: z.string().min(1, 'Project slug is required'),
  summary_bluf: LocalizedStringSchema,
  organization_id: z.string().min(1, 'Organization ID is required'),
  architecture_system_id: z.string().nullable(),
  category_ids: z.array(z.string()),
  technology_ids: z.array(z.string()),
  confidentiality: z.enum(['public', 'confidential_nda']),
  thumbnail: z.string().nullable(),
  placeholder_info: ProjectPlaceholderInfoSchema.optional(),
  media_type: z.enum(['image', 'gif']),
  core_code_snippet: z.string(),
  is_featured: z.boolean(),
  order: z.number().int().nonnegative(),
  problem_statement: LocalizedStringSchema.optional(),
  solution_statement: LocalizedStringSchema.optional(),
  key_metrics: z.array(ProjectMetricSchema).optional(),
});

/**
 * 7. Experience Schema
 */
export const ExperienceSchema: z.ZodType<Experience> = z.object({
  id: z.string().min(1, 'Experience ID is required'),
  role: z.string().min(1, 'Role title is required'),
  organization_id: z.string().min(1, 'Organization ID is required'),
  type: z.enum(['fulltime', 'contract', 'freelance', 'internship', 'community']),
  period_start: z.string().min(1, 'Period start is required'),
  period_end: z.string().nullable(),
  is_current: z.boolean(),
  location: z.string().min(1, 'Location is required'),
  highlights: LocalizedListSchema,
  technology_ids: z.array(z.string()),
  order: z.number().int().nonnegative(),
});

/**
 * 8. Education Schema
 */
export const EducationSchema: z.ZodType<Education> = z.object({
  id: z.string().min(1, 'Education ID is required'),
  organization_id: z.string().min(1, 'Organization ID is required'),
  degree: z.string().min(1, 'Degree is required'),
  period: z.string().min(1, 'Period is required'),
  gpa: z.string(),
  thesis_title: z.string(),
  thesis_project_id: z.string().nullable(),
  order: z.number().int().nonnegative(),
});

/**
 * 9. Certificate Schema
 */
export const CertificateSchema: z.ZodType<Certificate> = z.object({
  id: z.string().min(1, 'Certificate ID is required'),
  title: z.string().min(1, 'Certificate title is required'),
  issuer_id: z.string().min(1, 'Issuer organization ID is required'),
  issue_date: z.string().min(1, 'Issue date is required'),
  credential_url: z.string().url('Credential URL must be valid').or(z.literal('')),
  credential_id: z.string(),
  technology_ids: z.array(z.string()),
  order: z.number().int().nonnegative(),
});

/**
 * 10. Pricing Service Schema
 */
export const FAQItemSchema: z.ZodType<FAQItem> = z.object({
  question: LocalizedStringSchema,
  answer: LocalizedStringSchema,
});

export const PricingServiceSchema: z.ZodType<PricingService> = z.object({
  id: z.string().min(1, 'Service ID is required'),
  tier_name: z.string().min(1, 'Tier name is required'),
  slug: z.string().min(1, 'Tier slug is required'),
  tagline: LocalizedStringSchema,
  category: z.enum(['mvp_launch', 'custom_system', 'architecture_audit']),
  price_starting: z.string().min(1, 'Starting price is required'),
  estimated_timeline: LocalizedStringSchema,
  deliverables: LocalizedListSchema,
  is_popular: z.boolean(),
  faq_items: z.array(FAQItemSchema),
  order: z.number().int().nonnegative(),
});

/**
 * 11. Publication Schema
 */
export const PublicationSchema: z.ZodType<Publication> = z.object({
  id: z.string().min(1, 'Publication ID is required'),
  title: z.string().min(1, 'Publication title is required'),
  slug: z.string().min(1, 'Publication slug is required'),
  category: z.enum(['architecture', 'ai_optimization', 'career', 'engineering']),
  published_date: z.string().min(1, 'Published date is required'),
  reading_time: z.string().min(1, 'Reading time is required'),
  excerpt: LocalizedStringSchema,
  external_url: z.string().url('External URL must be valid').nullable(),
  is_published: z.boolean(),
  technology_ids: z.array(z.string()),
  project_ids: z.array(z.string()),
  order: z.number().int().nonnegative(),
});
