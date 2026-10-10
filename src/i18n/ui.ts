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
    'nav.pricing': 'Layanan & Harga',
    'nav.publications': 'Publikasi',
    'nav.contact': 'Kontak',

    // Hero Section
    'hero.badge': 'Terbuka untuk Kontrak & Proyek Sistem',
    'hero.cta.projects': 'Lihat Portofolio',
    'hero.cta.resume': 'Unduh Resume',
    'hero.cta.contact': 'Konsultasi Proyek',

    // Section Headers
    'section.architecture.index': '[01 // ARSITEKTUR SISTEM]',
    'section.architecture.title': 'Desain & Arsitektur Sistem',
    'section.projects.index': '[02 // SHOWCASE PROYEK]',
    'section.projects.title': 'Proyek & Portofolio Sistem',
    'section.tech.index': '[03 // TECH STACK]',
    'section.tech.title': 'Taksonomi Penguasaan Teknologi',
    'section.experience.index': '[04 // PERJALANAN KARIER]',
    'section.experience.title': 'Pengalaman Profesional & Pendidikan',
    'section.pricing.index': '[05 // LAYANAN & ESTIMASI]',
    'section.pricing.title': 'Layanan & Harga',
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
    'pricing.cta': 'Konsultasikan Kebutuhan Anda',

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
    'hero.badge': 'Open for Contracts & Systems Projects',
    'hero.cta.projects': 'View Portfolio',
    'hero.cta.resume': 'Download Resume',
    'hero.cta.contact': 'Project Consultation',

    // Section Headers
    'section.architecture.index': '[01 // SYSTEM ARCHITECTURE]',
    'section.architecture.title': 'System Architecture & Design',
    'section.projects.index': '[02 // PROJECT SHOWCASE]',
    'section.projects.title': 'Projects & Systems Portfolio',
    'section.tech.index': '[03 // TECH STACK]',
    'section.tech.title': 'Master Technology Taxonomy',
    'section.experience.index': '[04 // CAREER JOURNEY]',
    'section.experience.title': 'Professional Experience & Education',
    'section.pricing.index': '[05 // SERVICES & PRICING]',
    'section.pricing.title': 'Services & Pricing',
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
    'pricing.cta': 'Consult Your Requirements',

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
