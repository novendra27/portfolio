/**
 * Kamus Terjemahan Antarmuka Statis (Bilingual UI Dictionary)
 * Mendukung Bahasa Indonesia ('id') sebagai default dan English ('en').
 */

export const languages = {
  id: 'Bahasa Indonesia',
  en: 'English',
} as const;

export type SupportedLanguage = keyof typeof languages;

export const defaultLang: SupportedLanguage = 'id';

export const ui = {
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.architecture': 'Arsitektur',
    'nav.projects': 'Proyek',
    'nav.techStack': 'Teknologi',
    'nav.experience': 'Pengalaman',
    'nav.pricing': 'Layanan & Estimasi',
    'nav.publications': 'Publikasi',
    'nav.contact': 'Kontak',

    // Hero Section
    'hero.badge': 'Tersedia untuk Kontrak & Proyek Rekayasa',
    'hero.cta.projects': 'Eksplorasi Proyek',
    'hero.cta.resume': 'Unduh Resume',
    'hero.cta.contact': 'Diskusi Proyek',

    // Section Headers
    'section.architecture.index': '[01 // ARSITEKTUR SISTEM]',
    'section.architecture.title': 'Pola & Desain Arsitektur Rekayasa',
    'section.projects.index': '[02 // SHOWCASE PROYEK]',
    'section.projects.title': 'Studi Kasus Sistem Skala Nyata',
    'section.tech.index': '[03 // TECH STACK]',
    'section.tech.title': 'Taksonomi Penguasaan Teknologi',
    'section.experience.index': '[04 // PERJALANAN KARIER]',
    'section.experience.title': 'Pengalaman Profesional & Pendidikan',
    'section.pricing.index': '[05 // LAYANAN & ESTIMASI]',
    'section.pricing.title': 'Lingkup Pengerjaan & Estimasi Investasi',
    'section.publications.index': '[06 // PUBLIKASI]',
    'section.publications.title': 'Riset, Artikel & Wawasan Teknis',

    // Project Card Tabs & Buttons
    'tab.uiPreview': 'UI Preview',
    'tab.architecture': 'Alur Arsitektur',
    'tab.codeSnippet': 'Cuplikan Kode',
    'project.btn.live': 'Live Demo',
    'project.btn.githubFrontend': 'GitHub: Frontend',
    'project.btn.githubBackend': 'GitHub: Backend',
    'project.btn.githubRepo': 'GitHub Repo',

    // Pricing / Services
    'pricing.duration': 'Estimasi Pengerjaan',
    'pricing.deliverables': 'Lingkup Pengerjaan',
    'pricing.cta': 'Konsultasikan via WhatsApp',

    // Footer
    'footer.role': 'Fullstack Developer & Software Engineer',
    'footer.rights': 'Seluruh hak cipta dilindungi.',
    'footer.llms': 'Format Mesin (AI LLMs)',
    'footer.sitemap': 'Peta Situs',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.architecture': 'Architecture',
    'nav.projects': 'Projects',
    'nav.techStack': 'Tech Stack',
    'nav.experience': 'Experience',
    'nav.pricing': 'Services & Pricing',
    'nav.publications': 'Publications',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.badge': 'Available for Engineering Contracts & Roles',
    'hero.cta.projects': 'Explore Projects',
    'hero.cta.resume': 'Download Resume',
    'hero.cta.contact': 'Discuss Project',

    // Section Headers
    'section.architecture.index': '[01 // SYSTEM ARCHITECTURE]',
    'section.architecture.title': 'Engineering Architecture & Patterns',
    'section.projects.index': '[02 // PROJECT SHOWCASE]',
    'section.projects.title': 'Real-World Production Case Studies',
    'section.tech.index': '[03 // TECH STACK]',
    'section.tech.title': 'Master Technology Taxonomy',
    'section.experience.index': '[04 // CAREER JOURNEY]',
    'section.experience.title': 'Professional Experience & Education',
    'section.pricing.index': '[05 // SERVICES & PRICING]',
    'section.pricing.title': 'Scope of Work & Investment Estimates',
    'section.publications.index': '[06 // PUBLICATIONS]',
    'section.publications.title': 'Research, Articles & Technical Insights',

    // Project Card Tabs & Buttons
    'tab.uiPreview': 'UI Preview',
    'tab.architecture': 'Architecture Flow',
    'tab.codeSnippet': 'Core Snippet',
    'project.btn.live': 'Live Demo',
    'project.btn.githubFrontend': 'GitHub: Frontend',
    'project.btn.githubBackend': 'GitHub: Backend',
    'project.btn.githubRepo': 'GitHub Repo',

    // Pricing / Services
    'pricing.duration': 'Estimated Timeline',
    'pricing.deliverables': 'Deliverables & Scope',
    'pricing.cta': 'Consult via WhatsApp',

    // Footer
    'footer.role': 'Fullstack Developer & Software Engineer',
    'footer.rights': 'All rights reserved.',
    'footer.llms': 'Machine-Readable (AI LLMs)',
    'footer.sitemap': 'Sitemap',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

/**
 * Helper untuk mengambil teks terjemahan berdasarkan bahasa aktif.
 * Jika teks dalam bahasa yang diminta tidak ditemukan, fallback ke defaultLang ('id').
 */
export function useTranslations(lang: SupportedLanguage = defaultLang) {
  return function t(key: UIKey): string {
    return ui[lang]?.[key] ?? ui[defaultLang][key];
  };
}
