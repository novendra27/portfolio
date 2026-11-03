import { NOTION_DATABASES, queryNotionDatabase } from '@/lib/notion/client';
import { downloadAndCacheNotionImage } from '@/lib/notion/image-downloader';
import {
  extractCheckbox,
  extractDate,
  extractFileUrl,
  extractNumber,
  extractRelationIds,
  extractRichText,
  extractSelect,
  extractTitle,
  extractUrl,
} from '@/lib/notion/helpers';

import {
  StaticArchitectureRepository,
  StaticCategoryRepository,
  StaticCertificateRepository,
  StaticEducationRepository,
  StaticExperienceRepository,
  StaticOrganizationRepository,
  StaticPricingRepository,
  StaticProjectRepository,
  StaticPublicationRepository,
  StaticTechnologyRepository,
} from '../static';

import type {
  ArchitectureSystem,
  Category,
  CategoryTargetScope,
  Certificate,
  Education,
  Experience,
  Organization,
  PricingService,
  Project,
  ProjectLink,
  Publication,
  ServiceCategory,
  Technology,
} from '@/domain/types';

import type {
  ArchitectureWithRelations,
  CertificateWithRelations,
  EducationWithRelations,
  ExperienceWithRelations,
  IArchitectureRepository,
  ICategoryRepository,
  ICertificateRepository,
  IEducationRepository,
  IExperienceRepository,
  IOrganizationRepository,
  IPricingRepository,
  IProjectRepository,
  IPublicationRepository,
  ITechnologyRepository,
  ProjectWithRelations,
  PublicationWithRelations,
} from '../contracts';

/**
 * Fallback static instances to ensure zero runtime disruptions if Notion database is partially connected.
 */
const fallbackCategoryRepo = new StaticCategoryRepository();
const fallbackTechRepo = new StaticTechnologyRepository();
const fallbackOrgRepo = new StaticOrganizationRepository();
const fallbackArchRepo = new StaticArchitectureRepository();
const fallbackProjectRepo = new StaticProjectRepository();
const fallbackExpRepo = new StaticExperienceRepository();
const fallbackEduRepo = new StaticEducationRepository();
const fallbackCertRepo = new StaticCertificateRepository();
const fallbackPricingRepo = new StaticPricingRepository();
const fallbackPubRepo = new StaticPublicationRepository();

/**
 * Legacy dataset ID to slug dictionary for seamless join resolution.
 */
const LEGACY_ID_TO_SLUG: Record<string, string> = {
  // Projects
  'proj-kkm-algen': 'kkm-grouping-genetic-algorithm',
  'proj-tagihan-pdam': 'tagihan-pdam-pandanrejo',
  'proj-manajemen-stok': 'store-management-event-driven-kafka',
  'proj-ebook-store': 'ebook-store-digital-commerce',
  'proj-penyewaan-ea': 'rental-expert-advisor-dndfx',
  'proj-tagihan-wifi': 'pendataan-tagihan-wifi',
  'proj-maturity-rating': 'maturity-rating-blu',
  'proj-watchtube': 'watchtube-video-streaming',
  'proj-virtualr': 'virtualr-vr-landing-page',
  // Organizations
  'org-uin-malang': 'uin-maliki-malang',
  'org-ecentrix': 'ecentrix',
  'org-aksara': 'aksara-teknologi-mandiri',
  'org-java-digital': 'pt-java-digital-nusantara',
  'org-language-center': 'language-center',
  'org-dndfx': 'dndfx',
  'org-kriingg': 'kriingg',
  'org-sekawan': 'sekawan-media',
  'org-gdg-maliki': 'gdg-on-campus-maliki',
  'org-smkn1-boyolangu': 'smkn-1-boyolangu',
  // Categories
  'cat-backend': 'backend-distributed-services',
  'cat-frontend': 'frontend-modern-web-apps',
  'cat-database': 'relational-database-persistence',
  'cat-message-broker': 'event-streaming-message-broker',
  'cat-ai-algorithm': 'ai-optimization-algorithms',
  'cat-utility-billing': 'utility-billing-progressive-systems',
  'cat-ecommerce': 'ecommerce-digital-payments',
  'cat-saas-tools': 'client-saas-enterprise-systems',
  // Architecture Systems
  'arch-hybrid-algorithmic-engine': 'hybrid-genetic-algorithm-engine',
  'arch-progressive-billing': 'progressive-utility-billing-engine',
  'arch-event-driven-kafka': 'event-driven-kafka-streaming',
};

/**
 * Helper pencocokan cerdas entitas:
 * Mencocokkan apakah targetIdOrSlug cocok dengan id Notion, id dataset asli, atau slug entitas.
 */
function matchesEntity(entity: { id: string; slug?: string }, targetIdOrSlug: string): boolean {
  if (!targetIdOrSlug) return false;
  const target = targetIdOrSlug.trim().toLowerCase();
  const id = entity.id.trim().toLowerCase();
  const slug = entity.slug ? entity.slug.trim().toLowerCase() : '';
  const mappedSlug = LEGACY_ID_TO_SLUG[target]?.toLowerCase();

  // Strip common legacy prefixes
  const strippedTarget = target.replace(/^(tech|org|arch|cat|proj|srv|exp|edu|cert|pub)-/, '');

  return (
    id === target ||
    id === strippedTarget ||
    (mappedSlug !== undefined && (id === mappedSlug || slug === mappedSlug)) ||
    (slug !== '' &&
      (slug === target ||
        slug === strippedTarget ||
        slug.replace(/-/g, '').includes(strippedTarget.replace(/-/g, '')) ||
        strippedTarget.replace(/-/g, '').includes(slug.replace(/-/g, ''))))
  );
}

// In-Memory cache per-build execution pass
let cachedCategories: Promise<Category[]> | null = null;
let cachedTechnologies: Promise<Technology[]> | null = null;
let cachedOrganizations: Promise<Organization[]> | null = null;
let cachedArchitectures: Promise<ArchitectureSystem[]> | null = null;
let cachedProjects: Promise<Project[]> | null = null;
let cachedProjectLinks: Promise<ProjectLink[]> | null = null;
let cachedExperiences: Promise<Experience[]> | null = null;
let cachedEducations: Promise<Education[]> | null = null;
let cachedCertificates: Promise<Certificate[]> | null = null;
let cachedPricing: Promise<PricingService[]> | null = null;
let cachedPublications: Promise<Publication[]> | null = null;

/**
 * Mengambil seluruh ProjectLinks dari database Notion.
 */
export async function getAllProjectLinks(): Promise<ProjectLink[]> {
  if (!cachedProjectLinks) {
    cachedProjectLinks = (async () => {
      const databaseId = NOTION_DATABASES.projectLinks();
      if (!databaseId) return [];
      try {
        const results = await queryNotionDatabase(databaseId, {
          sorts: [{ property: 'Order', direction: 'ascending' }],
        });
        if (!results || results.length === 0) return [];
        return results.map((page: any, idx: number) => {
          const props = page.properties;
          const projectId =
            extractTitle(props.Project_ID) ||
            extractRichText(props.Project_ID) ||
            extractRelationIds(props.Project)[0] ||
            '';
          const linkTitle =
            extractRichText(props.Title) ||
            extractTitle(props.Title) ||
            extractTitle(props.Name) ||
            'Link';

          return {
            id: page.id,
            project_id: projectId,
            title: linkTitle,
            url: extractUrl(props.URL) || extractUrl(props.Url),
            type: (extractSelect(props.Type) as any) || 'github',
            is_primary: extractCheckbox(props.Is_Primary),
            order: extractNumber(props.Order, idx + 1),
          };
        });
      } catch (err) {
        console.warn('[NotionProjectLinks] Query error:', err);
        return [];
      }
    })();
  }
  return cachedProjectLinks;
}

/**
 * NotionCategoryRepository
 */
export class NotionCategoryRepository implements ICategoryRepository {
  async getAll(): Promise<Category[]> {
    if (!cachedCategories) {
      cachedCategories = (async () => {
        const databaseId = NOTION_DATABASES.categories();
        if (!databaseId) {
          return fallbackCategoryRepo.getAll();
        }
        try {
          const results = await queryNotionDatabase(databaseId, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
          });
          if (!results || results.length === 0) {
            return fallbackCategoryRepo.getAll();
          }
          return results.map((page: any, idx: number) => {
            const props = page.properties;
            return {
              id: page.id,
              name: extractTitle(props.Name) || extractTitle(props.Title),
              slug: extractRichText(props.Slug) || page.id,
              target_scope: (extractSelect(props.Target_Scope) as CategoryTargetScope) || 'technology',
              group_facet: (extractSelect(props.Group_Facet) as any) || 'tech_tier',
              description: {
                id: extractRichText(props.Description_ID),
                en: extractRichText(props.Description_EN),
              },
              order: extractNumber(props.Order, idx + 1),
            };
          });
        } catch (err) {
          console.warn('[NotionCategoryRepository] Fallback to static data due to query error:', err);
          return fallbackCategoryRepo.getAll();
        }
      })();
    }
    return cachedCategories;
  }

  async getByScope(scope: CategoryTargetScope): Promise<Category[]> {
    const all = await this.getAll();
    return all.filter((c) => c.target_scope === scope);
  }

  async getBySlug(slug: string): Promise<Category | null> {
    const all = await this.getAll();
    return all.find((c) => matchesEntity(c, slug)) ?? null;
  }
}

/**
 * NotionTechnologyRepository
 */
export class NotionTechnologyRepository implements ITechnologyRepository {
  async getAll(): Promise<Technology[]> {
    if (!cachedTechnologies) {
      cachedTechnologies = (async () => {
        const databaseId = NOTION_DATABASES.technologies();
        if (!databaseId) {
          return fallbackTechRepo.getAll();
        }
        try {
          const results = await queryNotionDatabase(databaseId, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
          });
          if (!results || results.length === 0) {
            return fallbackTechRepo.getAll();
          }
          return results.map((page: any, idx: number) => {
            const props = page.properties;
            const categoryIds =
              extractRelationIds(props.Category).length > 0
                ? extractRelationIds(props.Category)
                : extractRelationIds(props.Category_ID);
            return {
              id: page.id,
              name: extractTitle(props.Name) || extractTitle(props.Title),
              slug: extractRichText(props.Slug) || page.id,
              category_id: categoryIds[0] || '',
              proficiency: (extractSelect(props.Proficiency) as any) || 'core_specialty',
              icon_key: extractRichText(props.Icon_Key),
              official_docs_url: extractUrl(props.Official_Docs_Url) || '',
              order: extractNumber(props.Order, idx + 1),
            };
          });
        } catch (err) {
          console.warn('[NotionTechnologyRepository] Fallback to static data:', err);
          return fallbackTechRepo.getAll();
        }
      })();
    }
    return cachedTechnologies;
  }

  async getByCategory(categoryId: string): Promise<Technology[]> {
    const all = await this.getAll();
    return all.filter((t) => matchesEntity({ id: t.category_id }, categoryId));
  }

  async getCoreProficiencies(): Promise<Technology[]> {
    const all = await this.getAll();
    return all.filter((t) => t.proficiency === 'core_specialty');
  }

  async getByIds(ids: string[]): Promise<Technology[]> {
    const all = await this.getAll();
    return all.filter((t) => ids.some((id) => matchesEntity(t, id)));
  }

  async getBySlug(slug: string): Promise<Technology | null> {
    const all = await this.getAll();
    return all.find((t) => matchesEntity(t, slug)) ?? null;
  }
}

/**
 * NotionOrganizationRepository
 */
export class NotionOrganizationRepository implements IOrganizationRepository {
  async getAll(): Promise<Organization[]> {
    if (!cachedOrganizations) {
      cachedOrganizations = (async () => {
        const databaseId = NOTION_DATABASES.organizations();
        if (!databaseId) {
          return fallbackOrgRepo.getAll();
        }
        try {
          const results = await queryNotionDatabase(databaseId);
          if (!results || results.length === 0) {
            return fallbackOrgRepo.getAll();
          }
          return await Promise.all(
            results.map(async (page: any) => {
              const props = page.properties;
              const rawLogo = extractFileUrl(props.Logo);
              const slug = extractRichText(props.Slug) || page.id;
              const cachedLogo = rawLogo ? await downloadAndCacheNotionImage(rawLogo, `org-${slug}`) : '';
              return {
                id: page.id,
                name: extractTitle(props.Name) || extractTitle(props.Title),
                slug,
                type: (extractSelect(props.Type) as any) || 'corporate',
                logo: cachedLogo,
                website_url: extractUrl(props.Website_Url) || '',
                location: extractRichText(props.Location) || '',
                is_confidential: extractCheckbox(props.Is_Confidential),
              };
            })
          );
        } catch (err) {
          console.warn('[NotionOrganizationRepository] Fallback to static data:', err);
          return fallbackOrgRepo.getAll();
        }
      })();
    }
    return cachedOrganizations;
  }

  async getById(id: string): Promise<Organization | null> {
    const all = await this.getAll();
    return all.find((o) => matchesEntity(o, id)) ?? null;
  }

  async getBySlug(slug: string): Promise<Organization | null> {
    const all = await this.getAll();
    return all.find((o) => matchesEntity(o, slug)) ?? null;
  }
}

/**
 * NotionArchitectureRepository
 */
export class NotionArchitectureRepository implements IArchitectureRepository {
  async getAll(): Promise<ArchitectureSystem[]> {
    if (!cachedArchitectures) {
      cachedArchitectures = (async () => {
        const databaseId = NOTION_DATABASES.architectureSystems();
        if (!databaseId) {
          return fallbackArchRepo.getAll();
        }
        try {
          const results = await queryNotionDatabase(databaseId, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
          });
          if (!results || results.length === 0) {
            return fallbackArchRepo.getAll();
          }
          return await Promise.all(
            results.map(async (page: any, idx: number) => {
              const props = page.properties;
              const slug = extractRichText(props.Slug) || page.id;
              const rawDiagram = extractFileUrl(props.Diagram_Url) || extractUrl(props.Diagram_Url);
              const cachedDiagram = rawDiagram
                ? await downloadAndCacheNotionImage(rawDiagram, `arch-${slug}`)
                : '';

              const techIds =
                extractRelationIds(props.Technologies).length > 0
                  ? extractRelationIds(props.Technologies)
                  : extractRelationIds(props.Technology_IDs);

              const projIds =
                extractRelationIds(props.Projects).length > 0
                  ? extractRelationIds(props.Projects)
                  : extractRelationIds(props.Project_IDs);

              return {
                id: page.id,
                title: extractTitle(props.Title) || extractTitle(props.Title_ID),
                slug,
                pattern_type: (extractSelect(props.Pattern_Type) as any) || 'event_driven',
                problem_domain: {
                  id: extractRichText(props.Problem_Domain_ID),
                  en: extractRichText(props.Problem_Domain_EN),
                },
                architectural_solution: {
                  id: extractRichText(props.Solution_ID),
                  en: extractRichText(props.Solution_EN),
                },
                resilience_and_tradeoffs: {
                  id: extractRichText(props.Resilience_ID),
                  en: extractRichText(props.Resilience_EN),
                },
                diagram_url: cachedDiagram,
                technology_ids: techIds,
                project_ids: projIds,
                is_featured: extractCheckbox(props.Is_Featured, true),
                order: extractNumber(props.Order, idx + 1),
              };
            })
          );
        } catch (err) {
          console.warn('[NotionArchitectureRepository] Fallback to static data:', err);
          return fallbackArchRepo.getAll();
        }
      })();
    }
    return cachedArchitectures;
  }

  async getFeatured(): Promise<ArchitectureSystem[]> {
    const all = await this.getAll();
    return all.filter((a) => a.is_featured);
  }

  async getAllWithRelations(): Promise<ArchitectureWithRelations[]> {
    const [architectures, technologies, projects] = await Promise.all([
      this.getAll(),
      new NotionTechnologyRepository().getAll(),
      new NotionProjectRepository().getAll(),
    ]);

    return architectures.map((arch) => ({
      ...arch,
      technologies: technologies.filter((tech) =>
        arch.technology_ids.some((tId) => matchesEntity(tech, tId))
      ),
      projects: projects.filter((proj) =>
        arch.project_ids.some((pId) => matchesEntity(proj, pId))
      ),
    }));
  }

  async getBySlugWithRelations(slug: string): Promise<ArchitectureWithRelations | null> {
    const all = await this.getAllWithRelations();
    return all.find((a) => matchesEntity(a, slug)) ?? null;
  }
}

/**
 * NotionProjectRepository
 */
export class NotionProjectRepository implements IProjectRepository {
  async getAll(): Promise<Project[]> {
    if (!cachedProjects) {
      cachedProjects = (async () => {
        const databaseId = NOTION_DATABASES.projects();
        if (!databaseId) {
          return fallbackProjectRepo.getAll();
        }
        try {
          const results = await queryNotionDatabase(databaseId, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
          });
          if (!results || results.length === 0) {
            return fallbackProjectRepo.getAll();
          }
          return await Promise.all(
            results.map(async (page: any, idx: number) => {
              const props = page.properties;
              const slug = extractRichText(props.Slug) || page.id;
              const rawThumbnail = extractFileUrl(props.Thumbnail);
              const cachedThumbnail = rawThumbnail
                ? await downloadAndCacheNotionImage(rawThumbnail, `project-${slug}`)
                : '/images/avatar.webp';

              const orgIds =
                extractRelationIds(props.Organization).length > 0
                  ? extractRelationIds(props.Organization)
                  : extractRelationIds(props.Organization_ID);

              const archIds =
                extractRelationIds(props.Architecture_System).length > 0
                  ? extractRelationIds(props.Architecture_System)
                  : extractRelationIds(props.Architecture_System_ID);

              const catIds =
                extractRelationIds(props.Categories).length > 0
                  ? extractRelationIds(props.Categories)
                  : extractRelationIds(props.Category_IDs);

              const techIds =
                extractRelationIds(props.Technologies).length > 0
                  ? extractRelationIds(props.Technologies)
                  : extractRelationIds(props.Technology_IDs);

              return {
                id: page.id,
                title: extractTitle(props.Title),
                slug,
                summary_bluf: {
                  id: extractRichText(props.Summary_BLUF_ID),
                  en: extractRichText(props.Summary_BLUF_EN),
                },
                organization_id: orgIds[0] || '',
                architecture_system_id: archIds[0] || null,
                category_ids: catIds,
                technology_ids: techIds,
                confidentiality: (extractSelect(props.Confidentiality) as any) || 'public',
                thumbnail: cachedThumbnail,
                media_type: (extractSelect(props.Media_Type) as any) || 'image',
                core_code_snippet: extractRichText(props.Core_Code_Snippet) || '',
                is_featured: extractCheckbox(props.Is_Featured, true),
                order: extractNumber(props.Order, idx + 1),
              };
            })
          );
        } catch (err) {
          console.warn('[NotionProjectRepository] Fallback to static data:', err);
          return fallbackProjectRepo.getAll();
        }
      })();
    }
    return cachedProjects;
  }

  async getFeatured(): Promise<Project[]> {
    const all = await this.getAll();
    return all.filter((p) => p.is_featured);
  }

  async getAllWithRelations(): Promise<ProjectWithRelations[]> {
    const [projects, organizations, architectures, categories, technologies, links] =
      await Promise.all([
        this.getAll(),
        new NotionOrganizationRepository().getAll(),
        new NotionArchitectureRepository().getAll(),
        new NotionCategoryRepository().getAll(),
        new NotionTechnologyRepository().getAll(),
        getAllProjectLinks(),
      ]);

    return projects.map((proj) => {
      const org =
        organizations.find((o) => matchesEntity(o, proj.organization_id)) ?? null;

      const arch = proj.architecture_system_id
        ? architectures.find((a) => matchesEntity(a, proj.architecture_system_id!)) ?? null
        : null;

      const cats = categories.filter((c) =>
        proj.category_ids.some((target) => matchesEntity(c, target))
      );

      const techs = technologies.filter((t) =>
        proj.technology_ids.some((target) => matchesEntity(t, target))
      );

      const projLinks = links
        .filter((l) => matchesEntity(proj, l.project_id))
        .sort((a, b) => a.order - b.order);

      return {
        ...proj,
        organization: org,
        architecture_system: arch,
        categories: cats,
        technologies: techs,
        links: projLinks,
      };
    });
  }

  async getFeaturedWithRelations(): Promise<ProjectWithRelations[]> {
    const all = await this.getAllWithRelations();
    return all.filter((p) => p.is_featured);
  }

  async getBySlugWithRelations(slug: string): Promise<ProjectWithRelations | null> {
    const all = await this.getAllWithRelations();
    return all.find((p) => matchesEntity(p, slug)) ?? null;
  }

  async getRelatedProjects(projectId: string, limit = 3): Promise<Project[]> {
    const all = await this.getAll();
    return all.filter((p) => p.id !== projectId).slice(0, limit);
  }
}

/**
 * NotionExperienceRepository
 */
export class NotionExperienceRepository implements IExperienceRepository {
  async getAll(): Promise<Experience[]> {
    if (!cachedExperiences) {
      cachedExperiences = (async () => {
        const databaseId = NOTION_DATABASES.experiences();
        if (!databaseId) return fallbackExpRepo.getAll();
        try {
          const results = await queryNotionDatabase(databaseId, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
          });
          if (!results || results.length === 0) return fallbackExpRepo.getAll();

          return results.map((page: any, idx: number) => {
            const props = page.properties;
            const rawHighlightsId = extractRichText(props.Highlights_ID);
            const rawHighlightsEn = extractRichText(props.Highlights_EN);

            const highlightsId = rawHighlightsId
              ? rawHighlightsId.split('\n').map((s) => s.trim()).filter(Boolean)
              : [];
            const highlightsEn = rawHighlightsEn
              ? rawHighlightsEn.split('\n').map((s) => s.trim()).filter(Boolean)
              : [];

            const orgIds =
              extractRelationIds(props.Organization).length > 0
                ? extractRelationIds(props.Organization)
                : extractRelationIds(props.Organization_ID);

            const techIds =
              extractRelationIds(props.Technologies).length > 0
                ? extractRelationIds(props.Technologies)
                : extractRelationIds(props.Technology_IDs);

            return {
              id: page.id,
              role: extractTitle(props.Role) || extractTitle(props.Name),
              organization_id: orgIds[0] || '',
              type: (extractSelect(props.Type) as any) || 'fulltime',
              period_start: extractRichText(props.Period_Start) || extractDate(props.Period)?.start || '',
              period_end: extractRichText(props.Period_End) || extractDate(props.Period)?.end || null,
              is_current: extractCheckbox(props.Is_Current),
              location: extractRichText(props.Location),
              highlights: {
                id: highlightsId,
                en: highlightsEn,
              },
              technology_ids: techIds,
              order: extractNumber(props.Order, idx + 1),
            };
          });
        } catch (err) {
          console.warn('[NotionExperienceRepository] Fallback to static data:', err);
          return fallbackExpRepo.getAll();
        }
      })();
    }
    return cachedExperiences;
  }

  async getAllWithRelations(): Promise<ExperienceWithRelations[]> {
    const [experiences, organizations, technologies] = await Promise.all([
      this.getAll(),
      new NotionOrganizationRepository().getAll(),
      new NotionTechnologyRepository().getAll(),
    ]);

    return experiences.map((exp) => ({
      ...exp,
      organization:
        organizations.find((o) => matchesEntity(o, exp.organization_id)) ?? null,
      technologies: technologies.filter((tech) =>
        exp.technology_ids.some((tId) => matchesEntity(tech, tId))
      ),
    }));
  }
}

/**
 * NotionEducationRepository
 */
export class NotionEducationRepository implements IEducationRepository {
  async getAll(): Promise<Education[]> {
    if (!cachedEducations) {
      cachedEducations = (async () => {
        const databaseId = NOTION_DATABASES.educations();
        if (!databaseId) return fallbackEduRepo.getAll();
        try {
          const results = await queryNotionDatabase(databaseId, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
          });
          if (!results || results.length === 0) return fallbackEduRepo.getAll();

          return results.map((page: any, idx: number) => {
            const props = page.properties;
            const orgIds =
              extractRelationIds(props.Organization).length > 0
                ? extractRelationIds(props.Organization)
                : extractRelationIds(props.Organization_ID);

            const thesisIds =
              extractRelationIds(props.Thesis_Project).length > 0
                ? extractRelationIds(props.Thesis_Project)
                : extractRelationIds(props.Thesis_Project_ID);

            return {
              id: page.id,
              degree: extractTitle(props.Degree) || extractTitle(props.Name),
              organization_id: orgIds[0] || '',
              period: extractRichText(props.Period),
              gpa: extractRichText(props.GPA) || String(extractNumber(props.GPA, 0)),
              thesis_title: extractRichText(props.Thesis_Title),
              thesis_project_id: thesisIds[0] || null,
              order: extractNumber(props.Order, idx + 1),
            };
          });
        } catch (err) {
          console.warn('[NotionEducationRepository] Fallback to static data:', err);
          return fallbackEduRepo.getAll();
        }
      })();
    }
    return cachedEducations;
  }

  async getAllWithRelations(): Promise<EducationWithRelations[]> {
    const [educations, organizations, projects] = await Promise.all([
      this.getAll(),
      new NotionOrganizationRepository().getAll(),
      new NotionProjectRepository().getAll(),
    ]);

    return educations.map((edu) => ({
      ...edu,
      organization:
        organizations.find((o) => matchesEntity(o, edu.organization_id)) ?? null,
      thesis_project: edu.thesis_project_id
        ? projects.find((p) => matchesEntity(p, edu.thesis_project_id!)) ?? null
        : null,
    }));
  }
}

/**
 * NotionCertificateRepository
 */
export class NotionCertificateRepository implements ICertificateRepository {
  async getAll(): Promise<Certificate[]> {
    if (!cachedCertificates) {
      cachedCertificates = (async () => {
        const databaseId = NOTION_DATABASES.certificates();
        if (!databaseId) return fallbackCertRepo.getAll();
        try {
          const results = await queryNotionDatabase(databaseId, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
          });
          if (!results || results.length === 0) return fallbackCertRepo.getAll();

          return results.map((page: any, idx: number) => {
            const props = page.properties;
            const issuerIds =
              extractRelationIds(props.Issuer).length > 0
                ? extractRelationIds(props.Issuer)
                : extractRelationIds(props.Issuer_ID);

            const techIds =
              extractRelationIds(props.Technologies).length > 0
                ? extractRelationIds(props.Technologies)
                : extractRelationIds(props.Technology_IDs);

            return {
              id: page.id,
              title: extractTitle(props.Title) || extractTitle(props.Name),
              issuer_id: issuerIds[0] || '',
              issue_date:
                extractRichText(props.Issue_Date) ||
                extractDate(props.Issue_Date)?.start ||
                '',
              credential_url: extractUrl(props.Credential_Url),
              credential_id: extractRichText(props.Credential_ID),
              technology_ids: techIds,
              order: extractNumber(props.Order, idx + 1),
            };
          });
        } catch (err) {
          console.warn('[NotionCertificateRepository] Fallback to static data:', err);
          return fallbackCertRepo.getAll();
        }
      })();
    }
    return cachedCertificates;
  }

  async getAllWithRelations(): Promise<CertificateWithRelations[]> {
    const [certificates, organizations, technologies] = await Promise.all([
      this.getAll(),
      new NotionOrganizationRepository().getAll(),
      new NotionTechnologyRepository().getAll(),
    ]);

    return certificates.map((cert) => ({
      ...cert,
      issuer: organizations.find((o) => matchesEntity(o, cert.issuer_id)) ?? null,
      technologies: technologies.filter((tech) =>
        cert.technology_ids.some((tId) => matchesEntity(tech, tId))
      ),
    }));
  }
}

/**
 * NotionPricingRepository
 */
export class NotionPricingRepository implements IPricingRepository {
  async getAll(): Promise<PricingService[]> {
    if (!cachedPricing) {
      cachedPricing = (async () => {
        const databaseId = NOTION_DATABASES.pricingServices();
        if (!databaseId) return fallbackPricingRepo.getAll();
        try {
          const results = await queryNotionDatabase(databaseId);
          if (!results || results.length === 0) return fallbackPricingRepo.getAll();

          const fallbackServices = await fallbackPricingRepo.getAll();

          return results.map((page: any, idx: number) => {
            const props = page.properties;
            const slug = extractRichText(props.Slug) || page.id;
            const fallbackItem =
              fallbackServices.find((s) => matchesEntity(s, slug)) ||
              fallbackServices[idx];

            const rawDeliverablesId = extractRichText(props.Deliverables_ID);
            const rawDeliverablesEn = extractRichText(props.Deliverables_EN);

            const deliverablesId = rawDeliverablesId
              ? rawDeliverablesId.split('\n').map((s) => s.trim()).filter(Boolean)
              : fallbackItem?.deliverables.id ?? [];

            const deliverablesEn = rawDeliverablesEn
              ? rawDeliverablesEn.split('\n').map((s) => s.trim()).filter(Boolean)
              : fallbackItem?.deliverables.en ?? [];

            return {
              id: page.id,
              tier_name: extractTitle(props.Tier_Name) || extractTitle(props.Name),
              slug,
              tagline: {
                id: extractRichText(props.Tagline_ID),
                en: extractRichText(props.Tagline_EN),
              },
              category:
                (extractSelect(props.Category) as any) ||
                fallbackItem?.category ||
                'mvp_launch',
              price_starting:
                extractRichText(props.Price_Starting) ||
                fallbackItem?.price_starting ||
                '',
              estimated_timeline: {
                id: extractRichText(props.Estimated_Timeline_ID),
                en: extractRichText(props.Estimated_Timeline_EN),
              },
              deliverables: {
                id: deliverablesId,
                en: deliverablesEn,
              },
              is_popular: extractCheckbox(
                props.Is_Popular,
                fallbackItem?.is_popular ?? false
              ),
              faq_items: fallbackItem?.faq_items ?? [],
              order: extractNumber(props.Order, idx + 1),
            };
          });
        } catch (err) {
          console.warn('[NotionPricingRepository] Fallback to static data:', err);
          return fallbackPricingRepo.getAll();
        }
      })();
    }
    return cachedPricing;
  }

  async getByCategory(category: ServiceCategory): Promise<PricingService[]> {
    const all = await this.getAll();
    return all.filter((s) => s.category === category);
  }

  async getBySlug(slug: string): Promise<PricingService | null> {
    const all = await this.getAll();
    return all.find((s) => matchesEntity(s, slug)) ?? null;
  }
}

/**
 * NotionPublicationRepository
 */
export class NotionPublicationRepository implements IPublicationRepository {
  async getAll(): Promise<Publication[]> {
    if (!cachedPublications) {
      cachedPublications = (async () => {
        const databaseId = NOTION_DATABASES.publications();
        if (!databaseId) return fallbackPubRepo.getAll();
        try {
          const results = await queryNotionDatabase(databaseId, {
            sorts: [{ property: 'Order', direction: 'ascending' }],
          });
          if (!results || results.length === 0) return fallbackPubRepo.getAll();

          return results.map((page: any, idx: number) => {
            const props = page.properties;
            const techIds =
              extractRelationIds(props.Technologies).length > 0
                ? extractRelationIds(props.Technologies)
                : extractRelationIds(props.Technology_IDs);

            const projIds =
              extractRelationIds(props.Projects).length > 0
                ? extractRelationIds(props.Projects)
                : extractRelationIds(props.Project_IDs);

            return {
              id: page.id,
              title: extractTitle(props.Title) || extractTitle(props.Name),
              slug: extractRichText(props.Slug) || page.id,
              category: (extractSelect(props.Category) as any) || 'engineering',
              published_date:
                extractRichText(props.Published_Date) ||
                extractDate(props.Published_Date)?.start ||
                '',
              reading_time: extractRichText(props.Reading_Time) || '5 min read',
              excerpt: {
                id: extractRichText(props.Excerpt_ID),
                en: extractRichText(props.Excerpt_EN),
              },
              external_url: extractUrl(props.External_Url) || null,
              is_published: extractCheckbox(props.Is_Published, true),
              technology_ids: techIds,
              project_ids: projIds,
              order: extractNumber(props.Order, idx + 1),
            };
          });
        } catch (err) {
          console.warn('[NotionPublicationRepository] Fallback to static data:', err);
          return fallbackPubRepo.getAll();
        }
      })();
    }
    return cachedPublications;
  }

  async getAllWithRelations(): Promise<PublicationWithRelations[]> {
    const [publications, technologies, projects] = await Promise.all([
      this.getAll(),
      new NotionTechnologyRepository().getAll(),
      new NotionProjectRepository().getAll(),
    ]);

    return publications.map((pub) => ({
      ...pub,
      technologies: technologies.filter((tech) =>
        pub.technology_ids.some((tId) => matchesEntity(tech, tId))
      ),
      projects: projects.filter((proj) =>
        pub.project_ids.some((pId) => matchesEntity(proj, pId))
      ),
    }));
  }

  async getBySlugWithRelations(slug: string): Promise<PublicationWithRelations | null> {
    const all = await this.getAllWithRelations();
    return all.find((p) => matchesEntity(p, slug)) ?? null;
  }
}
