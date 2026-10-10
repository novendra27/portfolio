import type { Certificate } from '@/domain/types';

export const certificates: Certificate[] = [
  {
    id: 'cert-spring-boot',
    title: 'Java Spring Boot & Apache Kafka Backend Development Bootcamp',
    issuer_id: 'org-ecentrix',
    issue_date: '2026-02',
    credential_url: '',
    credential_id: 'ECENTRIX-BOOTCAMP-2026-02',
    technology_ids: ['tech-spring-boot', 'tech-kafka', 'tech-postgresql'],
    order: 1,
  },
  {
    id: 'cert-laravel-12',
    title: 'Full-Stack Modern Web Development Laravel 12 & Inertia React',
    issuer_id: 'org-aksara',
    issue_date: '2025-05',
    credential_url: '',
    credential_id: 'AKSARA-L12-2025',
    technology_ids: ['tech-laravel', 'tech-react', 'tech-typescript'],
    order: 2,
  },
  {
    id: 'cert-flutter',
    title: 'Cross-Platform Mobile Application Development Flutter Bootcamp',
    issuer_id: 'org-uin-malang',
    issue_date: '2024-10',
    credential_url: '',
    credential_id: 'MTF-FLUTTER-2024',
    technology_ids: ['tech-flutter'],
    order: 3,
  },
];
