import {
  ArchitectureSystemSchema,
  CategorySchema,
  CertificateSchema,
  EducationSchema,
  ExperienceSchema,
  PricingServiceSchema,
  ProjectLinkSchema,
  ProjectSchema,
  PublicationSchema,
  TechnologySchema,
  OrganizationSchema,
} from '@/domain/schemas';

import { architectureSystems } from './architecture-systems';
import { categories } from './categories';
import { certificates } from './certificates';
import { educations } from './educations';
import { experiences } from './experiences';
import { organizations } from './organizations';
import { pricingServices } from './pricing-services';
import { projectLinks } from './project-links';
import { projects } from './projects';
import { publications } from './publications';
import { technologies } from './technologies';

export * from './architecture-systems';
export * from './categories';
export * from './certificates';
export * from './educations';
export * from './experiences';
export * from './organizations';
export * from './pricing-services';
export * from './project-links';
export * from './projects';
export * from './publications';
export * from './technologies';

/**
 * Validasi Mandiri (Self-Validation):
 * Memastikan setiap entitas statis lokal 100% mematuhi Zod schema tanpa celah.
 */
export function validateStaticDataset(): void {
  categories.forEach((item) => CategorySchema.parse(item));
  technologies.forEach((item) => TechnologySchema.parse(item));
  organizations.forEach((item) => OrganizationSchema.parse(item));
  architectureSystems.forEach((item) => ArchitectureSystemSchema.parse(item));
  projects.forEach((item) => ProjectSchema.parse(item));
  projectLinks.forEach((item) => ProjectLinkSchema.parse(item));
  experiences.forEach((item) => ExperienceSchema.parse(item));
  educations.forEach((item) => EducationSchema.parse(item));
  certificates.forEach((item) => CertificateSchema.parse(item));
  pricingServices.forEach((item) => PricingServiceSchema.parse(item));
  publications.forEach((item) => PublicationSchema.parse(item));
}

// Jalankan validasi saat module dimuat
validateStaticDataset();
