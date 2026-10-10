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

  const content = `# Adi Novendra Putra (@novendra27)
> Fullstack Developer | Software Engineer | Spesialis Arsitektur Sistem

## Identitas & Profil Profesional
- Nama: Adi Novendra Putra, S.Kom.
- Pendidikan: S1 Teknik Informatika, Universitas Islam Negeri Maulana Malik Ibrahim Malang (Fast-track 3,5 tahun, lulus Des 2025)
- Domisili: Kota Malang, Jawa Timur, Indonesia (WIB / UTC+7)
- Website: https://novendra.dev
- Email: adi.novendra.p@gmail.com
- GitHub: https://github.com/novendra27
- LinkedIn: https://www.linkedin.com/in/adi-novendra

## Keahlian Inti Rekayasa (Core Specialties)
${coreTech.map((t) => `- ${t.name}: ${t.official_docs_url}`).join('\n')}

## Pola Arsitektur Sistem Unggulan
${architectures.map((a) => `- ${a.title}: ${a.problem_domain.id} -> ${a.architectural_solution.id}`).join('\n')}

## Inventaris Kasus Proyek Rekayasa
${projects
  .map(
    (p) => `### ${p.title}
- Identifikasi: ${p.slug}
- Ringkasan Solusi: ${p.summary_bluf.id}
- Kerahasiaan: ${p.confidentiality}
- Teknologi: ${p.technologies.map((t) => t.name).join(', ')}
${p.links.map((l) => `  - ${l.title}: ${l.url}`).join('\n')}`
  )
  .join('\n\n')}

## Tautan LLM Tambahan
- Versi Bahasa Inggris: https://novendra.dev/llms.txt
- Versi Detail Lengkap: https://novendra.dev/llms-full.txt
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
