import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const CACHE_DIR = path.resolve(process.cwd(), 'public/cache/images');

/**
 * Memastikan direktori cache aset lokal sudah dibuat.
 */
function ensureCacheDirExists(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Mengunduh gambar Notion dari S3 dan menyimpannya secara permanen di public/cache/images/
 * guna memitigasi limitasi AWS S3 Signed URL yang kedaluwarsa setelah 60 menit.
 *
 * @param remoteUrl URL gambar dari Notion (biasanya signed S3 URL)
 * @param prefix Slug atau pengenal entitas (misal: 'project-store-management')
 * @returns Path publik permanen (misal: '/cache/images/project-store-management-abc1234.webp')
 */
export async function downloadAndCacheNotionImage(
  remoteUrl: string | undefined | null,
  prefix = 'asset'
): Promise<string> {
  if (!remoteUrl || typeof remoteUrl !== 'string' || remoteUrl.trim().length === 0) {
    return '';
  }

  // Jika URL sudah lokal (misal berawal dari /images/ atau /assets/), gunakan apa adanya
  if (remoteUrl.startsWith('/') || !remoteUrl.startsWith('http')) {
    return remoteUrl;
  }

  try {
    ensureCacheDirExists();

    // Buat hash unik berbasis URL tanpa query params sementara (karena AWS signed query berubah tiap request)
    const cleanUrl = remoteUrl.split('?')[0];
    const hash = crypto.createHash('md5').update(cleanUrl).digest('hex').slice(0, 10);

    // Ambil ekstensi asli jika ada, default ke .webp/.png
    let ext = path.extname(cleanUrl);
    if (!ext || ext.length > 5) {
      ext = '.webp';
    }

    const safePrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
    const fileName = `${safePrefix}-${hash}${ext}`;
    const filePath = path.join(CACHE_DIR, fileName);
    const publicUrl = `/cache/images/${fileName}`;

    // Jika file sudah pernah diunduh dan valid (>0 bytes), gunakan file lokal yang ada
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
      return publicUrl;
    }

    // Unduh gambar dari remote URL
    const response = await fetch(remoteUrl);
    if (!response.ok) {
      console.warn(`[NotionImageDownloader] Gagal mengunduh gambar (${response.status}): ${remoteUrl}`);
      return remoteUrl;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(filePath, buffer);
    return publicUrl;
  } catch (error) {
    console.error(`[NotionImageDownloader] Error saat caching gambar:`, error);
    // Graceful fallback ke remoteUrl agar build tidak putus
    return remoteUrl;
  }
}
