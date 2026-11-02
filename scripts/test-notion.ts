import fs from 'node:fs';
import path from 'node:path';
import notionPkg from '@notionhq/client';

const Client = (notionPkg as any).Client || (notionPkg as any).default?.Client || notionPkg;

// Read .env manually
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...values] = trimmed.split('=');
      const val = values.join('=').trim().replace(/^["']|["']$/g, '');
      process.env[key.trim()] = val;
    }
  }
}

const apiKey = process.env.NOTION_API_KEY;
console.log('--- NOTION DIAGNOSTIC TEST ---');
console.log('API Key configured:', apiKey ? `Yes (starts with: ${apiKey.slice(0, 7)}...)` : 'NO');

if (!apiKey) {
  console.error('❌ NOTION_API_KEY tidak ditemukan di .env');
  process.exit(1);
}

const notion = new Client({ auth: apiKey });

const databases = [
  { name: 'Technologies', id: process.env.NOTION_DB_TECHNOLOGIES },
  { name: 'Categories', id: process.env.NOTION_DB_CATEGORIES },
  { name: 'Organizations', id: process.env.NOTION_DB_ORGANIZATIONS },
  { name: 'Architecture Systems', id: process.env.NOTION_DB_ARCHITECTURE_SYSTEMS },
  { name: 'Projects', id: process.env.NOTION_DB_PROJECTS },
  { name: 'Project Links', id: process.env.NOTION_DB_PROJECT_LINKS },
  { name: 'Experiences', id: process.env.NOTION_DB_EXPERIENCES },
  { name: 'Educations', id: process.env.NOTION_DB_EDUCATIONS },
  { name: 'Certificates', id: process.env.NOTION_DB_CERTIFICATES },
  { name: 'Pricing Services', id: process.env.NOTION_DB_PRICING_SERVICES },
  { name: 'Publications', id: process.env.NOTION_DB_PUBLICATIONS },
];

async function runTest() {
  try {
    // 1. Verify Bot Token Identity
    console.log('\n[1/3] Verifikasi Kredensial Bot...');
    const botUser: any = await notion.users.me({});
    console.log(`✅ Kredensial Valid! Terhubung sebagai Bot: "${botUser.name || 'Notion Bot'}" (ID: ${botUser.id})`);

    // 2. Query each Database using native query endpoint
    console.log('\n[2/3] Pengujian Akses ke 11 Database...');
    const { queryNotionDatabase } = await import('../src/lib/notion/client');

    let successCount = 0;
    for (const db of databases) {
      if (!db.id) {
        console.log(`⚠️  ${db.name.padEnd(22)}: ID KOSONG di .env`);
        continue;
      }

      const results = await queryNotionDatabase(db.id, { page_size: 5 });
      const rowCount = results.length;
      console.log(`✅ ${db.name.padEnd(22)}: Sukses! Ditemukan ${rowCount} data`);
      successCount++;
    }

    console.log(`\nRingkasan: ${successCount} dari ${databases.length} database berhasil diakses.`);

    // 3. Test Repositories with live Notion data
    console.log('\n[3/3] Pengujian Repositori Aplikasi (Zod Domain Mapping)...');
    const { NotionTechnologyRepository, NotionProjectRepository, NotionCategoryRepository } = await import(
      '../src/lib/repositories/notion'
    );

    const catRepo = new NotionCategoryRepository();
    const liveCats = await catRepo.getAll();
    console.log(`✅ NotionCategoryRepository  : Berhasil memuat ${liveCats.length} kategori.`);
    if (liveCats.length > 0) {
      console.log(`   Sample Cat: ${liveCats[0].name} (Slug: ${liveCats[0].slug})`);
    }

    const techRepo = new NotionTechnologyRepository();
    const liveTechs = await techRepo.getAll();
    console.log(`✅ NotionTechnologyRepository: Berhasil memuat ${liveTechs.length} teknologi.`);
    if (liveTechs.length > 0) {
      console.log(`   Sample Tech: ${liveTechs[0].name} (Slug: ${liveTechs[0].slug})`);
    }

    const projectRepo = new NotionProjectRepository();
    const liveProjects = await projectRepo.getAllWithRelations();
    console.log(`✅ NotionProjectRepository  : Berhasil memuat ${liveProjects.length} proyek beserta seluruh relasi.`);
    if (liveProjects.length > 0) {
      console.log(`   Sample Project: "${liveProjects[0].title}"`);
      console.log(`     - Organization: ${liveProjects[0].organization?.name || 'none'}`);
      console.log(`     - Architecture: ${liveProjects[0].architecture_system?.title || 'none'}`);
      console.log(`     - Techs (${liveProjects[0].technologies.length}): ${liveProjects[0].technologies.map(t => t.name).join(', ')}`);
      console.log(`     - Links (${liveProjects[0].links.length}): ${liveProjects[0].links.map(l => l.title).join(' | ')}`);
    }

    console.log('\n🎉 SEMUA PENGUJIAN KONEKSI SELESAI DENGAN SEMPURNA!');
  } catch (err: any) {
    console.error('❌ Terjadi kesalahan:', err);
  }
}

runTest();
