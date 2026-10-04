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

/**
 * Proyeksi Relasional (Relational Projections)
 * Menggabungkan entitas induk dengan entitas referensi terkait.
 */
export interface ProjectWithRelations extends Project {
  organization: Organization | null;
  architecture_system: ArchitectureSystem | null;
  categories: Category[];
  technologies: Technology[];
  links: ProjectLink[];
}

export interface ExperienceWithRelations extends Experience {
  organization: Organization | null;
  technologies: Technology[];
}

export interface EducationWithRelations extends Education {
  organization: Organization | null;
  thesis_project: Project | null;
}

export interface CertificateWithRelations extends Certificate {
  issuer: Organization | null;
  technologies: Technology[];
}

export interface ArchitectureWithRelations extends ArchitectureSystem {
  technologies: Technology[];
  projects: Project[];
}

export interface PublicationWithRelations extends Publication {
  technologies: Technology[];
  projects: Project[];
}

/**
 * Kontrak Antarmuka Repositori Domain
 * Memisahkan pemanggilan data UI dari sumber data aktual (Static / Notion).
 */
export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
  getByScope(scope: CategoryTargetScope): Promise<Category[]>;
  getBySlug(slug: string): Promise<Category | null>;
}

export interface ITechnologyRepository {
  getAll(): Promise<Technology[]>;
  getByCategory(categoryId: string): Promise<Technology[]>;
  getCoreProficiencies(): Promise<Technology[]>;
  getByIds(ids: string[]): Promise<Technology[]>;
  getBySlug(slug: string): Promise<Technology | null>;
}

export interface IOrganizationRepository {
  getAll(): Promise<Organization[]>;
  getById(id: string): Promise<Organization | null>;
  getBySlug(slug: string): Promise<Organization | null>;
}

export interface IArchitectureRepository {
  getAll(): Promise<ArchitectureSystem[]>;
  getFeatured(): Promise<ArchitectureSystem[]>;
  getAllWithRelations(): Promise<ArchitectureWithRelations[]>;
  getBySlugWithRelations(slug: string): Promise<ArchitectureWithRelations | null>;
}

export interface IProjectRepository {
  getAll(): Promise<Project[]>;
  getFeatured(): Promise<Project[]>;
  getAllWithRelations(): Promise<ProjectWithRelations[]>;
  getFeaturedWithRelations(): Promise<ProjectWithRelations[]>;
  getBySlugWithRelations(slug: string): Promise<ProjectWithRelations | null>;
  getRelatedProjects(projectId: string, limit?: number): Promise<Project[]>;
}

export interface IExperienceRepository {
  getAll(): Promise<Experience[]>;
  getAllWithRelations(): Promise<ExperienceWithRelations[]>;
}

export interface IEducationRepository {
  getAll(): Promise<Education[]>;
  getAllWithRelations(): Promise<EducationWithRelations[]>;
}

export interface ICertificateRepository {
  getAll(): Promise<Certificate[]>;
  getAllWithRelations(): Promise<CertificateWithRelations[]>;
}

export interface IPricingRepository {
  getAll(): Promise<PricingService[]>;
  getByCategory(category: ServiceCategory): Promise<PricingService[]>;
  getBySlug(slug: string): Promise<PricingService | null>;
}

export interface IPublicationRepository {
  getAll(): Promise<Publication[]>;
  getAllWithRelations(): Promise<PublicationWithRelations[]>;
  getBySlugWithRelations(slug: string): Promise<PublicationWithRelations | null>;
}
