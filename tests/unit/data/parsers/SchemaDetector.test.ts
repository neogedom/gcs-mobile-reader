import { SchemaDetector } from '../../../../src/data/parsers/SchemaDetector';
import { SchemaVersion } from '../../../../src/domain/types/SchemaVersion';

describe('SchemaDetector', () => {
  let detector: SchemaDetector;

  beforeEach(() => {
    detector = new SchemaDetector();
  });

  describe('Casos de teste obrigatórios', () => {
    it('deve detectar V5 quando JSON válido com versão 5', () => {
      const jsonContent = '{"version": 5, "data": "test"}';
      const result = detector.detect(jsonContent);
      expect(result).toBe(SchemaVersion.V5);
    });

    it('deve retornar UNKNOWN para arquivo sem versão', () => {
      const contentWithoutVersion = '{"data": "test", "other": "value"}';
      const result = detector.detect(contentWithoutVersion);
      expect(result).toBe(SchemaVersion.UNKNOWN);
    });

    it('deve retornar UNKNOWN para arquivo malformado', () => {
      const malformedContent = '{"version": "5", "data":}'; // JSON inválido
      const result = detector.detect(malformedContent);
      expect(result).toBe(SchemaVersion.UNKNOWN);
    });
  });

  describe('Casos adicionais para cobertura completa', () => {
    it('deve detectar V2 quando JSON com versão 2', () => {
      const jsonContent = '{"version": 2, "data": "test"}';
      const result = detector.detect(jsonContent);
      expect(result).toBe(SchemaVersion.V2);
    });

    it('deve detectar V3 quando JSON com versão 3', () => {
      const jsonContent = '{"version": 3, "data": "test"}';
      const result = detector.detect(jsonContent);
      expect(result).toBe(SchemaVersion.V3);
    });

    it('deve detectar V4 quando JSON com versão 4', () => {
      const jsonContent = '{"version": 4, "data": "test"}';
      const result = detector.detect(jsonContent);
      expect(result).toBe(SchemaVersion.V4);
    });

    it('deve retornar UNKNOWN para string vazia', () => {
      const result = detector.detect('');
      expect(result).toBe(SchemaVersion.UNKNOWN);
    });

    it('deve retornar UNKNOWN para null/undefined', () => {
      // @ts-expect-error - testando valores inválidos
      const resultNull = detector.detect(null);
      expect(resultNull).toBe(SchemaVersion.UNKNOWN);

      // @ts-expect-error - testando valores inválidos
      const resultUndefined = detector.detect(undefined);
      expect(resultUndefined).toBe(SchemaVersion.UNKNOWN);
    });

    it('deve retornar UNKNOWN para conteúdo que não é JSON', () => {
      const plainText = 'Este é apenas texto plano sem formato específico';
      const result = detector.detect(plainText);
      expect(result).toBe(SchemaVersion.UNKNOWN);
    });

    it('deve retornar UNKNOWN para JSON com versão não reconhecida', () => {
      const jsonContent = '{"schemaversion": "V999", "data": "test"}';
      const result = detector.detect(jsonContent);
      expect(result).toBe(SchemaVersion.UNKNOWN);
    });

    it('deve detectar versão em JSON com espaços e quebras de linha', () => {
      const jsonContent = `{
        "version": 5,
        "data": "test"
      }`;
      const result = detector.detect(jsonContent);
      expect(result).toBe(SchemaVersion.V5);
    });
  });

  describe('Cenários de erro e edge cases', () => {
    it('deve detectar versão mesmo com comentários no JSON', () => {
      const jsonContent = `{
        // Este é um comentário
        "version": 3,
        "data": "test"
      }`;
      const result = detector.detect(jsonContent);
      expect(result).toBe(SchemaVersion.V3);
    });
  });
});
