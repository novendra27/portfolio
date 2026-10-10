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
        'Antarmuka web responsif, modern, dan teroptimasi untuk konversi',
        'Struktur database relasional ringan & teroptimasi',
        'Integrasi formulir kontak / pesanan langsung ke WhatsApp & Email',
        'Penerapan SEO teknis dasar & integrasi domain',
        'Deployment produksi dan konfigurasi lingkungan cloud siap pakai',
      ],
      en: [
        'Responsive, modern, and high-converting web interface',
        'Lightweight, optimized relational database setup',
        'Direct WhatsApp & Email lead conversion routing',
        'Foundational technical SEO & custom domain setup',
        'Production cloud deployment and environment configuration',
      ],
    },
    is_popular: false,
    faq_items: [
      {
        question: {
          id: 'Siapa yang memegang hak kepemilikan source code dan akun deployment?',
          en: 'Who owns the source code and production deployment accounts?',
        },
        answer: {
          id: 'Klien memegang 100% hak kepemilikan penuh. Repositori GitHub dibuat atas nama akun klien atau ditransfer penuh pasca pelunasan, termasuk akses dashboard cloud hosting. Tanpa lisensi terselubung atau vendor lock-in.',
          en: 'You receive 100% full ownership. The GitHub repository is provisioned under your account or transferred upon completion, including cloud hosting dashboard access. Zero vendor lock-in.',
        },
      },
      {
        question: {
          id: 'Apakah biaya jasa sudah mencakup sewa server dan nama domain?',
          en: 'Does the package price include server hosting and domain registration?',
        },
        answer: {
          id: 'Biaya jasa mencakup penyiapan arsitektur dan konfigurasi deployment di infrastruktur cloud yang efisien. Pembelian domain kustom (.com/.id) dibeli atas kepemilikan klien sendiri dan akan dipandu konfigurasi DNS-nya secara menyeluruh.',
          en: 'The fee covers architecture setup and deployment on efficient cloud infrastructure. Custom domain registration (.com/.id) is purchased directly under your name with full DNS configuration guidance included.',
        },
      },
      {
        question: {
          id: 'Bagaimana mekanisme revisi dan jaminan perbaikan bug pasca peluncuran?',
          en: 'How are revision cycles and post-launch bug warranties handled?',
        },
        answer: {
          id: 'Mencakup hingga 2 siklus revisi minor fungsional serta 14 hari garansi perbaikan bug gratis sejak tanggal rilis produksi untuk memastikan kestabilan aplikasi.',
          en: 'Includes up to 2 minor functional revision cycles and a 14-day free bug-fixing warranty starting from the production launch date to guarantee initial stability.',
        },
      },
      {
        question: {
          id: 'Bagaimana skema pembayaran untuk paket MVP ini?',
          en: 'What is the payment schedule for this MVP tier?',
        },
        answer: {
          id: 'Skema standar menggunakan termin 50% uang muka (DP) sebelum kick-off pengerjaan dimulai, dan 50% pelunasan setelah deployment ke staging/produksi berhasil diverifikasi oleh klien.',
          en: 'Standard payment terms are a 50% down payment before project kickoff, and the remaining 50% upon verified staging or production deployment.',
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
        'Arsitektur fullstack kustom sesuai kebutuhan spesifik & skala sistem',
        'Otorisasi peran bertingkat (Role-Based Access Control / RBAC)',
        'Integrasi Payment Gateway otomatis & pengelolaan webhook transaksi',
        'Dashboard analitik, grafik transaksi, dan ekspor laporan berkala',
        'Pipeline deployment CI/CD otomatis & dokumentasi teknis lengkap',
        'Garansi pemeliharaan & dukungan teknis 30 hari pasca go-live',
      ],
      en: [
        'Tailored full-stack architecture aligned with your system scale & requirements',
        'Multi-role authentication & Role-Based Access Control (RBAC)',
        'Automated payment gateway integration & transactional webhook handlers',
        'Analytical dashboards, transactional reporting, and exports',
        'Automated CI/CD deployment pipelines & technical documentation',
        '30-day post-launch warranty and priority technical support',
      ],
    },
    is_popular: true,
    faq_items: [
      {
        question: {
          id: 'Bagaimana tahapan pengerjaan (milestone) dan termin pembayaran sistem kustom?',
          en: 'What are the project milestones and payment tranches for custom systems?',
        },
        answer: {
          id: 'Pengerjaan dibagi ke dalam 3 milestone terukur: (1) 30% Kick-off & skema database/wireframe, (2) 40% Core backend, logika bisnis & integrasi payment gateway, (3) 30% User Acceptance Testing (UAT), audit keamanan, dan serah terima akhir.',
          en: 'Projects are structured in 3 transparent milestones: (1) 30% Kickoff & DB schema/wireframes, (2) 40% Core backend, business logic & payment gateway webhooks, (3) 30% UAT, security audit, and final production handover.',
        },
      },
      {
        question: {
          id: 'Bagaimana jika ada penambahan fitur baru di tengah masa pengembangan?',
          en: 'How are new feature additions handled during active development?',
        },
        answer: {
          id: 'Fitur tambahan di luar spesifikasi awal dikelola via Change Request (CR) formal. Dampak arsitektur, estimasi biaya, dan penyesuaian timeline akan diajukan secara transparan tanpa mengganggu milestone aktif.',
          en: 'Out-of-scope additions are managed via documented Change Requests (CR). Architectural impact, timeline adjustments, and transparent cost estimates are agreed upon without disrupting ongoing milestones.',
        },
      },
      {
        question: {
          id: 'Bagaimana standar keamanan data dan keandalan integrasi pihak ketiga?',
          en: 'What security standards and integration protocols are implemented?',
        },
        answer: {
          id: 'Menerapkan proteksi OWASP (hashing bcrypt/Argon2, proteksi SQL Injection, mitigasi CSRF, dan sanitasi payload). Webhook payment gateway divalidasi dengan cryptographic signature verification.',
          en: 'Built with OWASP best practices (bcrypt/Argon2 password hashing, SQL injection protection, CSRF mitigation, and payload sanitization). Webhook integrations use cryptographic signature validation.',
        },
      },
      {
        question: {
          id: 'Apa saja cakupan garansi dan dukungan teknis 30 hari pasca go-live?',
          en: 'What is covered under the 30-day post-launch warranty and technical support?',
        },
        answer: {
          id: 'Mencakup perbaikan segala bug fungsional atau kendala transaksi pada kode yang diserahkan, serta penyediaan runbook dokumentasi teknis dan panduan operasional sistem.',
          en: 'Covers resolution for any functional bugs, transactional anomalies, or runtime regressions in delivered code, alongside technical runbooks and system operational manuals.',
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
        'Blueprint desain arsitektur target yang terukur dan skalabel',
        'Sesi konsultasi teknis 1-on-1 dengan ringkasan langkah aksi konkret',
      ],
      en: [
        'Deep-dive audit report highlighting performance and concurrency bottlenecks',
        'Slow database query profiling and index optimization plan',
        'Scalable target architecture blueprint and decoupling strategy',
        '1-on-1 executive engineering consultation with prioritized action items',
      ],
    },
    is_popular: false,
    faq_items: [
      {
        question: {
          id: 'Akses apa saja yang perlu disediakan klien sebelum audit dimulai?',
          en: 'What access permissions are required before beginning the architecture audit?',
        },
        answer: {
          id: 'Klien cukup menyediakan akses read-only ke repositori Git dan skema database (tanpa data sensitif/PII). Jika kebijakan korporasi membatasi akses, audit dapat dilakukan via sesi remote screen-share interaktif.',
          en: 'You only need to provide read-only access to relevant Git repositories and schema definitions (sanitized of PII). For strict enterprise environments, audits can be conducted via live remote screen-sharing.',
        },
      },
      {
        question: {
          id: 'Apakah ada jaminan kerahasiaan terhadap source code dan data bisnis kami?',
          en: 'How do you guarantee confidentiality regarding our source code and proprietary data?',
        },
        answer: {
          id: 'Mutlak. Perjanjian Kerahasiaan (Non-Disclosure Agreement / NDA) formal dapat ditandatangani bersama sebelum akses atau dokumen teknis apa pun dibagikan.',
          en: 'Absolute confidentiality. A formal Non-Disclosure Agreement (NDA) is executed prior to receiving any technical documentation, architectural schematics, or repository access.',
        },
      },
      {
        question: {
          id: 'Apa bentuk konkret deliverable yang diterima klien setelah audit selesai?',
          en: 'What tangible deliverables are produced upon audit completion?',
        },
        answer: {
          id: 'Dokumen komprehensif Technical Architecture Review (PDF & Markdown) berisi analisis bottleneck konkurensi, profil query database lambat, diagram arsitektur target, serta contoh Pull Request (PR) perbaikan kode.',
          en: 'A comprehensive Technical Architecture Review document (PDF & Markdown) outlining concurrency bottlenecks, slow query profiling, target architecture diagrams, and actionable refactoring PR blueprints.',
        },
      },
      {
        question: {
          id: 'Apakah sesi audit ini mencakup eksekusi refactoring kode secara langsung?',
          en: 'Does this audit tier include hands-on code refactoring implementation?',
        },
        answer: {
          id: 'Paket audit berfokus pada diagnosa, blueprint arsitektur, dan sesi konsultasi 1-on-1. Jika tim Anda memerlukan pendampingan eksekusi refactoring menyeluruh, pekerjaan dapat dilanjutkan ke kontrak retainer atau paket Custom System.',
          en: 'The audit tier focuses on deep diagnosis, target blueprints, and executive consultation. If full hands-on refactoring is required, execution can be seamlessly transitioned into our Custom System tier or retainer.',
        },
      },
    ],
    order: 3,
  },
];
