import type { Category } from '@/domain/types';

export const categories: Category[] = [
  {
    id: 'cat-backend',
    name: 'Backend & Distributed Services',
    slug: 'backend-distributed-services',
    target_scope: 'technology',
    group_facet: 'tech_tier',
    description: {
      id: 'Layanan backend berkinerja tinggi, API berskala enterprise, dan arsitektur event-driven.',
      en: 'High-performance backend services, enterprise-scale APIs, and event-driven architectures.',
    },
    order: 1,
  },
  {
    id: 'cat-frontend',
    name: 'Frontend & Modern Web Apps',
    slug: 'frontend-modern-web-apps',
    target_scope: 'technology',
    group_facet: 'tech_tier',
    description: {
      id: 'Antarmuka web interaktif, Single Page Application (SPA), dan rancangan responsif bernuansa arsitektural.',
      en: 'Interactive web interfaces, Single Page Applications (SPA), and architectural responsive layouts.',
    },
    order: 2,
  },
  {
    id: 'cat-database',
    name: 'Relational Database & Persistence',
    slug: 'relational-database-persistence',
    target_scope: 'technology',
    group_facet: 'tech_tier',
    description: {
      id: 'Manajemen basis data relasional, serverless storage, pemodelan data, dan optimalisasi query.',
      en: 'Relational database management, serverless storage, data modeling, and query optimization.',
    },
    order: 3,
  },
  {
    id: 'cat-message-broker',
    name: 'Event Streaming & Message Broker',
    slug: 'event-streaming-message-broker',
    target_scope: 'technology',
    group_facet: 'tech_tier',
    description: {
      id: 'Pengiriman pesan asinkron, streaming data berkecepatan tinggi, dan integrasi microservice.',
      en: 'Asynchronous messaging, high-throughput streaming, and decoupled microservice communication.',
    },
    order: 4,
  },
  {
    id: 'cat-ai-algorithm',
    name: 'AI & Optimization Algorithms',
    slug: 'ai-optimization-algorithms',
    target_scope: 'project',
    group_facet: 'domain_solution',
    description: {
      id: 'Penerapan algoritma genetika dan optimasi komputasional untuk pemecahan masalah skala besar.',
      en: 'Application of genetic algorithms and computational optimization for large-scale combinatorial problems.',
    },
    order: 5,
  },
  {
    id: 'cat-utility-billing',
    name: 'Utility Billing & Progressive Systems',
    slug: 'utility-billing-progressive-systems',
    target_scope: 'project',
    group_facet: 'domain_solution',
    description: {
      id: 'Sistem pencatatan meteran fisik, otomasi kalkulasi tarif progresif, dan penagihan berkala.',
      en: 'Physical meter reading management, progressive utility rate calculations, and automated recurring billing.',
    },
    order: 6,
  },
  {
    id: 'cat-ecommerce',
    name: 'E-Commerce & Digital Payments',
    slug: 'ecommerce-digital-payments',
    target_scope: 'project',
    group_facet: 'domain_solution',
    description: {
      id: 'Aplikasi belanja digital multi-peran dengan integrasi payment gateway otomatis dan analitik.',
      en: 'Multi-role digital commerce platforms with payment gateway automation and sales analytics.',
    },
    order: 7,
  },
  {
    id: 'cat-saas-tools',
    name: 'Client SaaS & Enterprise Systems',
    slug: 'client-saas-enterprise-systems',
    target_scope: 'project',
    group_facet: 'domain_solution',
    description: {
      id: 'Sistem perangkat lunak B2B, manajemen evaluasi institusional, dan integrasi server otomatis.',
      en: 'B2B software solutions, institutional assessment platforms, and automated server workflows.',
    },
    order: 8,
  },
];
