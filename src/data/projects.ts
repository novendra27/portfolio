import type { Project } from '@/domain/types';

export const projects: Project[] = [
  {
    id: 'proj-kkm-algen',
    title: 'Penentuan Kelompok KKM (Genetic Algorithm Optimization)',
    slug: 'kkm-grouping-genetic-algorithm',
    summary_bluf: {
      id: 'Sistem pengelompokan 2.338 mahasiswa ke 190 kelompok KKM berbasis Algoritma Genetika dengan evaluasi multi-kendala (gender, jurusan, tahfidz HTQ, dan kuota).',
      en: 'AI-driven grouping system allocating 2,338 students across 190 field study groups using Genetic Algorithms evaluating multi-constraint fitness.',
    },
    organization_id: 'org-uin-malang',
    architecture_system_id: 'arch-hybrid-algorithmic-engine',
    category_ids: ['cat-ai-algorithm', 'cat-backend'],
    technology_ids: [
      'tech-laravel',
      'tech-python',
      'tech-mysql',
      'tech-bootstrap',
    ],
    confidentiality: 'public',
    thumbnail: '/images/projects/kkm-grouping-genetic-algorithm.webp',
    media_type: 'image',
    core_code_snippet: `def calculate_fitness(chromosome, students_data):
    # Multi-objective fitness evaluation: Gender balance, Department diversity, HTQ spread
    gender_penalty = evaluate_gender_distribution(chromosome)
    major_penalty = evaluate_major_entropy(chromosome)
    htq_penalty = evaluate_tahfidz_balance(chromosome)
    total_penalty = (w1 * gender_penalty) + (w2 * major_penalty) + (w3 * htq_penalty)
    return 1.0 / (1.0 + total_penalty)`,
    is_featured: true,
    order: 1,
    problem_statement: {
      id: 'Pembagian manual ribuan mahasiswa memicu ketimpangan proporsi gender, penumpukan mahasiswa dari satu fakultas, dan persebaran penghafal Al-Quran yang tidak merata di desa sasaran.',
      en: 'Manual allocation of thousands of students led to severe gender imbalances, departmental clustering, and uneven distribution of specialized Quran memorizers across target villages.',
    },
    solution_statement: {
      id: 'Membangun arsitektur terpisah antara antarmuka web (Laravel) dan mesin kalkulasi evolusi (Python REST API) yang mencapai keberhasilan >90% pemenuhan kendala.',
      en: 'Engineered a decoupled architecture between a Laravel web portal and a specialized Python GA engine, achieving >90% simultaneous constraint compliance.',
    },
    key_metrics: [
      {
        label: { id: 'Total Mahasiswa', en: 'Total Students' },
        value: '2.338',
      },
      {
        label: { id: 'Total Kelompok', en: 'Total Groups' },
        value: '190',
      },
      {
        label: { id: 'Tingkat Kepatuhan Kendala', en: 'Constraint Compliance' },
        value: '>90%',
      },
    ],
  },
  {
    id: 'proj-tagihan-pdam',
    title: 'Tagihan PDAM Pandanrejo (pamdesku.com)',
    slug: 'tagihan-pdam-pandanrejo',
    summary_bluf: {
      id: 'Sistem penagihan utilitas air bersih tingkat desa yang mendigitalkan pencatatan meter fisik, penghitungan tarif progresif berjenjang, dan pencetakan invoice resmi.',
      en: 'Municipal water utility billing platform digitizing physical meter readings, progressive tiered tariffs, and automated PDF invoice generation.',
    },
    organization_id: 'org-uin-malang',
    architecture_system_id: 'arch-progressive-billing',
    category_ids: ['cat-utility-billing', 'cat-backend'],
    technology_ids: ['tech-codeigniter', 'tech-bootstrap', 'tech-mysql'],
    confidentiality: 'public',
    thumbnail: '/images/projects/tagihan-pdam-pandanrejo.webp',
    media_type: 'image',
    core_code_snippet: `public function calculateProgressiveTariff(int $usageCubic): float {
    $tier1 = min($usageCubic, 10) * 1500;
    $tier2 = max(0, min($usageCubic - 10, 10)) * 2200;
    $tier3 = max(0, $usageCubic - 20) * 3500;
    return $tier1 + $tier2 + $tier3 + $this->maintenanceFee;
}`,
    is_featured: true,
    order: 2,
    problem_statement: {
      id: 'Pencatatan meteran fisik manual rentan human error, keterlambatan pelaporan tagihan berjalan, dan kesulitan rekapitulasi tunggakan warga desa.',
      en: 'Manual handwritten meter logs were susceptible to human errors, delayed monthly billing cycles, and cumbersome debt reconciliation for rural operators.',
    },
    solution_statement: {
      id: 'Membangun aplikasi monolitik terstruktur berbasis CodeIgniter 4 dengan modul portal pelanggan pamdesku.com dan cetak struk kasir otomatis.',
      en: 'Built an integrated billing system with a customer lookup portal (pamdesku.com) and automated cashier receipt printing.',
    },
    key_metrics: [
      {
        label: { id: 'Status Produksi', en: 'Production Status' },
        value: 'Live Web',
      },
      {
        label: { id: 'Akurasi Rekapitulasi', en: 'Reconciliation Accuracy' },
        value: '100%',
      },
    ],
  },
  {
    id: 'proj-manajemen-stok',
    title: 'Manajemen Stok Toko (Event-Driven Kafka Microservices)',
    slug: 'store-management-event-driven-kafka',
    summary_bluf: {
      id: 'Sistem backend terdistribusi berbasis Apache Kafka dan Java Spring Boot dengan pemisahan service Producer kasir dan Consumer persisten gudang.',
      en: 'Distributed inventory backend built on Apache Kafka and Java Spring Boot separating POS event publishing from warehouse state consumers.',
    },
    organization_id: 'org-ecentrix',
    architecture_system_id: 'arch-event-driven-kafka',
    category_ids: ['cat-backend'],
    technology_ids: ['tech-spring-boot', 'tech-kafka', 'tech-postgresql'],
    confidentiality: 'public',
    thumbnail: '/images/projects/kkm-grouping-genetic-algorithm.webp',
    media_type: 'image',
    core_code_snippet: `@Service
public class OrderEventProducer {
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public void publishOrderCompleted(OrderEvent event) {
        kafkaTemplate.send("store.order.completed", event.getOrderId(), event)
            .whenComplete((result, ex) -> {
                if (ex == null) log.info("Event published: {}", event.getOrderId());
            });
    }
}`,
    is_featured: true,
    order: 3,
    problem_statement: {
      id: 'Tantangan bottleneck pemrosesan transaksi kasir di jam sibuk ritel dan potensi anomali race condition pada kuantitas stok gudang.',
      en: 'POS checkout bottlenecks during high-volume retail hours and critical race condition risks during concurrent warehouse inventory updates.',
    },
    solution_statement: {
      id: 'Implementasi arsitektur asinkron di mana transaksi kasir diterbitkan sebagai Kafka event dan dikonsumsi oleh service independen dengan verifikasi idempotency.',
      en: 'Implemented an asynchronous architecture where sales trigger Kafka events consumed by independent warehouse services with idempotency checks.',
    },
    key_metrics: [
      {
        label: { id: 'Broker Message', en: 'Message Broker' },
        value: 'Kafka',
      },
      {
        label: { id: 'Framework', en: 'Core Framework' },
        value: 'Spring Boot',
      },
    ],
  },
  {
    id: 'proj-ebook-store',
    title: 'E-Book Store (Digital Commerce & Xendit)',
    slug: 'ebook-store-digital-commerce',
    summary_bluf: {
      id: 'Aplikasi jual-beli buku digital multi-peran (Admin, Seller, Buyer) berbasis Laravel 12 dan React Inertia dengan gerbang pembayaran Xendit dan unduhan aman.',
      en: 'Multi-role digital bookstore platform built on Laravel 12 and React Inertia featuring automated Xendit payment webhooks and protected file downloads.',
    },
    organization_id: 'org-aksara',
    architecture_system_id: null,
    category_ids: ['cat-ecommerce', 'cat-backend', 'cat-frontend'],
    technology_ids: [
      'tech-laravel',
      'tech-react',
      'tech-typescript',
      'tech-tailwind',
      'tech-mysql',
    ],
    confidentiality: 'public',
    thumbnail: '/images/projects/watchtube.webp',
    media_type: 'image',
    core_code_snippet: `public function handleXenditWebhook(Request $request): JsonResponse {
    $callbackToken = $request->header('x-callback-token');
    if ($callbackToken !== config('services.xendit.webhook_token')) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }
    $this->orderService->markAsPaid($request->input('external_id'));
    return response()->json(['status' => 'success']);
}`,
    is_featured: true,
    order: 4,
  },
  {
    id: 'proj-penyewaan-ea',
    title: 'Penyewaan Expert Advisor (DNDFX)',
    slug: 'rental-expert-advisor-dndfx',
    summary_bluf: {
      id: 'Platform SaaS pengelolaan sewa bot trading forex otomatis, alokasi VPS trading 24/7, verifikasi nomor akun investor, dan penanganan tiket keluhan klien.',
      en: 'FinTech SaaS portal managing automated forex trading bot rentals, 24/7 VPS provisioning, investor account validation, and integrated support ticketing.',
    },
    organization_id: 'org-dndfx',
    architecture_system_id: null,
    category_ids: ['cat-saas-tools', 'cat-backend'],
    technology_ids: ['tech-laravel', 'tech-mysql', 'tech-bootstrap'],
    confidentiality: 'confidential_nda',
    thumbnail: '/images/projects/tagihan-pdam-pandanrejo.webp',
    media_type: 'image',
    core_code_snippet: `// Confidential Client Code - Architecture Logic Sanitized
public function provisionVpsInstance(Subscription $sub): string {
    $vps = $this->vpsManager->allocateDedicatedServer($sub->plan_type);
    $this->eaInstaller->deployTradingBot($vps->ip, $sub->ea_license_key);
    return $vps->id;
}`,
    is_featured: false,
    order: 5,
  },
  {
    id: 'proj-tagihan-wifi',
    title: 'Pendataan Tagihan WiFi (HNK-WiFi)',
    slug: 'pendataan-tagihan-wifi',
    summary_bluf: {
      id: 'Sistem administrasi pelanggan ISP dan penagihan internet rumahan multi-area dengan auto-invoicing bulanan berbasis server scheduler untuk PT Java Digital Nusantara.',
      en: 'ISP subscriber management and multi-area billing platform with scheduled recurring monthly auto-invoicing routines.',
    },
    organization_id: 'org-java-digital',
    architecture_system_id: 'arch-progressive-billing',
    category_ids: ['cat-utility-billing', 'cat-backend'],
    technology_ids: ['tech-codeigniter', 'tech-bootstrap', 'tech-mysql'],
    confidentiality: 'confidential_nda',
    thumbnail: '/images/projects/pendataan-tagihan-wifi.webp',
    media_type: 'image',
    core_code_snippet: `// Automated monthly cron invoicing routine
public function runMonthlyBillingGeneration(): void {
    $activeSubscribers = $this->subscriberModel->getActiveAccounts();
    foreach ($activeSubscribers as $sub) {
        $this->invoiceModel->createMonthlyBill($sub->id, $sub->package_price);
    }
}`,
    is_featured: false,
    order: 6,
  },
  {
    id: 'proj-maturity-rating',
    title: 'Maturity Rating Badan Layanan Umum (BLU)',
    slug: 'maturity-rating-blu',
    summary_bluf: {
      id: 'Aplikasi asesmen tingkat kematangan tata kelola dan keuangan perguruan tinggi BLU dengan validasi bukti borang dokumen bertingkat.',
      en: 'Institutional compliance evaluation system assessing governance and financial maturity metrics for Public Service Agency (BLU) universities.',
    },
    organization_id: 'org-uin-malang',
    architecture_system_id: null,
    category_ids: ['cat-saas-tools', 'cat-backend'],
    technology_ids: ['tech-laravel', 'tech-mysql', 'tech-bootstrap'],
    confidentiality: 'confidential_nda',
    thumbnail: '/images/projects/pendataan-tagihan-wifi.webp',
    media_type: 'image',
    core_code_snippet: `// Multi-dimensional scoring formula for university governance
public function computeMaturityScore(array $scores, array $weights): float {
    return array_sum(array_map(fn($s, $w) => $s * $w, $scores, $weights));
}`,
    is_featured: false,
    order: 7,
  },
  {
    id: 'proj-watchtube',
    title: 'WatchTube (Ad-Free Modern Video Streaming)',
    slug: 'watchtube-video-streaming',
    summary_bluf: {
      id: 'Aplikasi klon video streaming modern bernuansa dark mode pekat dengan pencarian feed YouTube terintegrasi RapidAPI.',
      en: 'Ad-free modern YouTube streaming web client featuring dark mode ergonomics and cached RapidAPI video queries.',
    },
    organization_id: 'org-uin-malang',
    architecture_system_id: null,
    category_ids: ['cat-frontend'],
    technology_ids: ['tech-react', 'tech-mui'],
    confidentiality: 'public',
    thumbnail: '/images/projects/watchtube.webp',
    media_type: 'image',
    core_code_snippet: `export const fetchFromRapidAPI = async (url) => {
    const { data } = await axios.get(\`\${BASE_URL}/\${url}\`, {
        headers: { 'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY }
    });
    return data;
};`,
    is_featured: false,
    order: 8,
  },
  {
    id: 'proj-virtualr',
    title: 'VirtualR (Futuristic VR Platform Landing Page)',
    slug: 'virtualr-vr-landing-page',
    summary_bluf: {
      id: 'Landing page modern berestetika dark mode untuk platform Virtual Reality dengan susunan kartu paket langganan dan grid fitur interaktif.',
      en: 'High-performance futuristic landing page for a Virtual Reality platform featuring modular pricing tiers and interactive feature showcases.',
    },
    organization_id: 'org-uin-malang',
    architecture_system_id: null,
    category_ids: ['cat-frontend'],
    technology_ids: ['tech-react', 'tech-tailwind'],
    confidentiality: 'public',
    thumbnail: '/images/projects/virtualr.webp',
    media_type: 'image',
    core_code_snippet: `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {pricingPlans.map((plan, index) => (
    <PricingCard key={index} plan={plan} />
  ))}
</div>`,
    is_featured: false,
    order: 9,
  },
];
