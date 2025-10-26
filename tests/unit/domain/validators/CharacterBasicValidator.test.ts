import { CharacterBasicValidator, CharacterBasicData, ValidationResult } from '../../../../src/domain/validators/CharacterBasicValidator';

describe('CharacterBasicValidator', () => {
  describe('Validação de dados válidos (Happy Path)', () => {
    it('deve validar dados mínimos válidos', () => {
      const validData: CharacterBasicData = {
        version: 5,
        id: 'char-123',
        totalPoints: 100,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-02T00:00:00Z',
      };

      const result: ValidationResult = CharacterBasicValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve aceitar totalPoints = 0', () => {
      const validData: CharacterBasicData = {
        version: 1,
        id: 'zero-points',
        totalPoints: 0,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      };

      const result: ValidationResult = CharacterBasicValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Validação de campos obrigatórios e tipos', () => {
    it('deve falhar quando version está ausente', () => {
      const invalidData = {
        id: 'id',
        totalPoints: 10,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      } as any;

      const result = CharacterBasicValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: version');
    });

    it('deve falhar quando version não é número', () => {
      const invalidData = {
        version: '5' as any,
        id: 'id',
        totalPoints: 10,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      } as any;

      const result = CharacterBasicValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo version deve ser um número, recebido: string');
    });

    it('deve falhar quando version é negativo', () => {
      const invalidData: CharacterBasicData = {
        version: -1,
        id: 'id',
        totalPoints: 10,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      };

      const result = CharacterBasicValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo version deve ser um número positivo, recebido: -1');
    });

    it('deve falhar quando version é zero', () => {
      const invalidData: CharacterBasicData = {
        version: 0,
        id: 'id',
        totalPoints: 10,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      };

      const result = CharacterBasicValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo version não deve ser zero, recebido: 0');
    });

    it('deve falhar quando id está ausente ou vazio', () => {
      const invalidData = {
        version: 1,
        totalPoints: 10,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      } as any;

      const result = CharacterBasicValidator.validate(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: id');
    });

    it('deve falhar quando totalPoints é negativo ou não-numérico', () => {
      const invalidData1 = {
        version: 1,
        id: 'id',
        totalPoints: -10,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      } as any;

      const result1 = CharacterBasicValidator.validate(invalidData1);
      expect(result1.success).toBe(false);
      expect(result1.errors).toContain('Campo totalPoints deve ser um número não negativo, recebido: -10');

      const invalidData2 = {
        version: 1,
        id: 'id',
        totalPoints: '100' as any,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      } as any;

      const result2 = CharacterBasicValidator.validate(invalidData2);
      expect(result2.success).toBe(false);
      expect(result2.errors).toContain('Campo totalPoints deve ser um número, recebido: string');
    });

    it('deve falhar quando createdDate ou modifiedDate estão ausentes ou não são string', () => {
      const invalidData1 = {
        version: 1,
        id: 'id',
        totalPoints: 10,
        modifiedDate: '2025-01-01T00:00:00Z',
      } as any;

      const result1 = CharacterBasicValidator.validate(invalidData1);
      expect(result1.success).toBe(false);
      expect(result1.errors).toContain('Campo obrigatório ausente: createdDate');

      const invalidData2 = {
        version: 1,
        id: 'id',
        totalPoints: 10,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: 123 as any,
      } as any;

      const result2 = CharacterBasicValidator.validate(invalidData2);
      expect(result2.success).toBe(false);
      expect(result2.errors).toContain('Campo modifiedDate deve ser uma string, recebido: number');
    });
  });

  describe('Relatório de múltiplos erros', () => {
    it('deve acumular múltiplos erros e retorná-los', () => {
      const invalidData = {
        version: -1,
        id: '',
        totalPoints: -5,
        createdDate: null,
        modifiedDate: undefined,
      } as any;

      const result = CharacterBasicValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(4);
      expect(result.errors).toContain('Campo version deve ser um número positivo, recebido: -1');
      expect(result.errors).toContain('Campo obrigatório ausente: id');
      expect(result.errors).toContain('Campo totalPoints deve ser um número não negativo, recebido: -5');
      expect(result.errors).toContain('Campo obrigatório ausente: createdDate');
    });
  });
});