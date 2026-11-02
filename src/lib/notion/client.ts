import notionPkg from '@notionhq/client';

const Client = (notionPkg as any)?.Client || (notionPkg as any)?.default?.Client || notionPkg;

/**
 * Mendapatkan nilai environment variable secara aman baik dari process.env (Node.js runtime)
 * maupun import.meta.env (Astro runtime).
 */
export function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
    return (import.meta as any).env[key];
  }
  return undefined;
}

/**
 * Memeriksa apakah konfigurasi Notion API tersedia di environment aktif.
 */
export function isNotionConfigured(): boolean {
  const apiKey = getEnv('NOTION_API_KEY');
  return Boolean(apiKey && apiKey.trim().length > 0 && !apiKey.startsWith('ntn_xxxx'));
}

let notionInstance: any = null;

/**
 * Singleton factory untuk menginisialisasi Notion Client resmi.
 */
export function getNotionClient(): any | null {
  if (!isNotionConfigured()) {
    return null;
  }

  if (!notionInstance) {
    const auth = getEnv('NOTION_API_KEY');
    notionInstance = new Client({
      auth,
    });
  }

  return notionInstance;
}

/**
 * Mapping ID Database Notion dari environment variables.
 */
export const NOTION_DATABASES = {
  projects: () => getEnv('NOTION_DB_PROJECTS') || '',
  projectLinks: () => getEnv('NOTION_DB_PROJECT_LINKS') || '',
  technologies: () => getEnv('NOTION_DB_TECHNOLOGIES') || '',
  categories: () => getEnv('NOTION_DB_CATEGORIES') || '',
  organizations: () => getEnv('NOTION_DB_ORGANIZATIONS') || '',
  architectureSystems: () => getEnv('NOTION_DB_ARCHITECTURE_SYSTEMS') || '',
  experiences: () => getEnv('NOTION_DB_EXPERIENCES') || '',
  educations: () => getEnv('NOTION_DB_EDUCATIONS') || '',
  certificates: () => getEnv('NOTION_DB_CERTIFICATES') || '',
  pricingServices: () => getEnv('NOTION_DB_PRICING_SERVICES') || '',
  publications: () => getEnv('NOTION_DB_PUBLICATIONS') || '',
};

/**
 * Eksekusi query aman ke endpoint database Notion (/databases/{database_id}/query)
 * menggunakan fetch resmi dengan Notion-Version 2022-06-28 yang stabil untuk data collections.
 */
export async function queryNotionDatabase(
  databaseId: string,
  options?: {
    sorts?: Array<{ property: string; direction: 'ascending' | 'descending' }>;
    filter?: any;
    page_size?: number;
  }
): Promise<any[]> {
  const apiKey = getEnv('NOTION_API_KEY');
  if (!apiKey || !databaseId) {
    return [];
  }

  const cleanId = databaseId.replace(/-/g, '').replace(/^.*\/([a-f0-9]{32}).*$/i, '$1');

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${cleanId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options ?? {}),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.warn(`[NotionClient] HTTP ${response.status} saat query database ${cleanId}:`, errBody);
      return [];
    }

    const data: any = await response.json();
    return data?.results ?? [];
  } catch (err) {
    console.warn(`[NotionClient] Gagal query database ${cleanId}:`, err);
    return [];
  }
}
