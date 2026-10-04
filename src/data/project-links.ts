import type { ProjectLink } from '@/domain/types';

export const projectLinks: ProjectLink[] = [
  // 1. KKM Grouping
  {
    id: 'link-kkm-fe',
    project_id: 'proj-kkm-algen',
    title: 'Frontend Web (Laravel)',
    url: 'https://github.com/novendra27/web-algen',
    type: 'github',
    is_primary: true,
    order: 1,
  },
  {
    id: 'link-kkm-be',
    project_id: 'proj-kkm-algen',
    title: 'Algorithm Engine (Python)',
    url: 'https://github.com/novendra27/server-algen',
    type: 'github',
    is_primary: false,
    order: 2,
  },

  // 2. Tagihan PDAM Pandanrejo
  {
    id: 'link-pdam-live',
    project_id: 'proj-tagihan-pdam',
    title: 'Live Website (pamdesku.com)',
    url: 'https://www.pamdesku.com/',
    type: 'live_demo',
    is_primary: true,
    order: 1,
  },

  // 4. E-Book Store
  {
    id: 'link-ebook-repo',
    project_id: 'proj-ebook-store',
    title: 'GitHub Repository',
    url: 'https://github.com/novendra27/ebook-store',
    type: 'github',
    is_primary: true,
    order: 1,
  },

  // 7. WatchTube
  {
    id: 'link-watchtube-live',
    project_id: 'proj-watchtube',
    title: 'Live Demo (Vercel)',
    url: 'https://nov-watch-tube.vercel.app/',
    type: 'live_demo',
    is_primary: true,
    order: 1,
  },
  {
    id: 'link-watchtube-repo',
    project_id: 'proj-watchtube',
    title: 'GitHub Repository',
    url: 'https://github.com/novendra27/watch-tube',
    type: 'github',
    is_primary: false,
    order: 2,
  },

  // 8. VirtualR
  {
    id: 'link-virtualr-live',
    project_id: 'proj-virtualr',
    title: 'Live Demo (Vercel)',
    url: 'https://nov-virtualr.vercel.app/',
    type: 'live_demo',
    is_primary: true,
    order: 1,
  },
  {
    id: 'link-virtualr-repo',
    project_id: 'proj-virtualr',
    title: 'GitHub Repository',
    url: 'https://github.com/novendra27/virtualr',
    type: 'github',
    is_primary: false,
    order: 2,
  },

  // 9. Manajemen Stok Toko (Kafka)
  {
    id: 'link-stok-producer',
    project_id: 'proj-manajemen-stok',
    title: 'Kafka Producer (Spring Boot)',
    url: 'https://github.com/novendra27/store-management-producer',
    type: 'github',
    is_primary: true,
    order: 1,
  },
  {
    id: 'link-stok-consumer',
    project_id: 'proj-manajemen-stok',
    title: 'Kafka Consumer (Spring Boot)',
    url: 'https://github.com/novendra27/store-management-consumer',
    type: 'github',
    is_primary: false,
    order: 2,
  },
];
