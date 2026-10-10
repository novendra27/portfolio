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
} from './static';

import type {
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
} from './contracts';

export * from './contracts';
export * from './static';

/**
 * Dependency Injection / Service Factory
 * Komponen UI Astro mengimpor instance dari berkas ini.
 * Saat bertransisi ke Fase 2 (Notion API), kita hanya perlu mengganti
 * instansiasi di bawah ke NotionRepository tanpa mengubah kode komponen.
 */
export const categoryRepository: ICategoryRepository = new StaticCategoryRepository();
export const technologyRepository: ITechnologyRepository = new StaticTechnologyRepository();
export const organizationRepository: IOrganizationRepository = new StaticOrganizationRepository();
export const architectureRepository: IArchitectureRepository = new StaticArchitectureRepository();
export const projectRepository: IProjectRepository = new StaticProjectRepository();
export const experienceRepository: IExperienceRepository = new StaticExperienceRepository();
export const educationRepository: IEducationRepository = new StaticEducationRepository();
export const certificateRepository: ICertificateRepository = new StaticCertificateRepository();
export const pricingRepository: IPricingRepository = new StaticPricingRepository();
export const publicationRepository: IPublicationRepository = new StaticPublicationRepository();
