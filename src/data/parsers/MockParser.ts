import { IFileParser } from '../../domain/interfaces/IFileParser';
import { ParseResult } from '../../domain/types/ParseResult';
import { SchemaVersion } from '../../domain/types/SchemaVersion';

export class MockParser implements IFileParser {
  async parseFile(content: string): Promise<ParseResult> {
    if (!content) {
      return { success: false, data: null, errors: ['empty content'] };
    }
    try {
      const data = JSON.parse(content);
      return { success: true, data, errors: [] };
    } catch {
      // fallback mock parsing for non-JSON (e.g., XML) — return raw payload
      return { success: true, data: { raw: content }, errors: [] };
    }
  }

  detectSchema(content: string): SchemaVersion {
    if (!content) return SchemaVersion.UNKNOWN;
    const lower = content.toLowerCase();
    if (
      lower.includes('"schemaversion": "1"') ||
      (lower.includes('<gcs') && lower.includes('version="1"')) ||
      lower.includes('version="1"')
    ) {
      return SchemaVersion.V2;
    }
    if (
      lower.includes('"schemaversion": "2"') ||
      (lower.includes('<gcs') && lower.includes('version="2"')) ||
      lower.includes('version="2"')
    ) {
      return SchemaVersion.V2;
    }
    return SchemaVersion.UNKNOWN;
  }
}