import type { ArchitectureSystem } from '@/domain/types';

export const architectureSystems: ArchitectureSystem[] = [
  {
    id: 'arch-event-driven-kafka',
    title: 'Event-Driven High-Throughput Inventory Streaming',
    slug: 'event-driven-kafka-streaming',
    pattern_type: 'event_driven',
    problem_domain: {
      id: 'Tingginya lonjakan transaksi kasir (POS) di jam puncak memicu bottleneck pada basis data terpusat dan berisiko menyebabkan race condition saat pemotongan stok terjadi secara bersamaan.',
      en: 'High transaction surges during peak POS hours cause bottlenecks on centralized databases and risk race conditions during concurrent stock deductions.',
    },
    architectural_solution: {
      id: 'Merancang ulang arsitektur monolitik menjadi modul terpisah (Producer kasir & Consumer gudang) dengan mengimplementasikan Apache Kafka sebagai distributed log buffer berbasis event-driven.',
      en: 'Redesigning monolithic architecture into decoupled modules (POS Producer & warehouse Consumer) by implementing Apache Kafka as an event-driven distributed log buffer.',
    },
    resilience_and_tradeoffs: {
      id: 'Mengadopsi pola Eventual Consistency untuk menoleransi lonjakan beban ekstrem, berhasil menghilangkan hambatan pemrosesan, serta menjamin ketersediaan sistem tetap 100% tanpa downtime.',
      en: 'Adopting Eventual Consistency to absorb extreme load spikes, effectively eliminating processing bottlenecks, and guaranteeing 100% system availability without downtime.',
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
      id: 'Alokasi manual 2.338 mahasiswa ke 190 kelompok KKM memicu jutaan permutasi kombinatorial yang rumit akibat 4 kendala ketat (keseimbangan gender, sebaran jurusan, sebaran penghafal Al-Qur\'an, dan batas kuota).',
      en: 'Manual allocation of 2,338 students across 190 field study groups triggers millions of complex combinatorial permutations across 4 strict constraints (gender balance, department diversity, Quran memorizer distribution, and quota caps).',
    },
    architectural_solution: {
      id: 'Memisahkan arsitektur antarmuka (Laravel) dari mesin komputasi evolusi (Python REST API) untuk mengeksekusi seleksi roulette wheel, crossover multi-point, dan mutasi adaptif secara mandiri.',
      en: 'Decoupling frontend presentation (Laravel) from the evolutionary computing engine (Python REST API) to autonomously execute roulette wheel selection, multi-point crossover, and adaptive mutation.',
    },
    resilience_and_tradeoffs: {
      id: 'Berhasil mendelegasikan proses evolusi berat secara asinkron dengan fitur penyimpan checkpoint populasi, mencegah risiko HTTP timeout serta mencapai tingkat pemenuhan kendala >90%.',
      en: 'Successfully offloaded heavy evolutionary computing asynchronously with population checkpointing, preventing HTTP timeouts and achieving >90% constraint compliance.',
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
      id: 'Kompleksitas penghitungan tarif air progresif berjenjang, denda keterlambatan bertingkat, dan pembuatan ribuan tagihan serentak yang rentan terhadap selisih pembukuan serta human error.',
      en: 'Complexities in tiered progressive water tariff calculations, multi-level late penalties, and simultaneous generation of thousands of invoices vulnerable to accounting anomalies and human errors.',
    },
    architectural_solution: {
      id: 'Membangun pipeline komputasi batch berbasis server scheduler (cron job) yang mengonversi angka meteran fisik menjadi invoice terstruktur menggunakan transaksi database atomik.',
      en: 'Built a batch computing pipeline based on server schedulers (cron jobs) converting physical meter readings into itemized invoices with atomic database transactions.',
    },
    resilience_and_tradeoffs: {
      id: 'Penerapan penguncian transaksi (pessimistic/optimistic locking) berhasil menjamin transparansi akuntansi, mengeliminasi duplikasi tagihan, dan mengotomasi siklus penagihan bulanan secara akurat.',
      en: 'Enforcing transaction locks (pessimistic/optimistic) successfully ensured accounting transparency, eliminated duplicate billing, and accurately automated monthly invoicing cycles.',
    },
    diagram_url: '/images/architectures/progressive-billing.svg',
    technology_ids: ['tech-codeigniter', 'tech-mysql', 'tech-bootstrap'],
    project_ids: ['proj-tagihan-pdam', 'proj-tagihan-wifi'],
    is_featured: true,
    order: 3,
  },
];
