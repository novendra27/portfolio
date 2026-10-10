import type { Experience } from '@/domain/types';

export const experiences: Experience[] = [
  {
    id: 'exp-language-center',
    role: 'Fullstack Developer',
    organization_id: 'org-language-center',
    type: 'fulltime',
    period_start: '2026-08',
    period_end: null,
    is_current: true,
    location: 'Kediri, Jawa Timur, Indonesia',
    highlights: {
      id: [
        'Merancang, mengembangkan, dan memelihara arsitektur aplikasi berbasis web secara end-to-end (frontend hingga backend).',
        'Mengintegrasikan sistem manajemen kursus, pencatatan data pembelajar, dan otomasi alur kerja internal.',
      ],
      en: [
        'Architecting, developing, and maintaining web application systems end-to-end (frontend to backend).',
        'Integrating course management engines, learner progress tracking, and internal workflow automations.',
      ],
    },
    technology_ids: ['tech-react', 'tech-laravel', 'tech-postgresql', 'tech-tailwind'],
    order: 1,
  },
  {
    id: 'exp-java-digital',
    role: 'IT Programmer & NOC (Network Operations Center)',
    organization_id: 'org-java-digital',
    type: 'fulltime',
    period_start: '2026-04',
    period_end: '2026-08',
    is_current: false,
    location: 'Tulungagung, Jawa Timur, Indonesia',
    highlights: {
      id: [
        'Mengembangkan dan mengotomasi sistem internal penagihan pelanggan internet (HNK WiFi) untuk meningkatkan efisiensi operasional.',
        'Memonitor ketersediaan dan melakukan troubleshooting pada infrastruktur jaringan ISP untuk menjamin keandalan uptime layanan.',
        'Memberikan dukungan teknis kepada tim operasional dan teknisi lapangan terkait sistem penagihan dan konfigurasi jaringan.',
      ],
      en: [
        'Developed and automated internal ISP billing workflows (HNK WiFi) eliminating manual invoicing bottlenecks.',
        'Monitored network availability and performed root cause troubleshooting on ISP infrastructure ensuring high service uptime.',
        'Provided technical support to operational and field teams regarding billing software and network routing.',
      ],
    },
    technology_ids: ['tech-codeigniter', 'tech-mysql', 'tech-bootstrap'],
    order: 2,
  },
  {
    id: 'exp-dndfx',
    role: 'Web Developer Intern',
    organization_id: 'org-dndfx',
    type: 'internship',
    period_start: '2025-06',
    period_end: '2025-07',
    is_current: false,
    location: 'Kota Malang, Jawa Timur (Hybrid)',
    highlights: {
      id: [
        'Mengelola siklus pengembangan website penyewaan bot trading Forex (Expert Advisor) dari requirements gathering hingga deployment.',
        'Membangun sistem alokasi Virtual Private Server (VPS) otomatis 24/7 untuk akun trading investor.',
        'Mengintegrasikan sistem tiket keluhan pelanggan dan riwayat transaksi sewa berkala.',
      ],
      en: [
        'Managed end-to-end development of a Forex trading bot (Expert Advisor) rental platform from requirements analysis to deployment.',
        'Engineered an automated 24/7 Virtual Private Server (VPS) provisioning module for investor trading accounts.',
        'Implemented centralized client support ticketing and automated recurring rental billing records.',
      ],
    },
    technology_ids: ['tech-laravel', 'tech-mysql', 'tech-bootstrap'],
    order: 3,
  },
  {
    id: 'exp-kriingg',
    role: 'Frontend Mobile Developer Intern',
    organization_id: 'org-kriingg',
    type: 'internship',
    period_start: '2024-08',
    period_end: '2024-10',
    is_current: false,
    location: 'Kota Blitar, Jawa Timur (Remote/WFA)',
    highlights: {
      id: [
        'Mengembangkan antarmuka aplikasi seluler "KRIINGG!!!", platform e-commerce dan digitalisasi UMKM.',
        'Mengonversi desain antarmuka ke dalam komponen React Native berbasis tipe data ketat (TypeScript).',
        'Mengimplementasikan modul registrasi dan verifikasi data mitra bisnis secara responsif.',
      ],
      en: [
        'Built client-facing mobile screens for "KRIINGG!!!", an SME e-commerce and technological empowerment app.',
        'Translated UI/UX wireframes into modular, strictly typed React Native components using TypeScript.',
        'Engineered the core merchant registration and data verification workflow.',
      ],
    },
    technology_ids: ['tech-react-native', 'tech-typescript'],
    order: 4,
  },
  {
    id: 'exp-gdg-maliki',
    role: 'Associate Developer & Speaker – Frontend Division',
    organization_id: 'org-gdg-maliki',
    type: 'community',
    period_start: '2024-10',
    period_end: '2025-09',
    is_current: false,
    location: 'Kota Malang, Jawa Timur, Indonesia',
    highlights: {
      id: [
        'Menjadi pembicara dan fasilitator workshop teknis dalam event "Build With AI 2025" membawakan Flutterflow & Gemini 2.0.',
        'Mengkaji dan membagikan praktik terbaik pengembangan frontend berbasis ekosistem web modern.',
        'Berpartisipasi dalam riset dan inisiasi proyek-proyek komunitas open source untuk mahasiswa.',
      ],
      en: [
        'Featured speaker and workshop instructor at "Build With AI 2025", delivering hands-on Flutterflow and Gemini 2.0 architectures.',
        'Researched and advocated modern frontend engineering patterns across community developer circles.',
        'Contributed to open source community research initiatives and student software mentoring.',
      ],
    },
    technology_ids: ['tech-react', 'tech-flutter'],
    order: 5,
  },
  {
    id: 'exp-sekawan',
    role: 'Student Field Work Practice (PKL)',
    organization_id: 'org-sekawan',
    type: 'internship',
    period_start: '2020-08',
    period_end: '2020-12',
    is_current: false,
    location: 'Kota Malang, Jawa Timur, Indonesia',
    highlights: {
      id: [
        'Mengonversi desain grafis web menjadi antarmuka responsif menggunakan HTML, CSS, dan Bootstrap.',
        'Menyusun dan mendokumentasikan buku panduan teknis operasional (manual book) untuk aplikasi web dan mobile.',
      ],
      en: [
        'Sliced visual web mockups into responsive browser layouts using HTML, CSS, and Bootstrap.',
        'Authored and structured comprehensive technical user manuals for enterprise web and mobile applications.',
      ],
    },
    technology_ids: ['tech-bootstrap'],
    order: 6,
  },
];
