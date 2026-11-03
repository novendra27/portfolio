/**
 * Utilitas helper ekstraksi properti mentah Notion API ke tipe data JavaScript yang bersih.
 * Mendukung format native Notion (Relation, File, Select) maupun stringified CSV imported values.
 */

export function extractTitle(property: any): string {
  if (!property) return '';
  if (property.type === 'title' && Array.isArray(property.title)) {
    return property.title.map((t: any) => t.plain_text || '').join('').trim();
  }
  if (property.type === 'rich_text') {
    return extractRichText(property);
  }
  return '';
}

export function extractRichText(property: any): string {
  if (!property) return '';
  if (property.type === 'rich_text' && Array.isArray(property.rich_text)) {
    return property.rich_text.map((t: any) => t.plain_text || '').join('').trim();
  }
  if (property.type === 'title') {
    return extractTitle(property);
  }
  return '';
}

export function extractSelect(property: any): string {
  if (!property) return '';
  if (property.type === 'select' && property.select) {
    return property.select.name || '';
  }
  if (property.type === 'rich_text') {
    return extractRichText(property);
  }
  return '';
}

export function extractMultiSelect(property: any): string[] {
  if (!property) return [];
  if (property.type === 'multi_select' && Array.isArray(property.multi_select)) {
    return property.multi_select.map((item: any) => item.name).filter(Boolean);
  }
  if (property.type === 'rich_text') {
    const text = extractRichText(property);
    return text ? text.split(',').map((s) => s.trim()).filter(Boolean) : [];
  }
  return [];
}

export function extractNumber(property: any, defaultValue = 0): number {
  if (!property) return defaultValue;
  if (property.type === 'number' && typeof property.number === 'number') {
    return property.number;
  }
  if (property.type === 'rich_text') {
    const num = Number(extractRichText(property));
    return Number.isNaN(num) ? defaultValue : num;
  }
  return defaultValue;
}

export function extractCheckbox(property: any, defaultValue = false): boolean {
  if (!property) return defaultValue;
  if (property.type === 'checkbox' && typeof property.checkbox === 'boolean') {
    return property.checkbox;
  }
  if (property.type === 'rich_text') {
    const text = extractRichText(property).toLowerCase();
    return text === 'true' || text === '1' || text === 'yes';
  }
  return defaultValue;
}

export function extractUrl(property: any): string {
  if (!property) return '';
  if (property.type === 'url' && typeof property.url === 'string') {
    return property.url.trim();
  }
  if (property.type === 'rich_text') {
    return extractRichText(property);
  }
  return '';
}

export function extractDate(property: any): { start: string; end: string | null } | null {
  if (!property) return null;
  if (property.type === 'date' && property.date) {
    return {
      start: property.date.start || '',
      end: property.date.end || null,
    };
  }
  if (property.type === 'rich_text') {
    const text = extractRichText(property);
    return text ? { start: text, end: null } : null;
  }
  return null;
}

export function extractFileUrl(property: any): string {
  if (!property) return '';
  if (property.type === 'files' && Array.isArray(property.files) && property.files.length > 0) {
    const firstFile = property.files[0];
    if (firstFile.type === 'file' && firstFile.file) {
      return firstFile.file.url || '';
    }
    if (firstFile.type === 'external' && firstFile.external) {
      return firstFile.external.url || '';
    }
  }
  if (property.type === 'rich_text') {
    return extractRichText(property);
  }
  if (property.type === 'url') {
    return extractUrl(property);
  }
  return '';
}

export function extractRelationIds(property: any): string[] {
  if (!property) return [];
  if (property.type === 'relation' && Array.isArray(property.relation)) {
    return property.relation.map((r: any) => r.id).filter(Boolean);
  }
  if (property.type === 'rich_text') {
    const text = extractRichText(property);
    if (!text) return [];
    return text.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
}
