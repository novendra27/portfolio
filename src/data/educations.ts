import type { Education } from '@/domain/types';

export const educations: Education[] = [
  {
    id: 'edu-uin-malang',
    organization_id: 'org-uin-malang',
    degree: 'S1 Teknik Informatika (Sarjana Komputer / S.Kom)',
    period: '2022 – 2025',
    gpa: '3.5 Tahun Kelulusan (Fast-Track)',
    thesis_title:
      'Optimasi Pengelompokan Kuliah Kerja Mahasiswa (KKM) Berbasis Multi-Constraint Menggunakan Algoritma Genetika',
    thesis_project_id: 'proj-kkm-algen',
    order: 1,
  },
  {
    id: 'edu-smkn1-boyolangu',
    organization_id: 'org-smkn1-boyolangu',
    degree: 'SMK Rekayasa Perangkat Lunak (Software Engineering)',
    period: '2019 – 2022',
    gpa: '',
    thesis_title: '',
    thesis_project_id: null,
    order: 2,
  },
];
