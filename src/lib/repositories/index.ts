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

import {
  NotionArchitectureRepository,
  NotionCategoryRepository,
  NotionCertificateRepository,
  NotionEducationRepository,
  NotionExperienceRepository,
  NotionOrganizationRepository,
  NotionPricingRepository,
  NotionProjectRepository,
  NotionPublicationRepository,
  NotionTechnologyRepository,
} from './notion';

import { isNotionConfigured } from '@/lib/notion/client';

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
export * from './notion';

/**
 * Dependency Injection / Service Factory (Hybrid Fallback)
 * Komponen UI Astro mengimpor instance dari berkas ini.
 * Jika NOTION_API_KEY disetel di environment, sistem secara otomatis
 * mengaktifkan NotionRepository. Jika tidak, sistem anggun fallback
 * ke StaticRepository lokal.
 */
const useNotion = isNotionConfigured();

export const categoryRepository: ICategoryRepository = useNotion
  ? new NotionCategoryRepository()
  : new StaticCategoryRepository();

export const technologyRepository: ITechnologyRepository = useNotion
  ? new NotionTechnologyRepository()
  : new StaticTechnologyRepository();

export const organizationRepository: IOrganizationRepository = useNotion
  ? new NotionOrganizationRepository()
  : new StaticOrganizationRepository();

export const architectureRepository: IArchitectureRepository = useNotion
  ? new NotionArchitectureRepository()
  : new StaticArchitectureRepository();

export const projectRepository: IProjectRepository = useNotion
  ? new NotionProjectRepository()
  : new StaticProjectRepository();

export const experienceRepository: IExperienceRepository = useNotion
  ? new NotionExperienceRepository()
  : new StaticExperienceRepository();

export const educationRepository: IEducationRepository = useNotion
  ? new NotionEducationRepository()
  : new StaticEducationRepository();

export const certificateRepository: ICertificateRepository = useNotion
  ? new NotionCertificateRepository()
  : new StaticCertificateRepository();

export const pricingRepository: IPricingRepository = useNotion
  ? new NotionPricingRepository()
  : new StaticPricingRepository();

export const publicationRepository: IPublicationRepository = useNotion
  ? new NotionPublicationRepository()
  : new StaticPublicationRepository();
