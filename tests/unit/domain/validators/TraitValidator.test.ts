import {
  TraitValidator,
  TraitData,
  ValidationResult,
} from '../../../../src/domain/validators/TraitValidator';

describe('TraitValidator', () => {
  describe('Validação de dados válidos (Happy Path)', () => {
    it('deve validar trait com todos os campos mínimos válidos', () => {
      const validData: TraitData = {
        id: 'trait-001',
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      const result: ValidationResult = TraitValidator.validate(validData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando descrição e campos opcionais são válidos', () => {
      const validData: TraitData = {
        id: 'trait-002',
        name: 'High Pain Threshold',
        basePoints: 10,
        calc: { points: 10 },
        tags: ['Advantage'],
        description: 'Você sofre apenas 1/3 do choque de ferimentos',
        reference: 'GURPS Core',
        replacements: { '@name': 'High Pain' },
        localNotes: 'Nota local',
        canLevel: true,
        pointsPerLevel: 5,
        levels: 3,
      };

      const result: ValidationResult = TraitValidator.validate(validData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Validação de campos obrigatórios e mensagens', () => {
    it('deve reportar erro quando id ausente', () => {
      const invalid: any = {
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
      };

      const result = TraitValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: id');
    });

    it('deve reportar erro quando name ausente', () => {
      const invalid: any = {
        id: 'trait-001',
        basePoints: 15,
        calc: { points: 15 },
      };

      const result = TraitValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: name');
    });

    it('deve reportar erro quando calc.points ausente ou inválido', () => {
      const invalid1: any = {
        id: 't1',
        name: 'T1',
        basePoints: 5,
      };

      const r1 = TraitValidator.validate(invalid1);
      expect(r1.success).toBe(false);
      expect(r1.errors).toContain(
        'Campo obrigatório ausente ou inválido: calc.points'
      );

      const invalid2: any = {
        id: 't2',
        name: 'T2',
        calc: { points: '15' },
      };

      const r2 = TraitValidator.validate(invalid2);
      expect(r2.success).toBe(false);
      expect(r2.errors).toContain(
        'Campo obrigatório ausente ou inválido: calc.points'
      );
    });
  });

  describe('Validação de tipos de campos (mensagens claras)', () => {
    it('deve falhar quando id não é string', () => {
      const invalid: any = {
        id: 123,
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
      };

      const result = TraitValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo id deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando basePoints não é number', () => {
      const invalid: any = {
        id: 'trait-003',
        name: 'T',
        basePoints: '15',
        calc: { points: 15 },
      };

      const result = TraitValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo basePoints deve ser um número, recebido: string'
      );
    });

    it('deve falhar quando description não é string', () => {
      const invalid: any = {
        id: 'trait-004',
        name: 'T',
        basePoints: 5,
        calc: { points: 5 },
        description: 123,
      };

      const result = TraitValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo description deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando tags não é array ou contém tipos inválidos', () => {
      const invalid1: any = {
        id: 'trait-005',
        name: 'T',
        calc: { points: 1 },
        tags: 'Advantage',
      };

      const r1 = TraitValidator.validate(invalid1);
      expect(r1.success).toBe(false);
      expect(r1.errors).toContain('Campo tags deve ser array se presente');

      const invalid2: any = {
        id: 'trait-006',
        name: 'T',
        calc: { points: 1 },
        tags: ['Advantage', 123],
      };

      const r2 = TraitValidator.validate(invalid2);
      expect(r2.success).toBe(false);
      expect(r2.errors).toContain(
        'Todos os elementos de tags devem ser strings'
      );
    });
  });

  describe('Validação de objetos e múltiplos erros', () => {
    it('deve falhar quando replacements não é um objeto', () => {
      const invalid: any = {
        id: 'trait-007',
        name: 'T',
        calc: { points: 1 },
        replacements: 'not-an-object',
      };

      const result = TraitValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo replacements deve ser um objeto, recebido: string'
      );
    });

    it('deve acumular múltiplos erros e retornar todos', () => {
      const invalid: any = {
        id: 123,
        name: '',
        basePoints: 'x',
        calc: { points: 'y' },
        tags: [true],
        description: 42,
        replacements: null,
        pointsPerLevel: 'p',
      };

      const result = TraitValidator.validate(invalid);
      expect(result.success).toBe(false);
      // Deve conter várias mensagens relevantes
      expect(result.errors.length).toBeGreaterThanOrEqual(6);
      expect(result.errors).toContain(
        'Campo id deve ser uma string, recebido: number'
      );
      expect(result.errors).toContain('Campo obrigatório ausente: name');
      expect(result.errors).toContain(
        'Campo basePoints deve ser um número, recebido: string'
      );
      expect(result.errors).toContain(
        'Campo obrigatório ausente ou inválido: calc.points'
      );
      expect(result.errors).toContain(
        'Todos os elementos de tags devem ser strings'
      );
      expect(result.errors).toContain(
        'Campo description deve ser uma string, recebido: number'
      );
    });
  });
});
