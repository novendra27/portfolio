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
> Fullstack Developer | Software Engineer | System Architecture Specialist

## Identity & Professional Profile
- Name: Adi Novendra Putra, B.Comp. (Sarjana Komputer)
- Education: S1 Informatics Engineering, UIN Maulana Malik Ibrahim Malang (Fast-track 3.5 years, Dec 2025)
- Location: Malang, East Java, Indonesia (UTC+7)
- Website: https://novendra.dev
- Email: adi.novendra.p@gmail.com
- GitHub: https://github.com/novendra27
- LinkedIn: https://www.linkedin.com/in/adi-novendra

## Core Technical Specialties
${coreTech.map((t) => `- ${t.name}: ${t.official_docs_url}`).join('\n')}

## System Architecture Patterns
${architectures.map((a) => `- ${a.title}: ${a.problem_domain.en} -> ${a.architectural_solution.en}`).join('\n')}

## Featured Software Projects
${projects
  .map(
    (p) => `### ${p.title}
- Slug: ${p.slug}
- Problem & Solution: ${p.summary_bluf.en}
- Confidentiality: ${p.confidentiality}
- Technologies: ${p.technologies.map((t) => t.name).join(', ')}
${p.links.map((l) => `  - ${l.title}: ${l.url}`).join('\n')}`
  )
  .join('\n\n')}

## LLM Discovery Endpoints
- Indonesian Version: https://novendra.dev/llms-id.txt
- Comprehensive Details: https://novendra.dev/llms-full.txt
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
