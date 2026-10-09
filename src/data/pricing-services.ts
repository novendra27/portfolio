import type { PricingService } from '@/domain/types';

export const pricingServices: PricingService[] = [
  {
    id: 'srv-mvp-launch',
    tier_name: 'MVP & Fast-Track Web App',
    slug: 'mvp-fast-track-web-app',
    tagline: {
      id: 'Solusi peluncuran produk digital cepat, responsif, dan siap validasi pasar bagi startup atau bisnis.',
      en: 'Rapid digital product MVP delivery, high-converting interfaces, and quick market validation for startups.',
    },
    category: 'mvp_launch',
    price_starting: 'Rp 1.000.000',
    estimated_timeline: {
      id: '7 – 14 Hari Kerja',
      en: '7 – 14 Working Days',
    },
    deliverables: {
      id: [
        'Antarmuka web interaktif berbasis React / Astro / Tailwind CSS',
        'Struktur database relasional ringan & teroptimasi',
        'Integrasi formulir kontak / pesanan langsung ke WhatsApp & Email',
        'Penerapan SEO dasar & integrasi domain',
        'Deployment produksi ke Vercel atau Cloud VPS',
      ],
      en: [
        'Interactive web interface using React / Astro / Tailwind CSS',
        'Lightweight, optimized relational database setup',
        'Direct WhatsApp & Email lead conversion routing',
        'Foundational technical SEO & custom domain setup',
        'Production deployment on Vercel or Cloud VPS',
      ],
    },
    is_popular: false,
    faq_items: [
      {
        question: {
          id: 'Berapa lama revisi diberikan untuk paket MVP?',
          en: 'How many revisions are included in the MVP tier?',
        },
        answer: {
          id: 'Dukungan mencakup hingga 2 putaran revisi besar dan 14 hari garansi bug pasca rilis.',
          en: 'Includes up to 2 major revision cycles and 14 days of post-launch bug warranty.',
        },
      },
    ],
    order: 1,
  },
  {
    id: 'srv-custom-system',
    tier_name: 'Custom Web & Enterprise System',
    slug: 'custom-web-enterprise-system',
    tagline: {
      id: 'Pengembangan sistem bisnis kustom, portal SaaS, penagihan utilitas, atau otomasi operasional end-to-end.',
      en: 'Bespoke enterprise software, SaaS portals, utility billing platforms, or end-to-end operational automations.',
    },
    category: 'custom_system',
    price_starting: 'Rp 8.000.000',
    estimated_timeline: {
      id: '21 – 45 Hari Kerja',
      en: '21 – 45 Working Days',
    },
    deliverables: {
      id: [
        'Arsitektur fullstack lengkap (Laravel / React / Next.js / Spring Boot)',
        'Otorisasi peran bertingkat (Role-Based Access Control / RBAC)',
        'Integrasi Payment Gateway otomatis (Xendit / Midtrans)',
        'Dashboard analitik, grafik transaksi, dan ekspor laporan berkala',
        'Pipeline deployment CI/CD otomatis & dokumentasi teknis lengkap',
        'Garansi pemeliharaan & dukungan teknis 30 hari pasca go-live',
      ],
      en: [
        'Full-stack architecture (Laravel / React / Next.js / Spring Boot)',
        'Multi-role authentication & Role-Based Access Control (RBAC)',
        'Automated payment gateway webhooks (Xendit / Midtrans)',
        'Analytical dashboards, transactional reporting, and exports',
        'Automated CI/CD deployment pipelines & technical documentation',
        '30-day post-launch warranty and priority technical support',
      ],
    },
    is_popular: true,
    faq_items: [
      {
        question: {
          id: 'Apakah sistem dapat dihubungkan dengan perangkat pihak ketiga atau API luar?',
          en: 'Can the system integrate with third-party devices or external APIs?',
        },
        answer: {
          id: 'Ya, seluruh API dibangun secara RESTful dan modular sehingga kompatibel dengan payment gateway, WhatsApp gateway, dan webhook eksternal.',
          en: 'Yes, all APIs are architected modularly to integrate with payment gateways, SMS/WhatsApp engines, and webhooks.',
        },
      },
    ],
    order: 2,
  },
  {
    id: 'srv-architecture-audit',
    tier_name: 'Architecture & Scalability Audit',
    slug: 'architecture-scalability-audit',
    tagline: {
      id: 'Evaluasi arsitektur sistem, eliminasi race condition, refaktor database, dan perencanaan skalabilitas tinggi.',
      en: 'System architecture review, race condition elimination, database query refactoring, and high-load scaling.',
    },
    category: 'architecture_audit',
    price_starting: 'Rp 4.500.000',
    estimated_timeline: {
      id: '5 – 10 Hari Kerja',
      en: '5 – 10 Working Days',
    },
    deliverables: {
      id: [
        'Laporan analisis mendalam bottleneck performa & integritas data',
        'Audit query database lambat dan rekomendasi indexing',
        'Blueprint desain arsitektur event-driven / microservices baru',
        'Sesi konsultasi teknis 1-on-1 dengan ringkasan langkah aksi konkret',
      ],
      en: [
        'Deep-dive audit report highlighting performance and concurrency bottlenecks',
        'Slow database query profiling and index optimization plan',
        'Architectural blueprint for event-driven / microservice decoupling',
        '1-on-1 executive engineering consultation with prioritized action items',
      ],
    },
    is_popular: false,
    faq_items: [
      {
        question: {
          id: 'Format apa yang akan diterima setelah sesi audit selesai?',
          en: 'What format will the deliverables take upon audit completion?',
        },
        answer: {
          id: 'Anda akan menerima dokumen Technical Architecture Review (PDF & Markdown) beserta diagram perbaikan dan rekomendasi kode.',
          en: 'You receive a complete Technical Architecture Review document (PDF & Markdown) with diagrams and refactoring guidelines.',
        },
      },
    ],
    order: 3,
  },
];
