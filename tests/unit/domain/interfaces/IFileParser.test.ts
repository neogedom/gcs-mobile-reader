import { IFileParser } from '../../../../src/domain/interfaces/IFileParser';
import { ParseResult } from '../../../../src/domain/types/ParseResult';
import { SchemaVersion } from '@/domain/types/SchemaVersion';

describe('IFileParser interface (TDD)', () => {
  test('parseFile should return Promise<ParseResult>', async () => {
    // TDD: este teste pode falhar até que os tipos/implementação existam
    const mockParser: IFileParser = {
      parseFile: async (_content: string): Promise<ParseResult> => {
        return { success: true, data: { name: 'Test' }, errors: [] };
      },
      detectSchema: (_content: string): SchemaVersion => SchemaVersion.UNKNOWN,
    };

    expect(typeof mockParser.parseFile).toBe('function');
    const result = await mockParser.parseFile('{}');
    expect(result).toHaveProperty('success');
    expect(typeof result.success).toBe('boolean');
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.errors)).toBe(true);
  });

  test('detectSchema should return a SchemaVersion value', () => {
    const parser: IFileParser = {
      parseFile: async _c => ({
        success: false,
        data: null,
        errors: ['not implemented'],
      }),
      detectSchema: _c => SchemaVersion.V2,
    };

    expect(Object.values(SchemaVersion)).toContain(parser.detectSchema(''));
  });
});
