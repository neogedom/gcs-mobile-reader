import {
  SkillValidator,
  SkillData,
  ValidationResult,
} from '../../../../src/domain/validators/SkillValidator';

describe('SkillValidator', () => {
  describe('Validação de dados válidos (Happy Path)', () => {
    it('deve validar skill com todos os campos mínimos válidos', () => {
      const validData: SkillData = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: { level: 16 },
      };

      const result: ValidationResult = SkillValidator.validate(validData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar skill com campos opcionais válidos', () => {
      const validData: SkillData = {
        id: 'skill-002',
        name: 'Piloting',
        level: 12,
        difficulty: 'dx/a',
        specialization: 'Helicopter',
        reference: 'B214',
        tags: ['Vehicle'],
        defaults: [
          {
            type: 'iq',
            modifier: -6,
          },
        ],
        techLevel: '3',
        points: 1,
        calc: { level: 12, rsl: 'DX-1' },
        defaultedFrom: {
          type: 'iq',
          modifier: -6,
          level: 6,
          adjustedLevel: 6,
          points: -6,
        },
      };

      const result: ValidationResult = SkillValidator.validate(validData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Validação de campos obrigatórios e mensagens', () => {
    it('deve reportar erro quando id ausente', () => {
      const invalid: any = {
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: id');
    });

    it('deve reportar erro quando name ausente', () => {
      const invalid: any = {
        id: 'skill-001',
        level: 16,
        difficulty: 'dx/a',
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: name');
    });

    it('deve reportar erro quando level ausente', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        difficulty: 'dx/a',
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: level');
    });

    it('deve reportar erro quando difficulty ausente', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: difficulty');
    });

    it('deve reportar erro quando calc ausente', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: calc');
    });

    it('deve reportar erro quando calc.level ausente', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: {},
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: calc.level');
    });
  });

  describe('Validação de tipos de campos (mensagens claras)', () => {
    it('deve falhar quando id não é string', () => {
      const invalid: any = {
        id: 123,
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: { level: 16 },
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo id deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando name não é string', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 123,
        level: 16,
        difficulty: 'dx/a',
        calc: { level: 16 },
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo name deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando level não é number', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: '16',
        difficulty: 'dx/a',
        calc: { level: 16 },
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo level deve ser um número, recebido: string'
      );
    });

    it('deve falhar quando difficulty não é string', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 123,
        calc: { level: 16 },
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo difficulty deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando specialization não é string', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: { level: 16 },
        specialization: 123,
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo specialization deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando reference não é string', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: { level: 16 },
        reference: 123,
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo reference deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando tags não é array', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: { level: 16 },
        tags: 'Vehicle',
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo tags deve ser array se presente');
    });

    it('deve falhar quando tags contém elementos não-string', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: { level: 16 },
        tags: ['Vehicle', 123],
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Todos os elementos de tags devem ser strings'
      );
    });

    it('deve falhar quando techLevel não é string', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: { level: 16 },
        techLevel: 3,
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo techLevel deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando points não é number', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: { level: 16 },
        points: '12',
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo points deve ser um número, recebido: string'
      );
    });

    it('deve falhar quando calc não é objeto', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: 'invalid',
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo calc deve ser um objeto, recebido: string'
      );
    });

    it('deve falhar quando calc.level não é number', () => {
      const invalid: any = {
        id: 'skill-001',
        name: 'Driving',
        level: 16,
        difficulty: 'dx/a',
        calc: { level: '16' },
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo calc.level deve ser um número, recebido: string'
      );
    });
  });

  describe('Validação de objetos e múltiplos erros', () => {
    it('deve acumular múltiplos erros e retornar todos', () => {
      const invalid: any = {
        id: 123,
        name: '',
        level: '16',
        difficulty: 123,
        specialization: 456,
        reference: true,
        tags: [123],
        techLevel: 3,
        points: '12',
        calc: 'invalid',
      };

      const result = SkillValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(10);
      expect(result.errors).toContain(
        'Campo id deve ser uma string, recebido: number'
      );
      expect(result.errors).toContain('Campo obrigatório ausente: name');
      expect(result.errors).toContain(
        'Campo level deve ser um número, recebido: string'
      );
      expect(result.errors).toContain(
        'Campo difficulty deve ser uma string, recebido: number'
      );
      expect(result.errors).toContain(
        'Campo specialization deve ser uma string, recebido: number'
      );
      expect(result.errors).toContain(
        'Campo reference deve ser uma string, recebido: boolean'
      );
      expect(result.errors).toContain(
        'Todos os elementos de tags devem ser strings'
      );
      expect(result.errors).toContain(
        'Campo techLevel deve ser uma string, recebido: number'
      );
      expect(result.errors).toContain(
        'Campo points deve ser um número, recebido: string'
      );
      expect(result.errors).toContain(
        'Campo calc deve ser um objeto, recebido: string'
      );
    });
  });

  describe('Validação de valores específicos do GURPS', () => {
    it('deve validar dificuldades comuns do GURPS', () => {
      const validDifficulties = [
        'dx/a',
        'dx/e',
        'dx/h',
        'iq/a',
        'iq/e',
        'iq/h',
        'ht/a',
        'ht/e',
        'ht/h',
        'per/a',
        'per/e',
        'per/h',
      ];

      validDifficulties.forEach(difficulty => {
        const validData: SkillData = {
          id: 'skill-test',
          name: 'Test Skill',
          level: 10,
          difficulty,
          calc: { level: 10 },
        };

        const result = SkillValidator.validate(validData);
        expect(result.success).toBe(true);
      });
    });

    it('deve aceitar level negativo (para skills defaulted)', () => {
      const validData: SkillData = {
        id: 'skill-001',
        name: 'Driving',
        level: -5,
        difficulty: 'dx/a',
        calc: { level: -5 },
      };

      const result = SkillValidator.validate(validData);
      expect(result.success).toBe(true);
    });

    it('deve aceitar points negativo (para skills defaulted)', () => {
      const validData: SkillData = {
        id: 'skill-001',
        name: 'Driving',
        level: 8,
        difficulty: 'dx/a',
        calc: { level: 8 },
        points: -9,
      };

      const result = SkillValidator.validate(validData);
      expect(result.success).toBe(true);
    });
  });
});
