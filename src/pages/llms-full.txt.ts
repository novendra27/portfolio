import type { APIRoute } from 'astro';
import {
  architectureRepository,
  experienceRepository,
  pricingRepository,
  projectRepository,
  publicationRepository,
  technologyRepository,
} from '@/lib/repositories';

export const GET: APIRoute = async () => {
  const projects = await projectRepository.getAllWithRelations();
  const architectures = await architectureRepository.getAllWithRelations();
  const technologies = await technologyRepository.getAll();
  const experiences = await experienceRepository.getAllWithRelations();
  const pricing = await pricingRepository.getAll();
  const publications = await publicationRepository.getAll();

  const content = `# Adi Novendra Putra (@novendra27) - Full Technical Specification & LLM Digest
Site: https://adino.my.id | Contact: adi.novendra.p@gmail.com

---

## 1. Professional Overview
- Role: Fullstack Developer & Software Engineer
- Education: S1 Informatics Engineering, UIN Malang (2022-2025, Fast-Track 3.5 Years)
- LinkedIn: https://www.linkedin.com/in/adi-novendra
- GitHub: https://github.com/novendra27

---

## 2. Technical Stack Taxonomy
${technologies.map((t) => `- [${t.proficiency.toUpperCase()}] ${t.name} (Docs: ${t.official_docs_url})`).join('\n')}

---

## 3. Architecture Systems
${architectures
  .map(
    (a) => `### ${a.title} [${a.pattern_type}]
- Problem Domain: ${a.problem_domain.en}
- Architectural Solution: ${a.architectural_solution.en}
- Resilience & Tradeoffs: ${a.resilience_and_tradeoffs.en}`
  )
  .join('\n\n')}

---

## 4. Full Project Showcase (9 Projects)
${projects
  .map(
    (p) => `### ${p.title} (${p.slug})
- Confidentiality: ${p.confidentiality}
- Summary BLUF: ${p.summary_bluf.en}
- Key Problem: ${p.problem_statement?.en ?? 'N/A'}
- Solution: ${p.solution_statement?.en ?? 'N/A'}
- Technologies: ${p.technologies.map((t) => t.name).join(', ')}
${p.links.map((l) => `- Link: [${l.title}] ${l.url}`).join('\n')}`
  )
  .join('\n\n')}

---

## 5. Career & Experience
${experiences
  .map(
    (e) => `### ${e.role} @ ${e.organization?.name} (${e.period_start} - ${e.period_end ?? 'Present'})
- Location: ${e.location}
- Type: ${e.type}
${e.highlights.en.map((h) => `- ${h}`).join('\n')}`
  )
  .join('\n\n')}

---

## 6. Engineering Engagement & Pricing Services
${pricing
  .map(
    (s) => `### ${s.tier_name}
- Category: ${s.category}
- Starting Rate: ${s.price_starting}
- Timeline: ${s.estimated_timeline.en}
- Deliverables:
${s.deliverables.en.map((d) => `  - ${d}`).join('\n')}`
  )
  .join('\n\n')}

---

## 7. Publications & Speaking
${publications
  .map(
    (pub) => `### ${pub.title} (${pub.published_date})
- Category: ${pub.category}
- Excerpt: ${pub.excerpt.en}
- External: ${pub.external_url ?? 'Internal'}`
  )
  .join('\n\n')}
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
