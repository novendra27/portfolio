import type { ArchitectureSystem } from '@/domain/types';

export const architectureSystems: ArchitectureSystem[] = [
  {
    id: 'arch-event-driven-kafka',
    title: 'Event-Driven High-Throughput Inventory Streaming',
    slug: 'event-driven-kafka-streaming',
    pattern_type: 'event_driven',
    problem_domain: {
      id: 'Tantangan bottleneck pemrosesan kasir di jam puncak dan potensi race condition saat beberapa modul mengakses pemotongan stok secara serentak.',
      en: 'Peak-hour POS transaction bottlenecks and potential race conditions caused by concurrent stock deduction requests on centralized databases.',
    },
    architectural_solution: {
      id: 'Dekomposisi sistem menjadi modul Producer (kasir/katalog) dan Consumer (persisten gudang) dengan Apache Kafka sebagai distributed log buffer yang resilient.',
      en: 'System decomposition into dedicated Producer (POS/catalog) and Consumer (warehouse persistence) services using Apache Kafka as a resilient distributed log buffer.',
    },
    resilience_and_tradeoffs: {
      id: 'Memilih Eventual Consistency demi menjamin throughput tinggi dan ketersediaan sistem 100% saat lonjakan transaksi kasir ekstrem.',
      en: 'Accepted Eventual Consistency tradeoffs to ensure maximum write throughput and zero downtime during extreme transaction spikes.',
    },
    diagram_url: '/images/architectures/kafka-event-driven.svg',
    technology_ids: ['tech-spring-boot', 'tech-kafka', 'tech-postgresql'],
    project_ids: ['proj-manajemen-stok'],
    is_featured: true,
    order: 1,
  },
  {
    id: 'arch-hybrid-algorithmic-engine',
    title: 'Decoupled Multi-Objective Genetic Algorithm Engine',
    slug: 'hybrid-genetic-algorithm-engine',
    pattern_type: 'hybrid_algorithmic',
    problem_domain: {
      id: 'Pembagian kombinatorial 2.338 mahasiswa ke 190 kelompok KKM dengan 4 kendala kompleks (keseimbangan gender, sebaran jurusan, sebaran tahfidz HTQ, dan batas kapasitas) yang memicu jutaan kemungkinan permutasi.',
      en: 'Combinatorial allocation of 2,338 students across 190 field study groups under 4 strict constraints (gender ratio, department diversity, Quran memorizer distribution, and quota limits).',
    },
    architectural_solution: {
      id: 'Pemisahan arsitektur antara web portal (Laravel MVC) dan dedicated execution engine (Python REST API) yang mengeksekusi seleksi roulette wheel, crossover multi-point, dan adaptive mutation.',
      en: 'Decoupled architecture separating web presentation (Laravel MVC) from a specialized execution engine (Python REST API) performing roulette selection, multi-point crossover, and adaptive mutation.',
    },
    resilience_and_tradeoffs: {
      id: 'Komputasi intensif didelegasikan secara asinkron dengan persistensi checkpoint populasi terbaik untuk mencegah timeout pada server web.',
      en: 'Compute-intensive evolution executed asynchronously with serialization checkpoints for optimal population states to avoid web request timeouts.',
    },
    diagram_url: '/images/architectures/genetic-algorithm-engine.svg',
    technology_ids: ['tech-laravel', 'tech-python', 'tech-mysql'],
    project_ids: ['proj-kkm-algen'],
    is_featured: true,
    order: 2,
  },
  {
    id: 'arch-progressive-billing',
    title: 'Progressive Tier Utility Billing Engine',
    slug: 'progressive-utility-billing-engine',
    pattern_type: 'progressive_billing',
    problem_domain: {
      id: 'Penghitungan tarif pemakaian air desa berbasis blok dinamis, denda keterlambatan bertingkat, dan pembentukan invoice serentak ribuan meteran pelanggan fisik.',
      en: 'Dynamic block-based rural water billing calculations, automated progressive tier rates, and synchronized invoice batch generation across thousands of meters.',
    },
    architectural_solution: {
      id: 'Pipeline komputasi batch otomatis via server scheduler yang mengonversi catatan meteran fisik menjadi invoice terstruktur dengan transaksi database atomik.',
      en: 'Automated batch computation pipeline via server schedulers converting physical meter readings into itemized invoices with atomic database transactions.',
    },
    resilience_and_tradeoffs: {
      id: 'Menerapkan database transaction locking saat proses invoice batch dan verifikasi pembayaran untuk mencegah duplikasi tagihan atau selisih pembukuan kasir.',
      en: 'Enforces database transaction locks during batch invoicing and cashier reconciliations to completely prevent duplicate billing and accounting anomalies.',
    },
    diagram_url: '/images/architectures/progressive-billing.svg',
    technology_ids: ['tech-codeigniter', 'tech-mysql', 'tech-bootstrap'],
    project_ids: ['proj-tagihan-pdam', 'proj-tagihan-wifi'],
    is_featured: true,
    order: 3,
  },
];
