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

> Fullstack Developer and Software Engineer specializing in high-throughput distributed systems, event-driven architecture, and algorithmic optimization.

## Professional Overview
- [Official Portfolio](https://adino.my.id): Production web platform and interactive architecture showcase
- [GitHub Profile](https://github.com/novendra27): Open-source engineering repositories, Kafka microservices, and AI optimization systems
- [LinkedIn Profile](https://www.linkedin.com/in/adi-novendra): Verified technical milestones, community leadership, and career journey
- [Direct Email](mailto:adi.novendra.p@gmail.com): Direct communications and software engineering inquiries
- [Direct WhatsApp](https://wa.me/628993580311): Instant project consultation and technical scope discussions

## Core Technical Specialties
${coreTech.map((t) => `- [${t.name}](${t.official_docs_url}): Enterprise core engineering technology`).join('\n')}

## System Architecture Patterns
${architectures.map((a) => `- [${a.title}](https://adino.my.id/#architecture): ${a.problem_domain.en} -> ${a.architectural_solution.en}`).join('\n')}

## Featured Software Projects
${projects
  .map(
    (p) => `- [${p.title}](https://adino.my.id/#projects): ${p.summary_bluf.en} (Technologies: ${p.technologies.map((t) => t.name).join(', ')})`
  )
  .join('\n')}

## Discovery Endpoints
- [Indonesian Specification](https://adino.my.id/llms-id.txt): Indonesian language LLM digest
- [Comprehensive Full Specification](https://adino.my.id/llms-full.txt): Complete resume, projects, and architecture schema
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
