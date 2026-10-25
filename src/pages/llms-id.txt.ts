import type { APIRoute } from 'astro';
import {
  architectureRepository,
  projectRepository,
  technologyRepository,
} from '@/lib/repositories';

export const GET: APIRoute = async () => {
  const projects = await projectRepository.getAllWithRelations();
  const architectures = await architectureRepository.getAll();
  const coreTech = await technologyRepository.getCoreProficiencies();

  const content = `# Adi Novendra Putra

> Fullstack Developer dan Software Engineer dengan spesialisasi arsitektur sistem terdistribusi, event-driven streaming, dan optimasi algoritma.

## Profil Profesional
- [Website Portofolio Resmi](https://adino.my.id): Platform web produksi dan showcase sistem arsitektur interaktif
- [Profil GitHub](https://github.com/novendra27): Repositori kode sumber terbuka, microservices Kafka, dan sistem optimasi AI
- [Profil LinkedIn](https://www.linkedin.com/in/adi-novendra): Rekam jejak profesional, aktivitas komunitas GDGoC, dan artikel teknologi
- [Email Langsung](mailto:adi.novendra.p@gmail.com): Komunikasi resmi dan pertanyaan rekayasa perangkat lunak
- [WhatsApp Langsung](https://wa.me/628993580311): Konsultasi proyek kilat dan diskusi ruang lingkup teknis

## Keahlian Inti Rekayasa
${coreTech.map((t) => `- [${t.name}](${t.official_docs_url}): Teknologi rekayasa inti enterprise`).join('\n')}

## Pola Arsitektur Sistem Unggulan
${architectures.map((a) => `- [${a.title}](https://adino.my.id/#architecture): ${a.problem_domain.id} -> ${a.architectural_solution.id}`).join('\n')}

## Kasus Proyek Rekayasa Unggulan
${projects
  .map(
    (p) => `- [${p.title}](https://adino.my.id/#projects): ${p.summary_bluf.id} (Teknologi: ${p.technologies.map((t) => t.name).join(', ')})`
  )
  .join('\n')}

## Titik Temu LLM Tambahan
- [Versi Bahasa Inggris](https://adino.my.id/llms.txt): Spesifikasi bahasa Inggris
- [Versi Spesifikasi Lengkap](https://adino.my.id/llms-full.txt): Resume lengkap, studi kasus proyek, dan skema arsitektur
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
