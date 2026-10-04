/**
 * Kontrak Tipe Dasar & Multi-Bahasa Dinamis (Bilingual Foundation)
 * Digunakan secara konsisten di seluruh entitas domain portofolio.
 */

export type Locale = 'id' | 'en';

export interface LocalizedString {
  id: string;
  en: string;
}

export interface LocalizedList {
  id: string[];
  en: string[];
}
