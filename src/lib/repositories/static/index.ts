import {
  architectureSystems,
  categories,
  certificates,
  educations,
  experiences,
  organizations,
  pricingServices,
  projectLinks,
  projects,
  publications,
  technologies,
} from '@/data';

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
 * StaticCategoryRepository
 * Implementasi repositori kategori berbasis dataset lokal Fase 1.
 */
export class StaticCategoryRepository implements ICategoryRepository {
  async getAll(): Promise<Category[]> {
    return [...categories].sort((a, b) => a.order - b.order);
  }

  async getByScope(scope: CategoryTargetScope): Promise<Category[]> {
    return categories
      .filter((cat) => cat.target_scope === scope)
      .sort((a, b) => a.order - b.order);
  }

  async getBySlug(slug: string): Promise<Category | null> {
    return categories.find((cat) => cat.slug === slug) ?? null;
  }
}

/**
 * StaticTechnologyRepository
 * Implementasi repositori teknologi berbasis dataset lokal Fase 1.
 */
export class StaticTechnologyRepository implements ITechnologyRepository {
  async getAll(): Promise<Technology[]> {
    return [...technologies].sort((a, b) => a.order - b.order);
  }

  async getByCategory(categoryId: string): Promise<Technology[]> {
    return technologies
      .filter((tech) => tech.category_id === categoryId)
      .sort((a, b) => a.order - b.order);
  }

  async getCoreProficiencies(): Promise<Technology[]> {
    return technologies
      .filter((tech) => tech.proficiency === 'core_specialty')
      .sort((a, b) => a.order - b.order);
  }

  async getByIds(ids: string[]): Promise<Technology[]> {
    return technologies.filter((tech) => ids.includes(tech.id));
  }

  async getBySlug(slug: string): Promise<Technology | null> {
    return technologies.find((tech) => tech.slug === slug) ?? null;
  }
}

/**
 * StaticOrganizationRepository
 * Implementasi repositori organisasi berbasis dataset lokal Fase 1.
 */
export class StaticOrganizationRepository implements IOrganizationRepository {
  async getAll(): Promise<Organization[]> {
    return [...organizations];
  }

  async getById(id: string): Promise<Organization | null> {
    return organizations.find((org) => org.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<Organization | null> {
    return organizations.find((org) => org.slug === slug) ?? null;
  }
}

/**
 * StaticArchitectureRepository
 * Menyelesaikan relasi teknologi dan proyek terkait secara in-memory.
 */
export class StaticArchitectureRepository implements IArchitectureRepository {
  async getAll(): Promise<ArchitectureSystem[]> {
    return [...architectureSystems].sort((a, b) => a.order - b.order);
  }

  async getFeatured(): Promise<ArchitectureSystem[]> {
    return architectureSystems
      .filter((item) => item.is_featured)
      .sort((a, b) => a.order - b.order);
  }

  async getAllWithRelations(): Promise<ArchitectureWithRelations[]> {
    return architectureSystems
      .map((arch) => ({
        ...arch,
        technologies: technologies.filter((tech) =>
          arch.technology_ids.includes(tech.id)
        ),
        projects: projects.filter((proj) =>
          arch.project_ids.includes(proj.id)
        ),
      }))
      .sort((a, b) => a.order - b.order);
  }

  async getBySlugWithRelations(slug: string): Promise<ArchitectureWithRelations | null> {
    const arch = architectureSystems.find((item) => item.slug === slug);
    if (!arch) return null;

    return {
      ...arch,
      technologies: technologies.filter((tech) =>
        arch.technology_ids.includes(tech.id)
      ),
      projects: projects.filter((proj) =>
        arch.project_ids.includes(proj.id)
      ),
    };
  }
}

/**
 * StaticProjectRepository
 * Menyelesaikan relasi multi-link, organisasi, arsitektur, dan teknologi.
 */
export class StaticProjectRepository implements IProjectRepository {
  private resolveRelations(project: Project): ProjectWithRelations {
    return {
      ...project,
      organization:
        organizations.find((org) => org.id === project.organization_id) ?? null,
      architecture_system: project.architecture_system_id
        ? architectureSystems.find(
            (arch) => arch.id === project.architecture_system_id
          ) ?? null
        : null,
      categories: categories.filter((cat) =>
        project.category_ids.includes(cat.id)
      ),
      technologies: technologies.filter((tech) =>
        project.technology_ids.includes(tech.id)
      ),
      links: projectLinks
        .filter((link) => link.project_id === project.id)
        .sort((a, b) => a.order - b.order),
    };
  }

  async getAll(): Promise<Project[]> {
    return [...projects].sort((a, b) => a.order - b.order);
  }

  async getFeatured(): Promise<Project[]> {
    return projects
      .filter((proj) => proj.is_featured)
      .sort((a, b) => a.order - b.order);
  }

  async getAllWithRelations(): Promise<ProjectWithRelations[]> {
    return projects
      .map((proj) => this.resolveRelations(proj))
      .sort((a, b) => a.order - b.order);
  }

  async getFeaturedWithRelations(): Promise<ProjectWithRelations[]> {
    return projects
      .filter((proj) => proj.is_featured)
      .map((proj) => this.resolveRelations(proj))
      .sort((a, b) => a.order - b.order);
  }

  async getBySlugWithRelations(slug: string): Promise<ProjectWithRelations | null> {
    const project = projects.find((proj) => proj.slug === slug);
    if (!project) return null;
    return this.resolveRelations(project);
  }

  async getRelatedProjects(projectId: string, limit = 3): Promise<Project[]> {
    const current = projects.find((proj) => proj.id === projectId);
    if (!current) return [];

    return projects
      .filter(
        (proj) =>
          proj.id !== projectId &&
          (proj.category_ids.some((id) => current.category_ids.includes(id)) ||
            proj.technology_ids.some((id) => current.technology_ids.includes(id)))
      )
      .slice(0, limit);
  }
}

/**
 * StaticExperienceRepository
 * Menyelesaikan relasi lembaga kerja dan teknologi yang digunakan.
 */
export class StaticExperienceRepository implements IExperienceRepository {
  async getAll(): Promise<Experience[]> {
    return [...experiences].sort((a, b) => a.order - b.order);
  }

  async getAllWithRelations(): Promise<ExperienceWithRelations[]> {
    return experiences
      .map((exp) => ({
        ...exp,
        organization:
          organizations.find((org) => org.id === exp.organization_id) ?? null,
        technologies: technologies.filter((tech) =>
          exp.technology_ids.includes(tech.id)
        ),
      }))
      .sort((a, b) => a.order - b.order);
  }
}

/**
 * StaticEducationRepository
 * Menyelesaikan relasi almamater universitas dan proyek skripsi.
 */
export class StaticEducationRepository implements IEducationRepository {
  async getAll(): Promise<Education[]> {
    return [...educations].sort((a, b) => a.order - b.order);
  }

  async getAllWithRelations(): Promise<EducationWithRelations[]> {
    return educations
      .map((edu) => ({
        ...edu,
        organization:
          organizations.find((org) => org.id === edu.organization_id) ?? null,
        thesis_project: edu.thesis_project_id
          ? projects.find((proj) => proj.id === edu.thesis_project_id) ?? null
          : null,
      }))
      .sort((a, b) => a.order - b.order);
  }
}

/**
 * StaticCertificateRepository
 * Menyelesaikan relasi institusi penerbit dan teknologi sertifikasi.
 */
export class StaticCertificateRepository implements ICertificateRepository {
  async getAll(): Promise<Certificate[]> {
    return [...certificates].sort((a, b) => a.order - b.order);
  }

  async getAllWithRelations(): Promise<CertificateWithRelations[]> {
    return certificates
      .map((cert) => ({
        ...cert,
        issuer:
          organizations.find((org) => org.id === cert.issuer_id) ?? null,
        technologies: technologies.filter((tech) =>
          cert.technology_ids.includes(tech.id)
        ),
      }))
      .sort((a, b) => a.order - b.order);
  }
}

/**
 * StaticPricingRepository
 * Mengelola penawaran paket jasa dan estimasi waktu.
 */
export class StaticPricingRepository implements IPricingRepository {
  async getAll(): Promise<PricingService[]> {
    return [...pricingServices].sort((a, b) => a.order - b.order);
  }

  async getByCategory(category: ServiceCategory): Promise<PricingService[]> {
    return pricingServices
      .filter((srv) => srv.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async getBySlug(slug: string): Promise<PricingService | null> {
    return pricingServices.find((srv) => srv.slug === slug) ?? null;
  }
}

/**
 * StaticPublicationRepository
 * Menyelesaikan relasi artikel dengan teknologi dan studi kasus proyek.
 */
export class StaticPublicationRepository implements IPublicationRepository {
  async getAll(): Promise<Publication[]> {
    return publications
      .filter((pub) => pub.is_published)
      .sort((a, b) => a.order - b.order);
  }

  async getAllWithRelations(): Promise<PublicationWithRelations[]> {
    return publications
      .filter((pub) => pub.is_published)
      .map((pub) => ({
        ...pub,
        technologies: technologies.filter((tech) =>
          pub.technology_ids.includes(tech.id)
        ),
        projects: projects.filter((proj) =>
          pub.project_ids.includes(proj.id)
        ),
      }))
      .sort((a, b) => a.order - b.order);
  }

  async getBySlugWithRelations(slug: string): Promise<PublicationWithRelations | null> {
    const pub = publications.find(
      (item) => item.slug === slug && item.is_published
    );
    if (!pub) return null;

    return {
      ...pub,
      technologies: technologies.filter((tech) =>
        pub.technology_ids.includes(tech.id)
      ),
      projects: projects.filter((proj) =>
        pub.project_ids.includes(proj.id)
      ),
    };
  }
}
