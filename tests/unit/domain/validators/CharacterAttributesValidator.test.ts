import { CharacterAttributesValidator, CharacterAttributesData, ValidationResult } from '../../../../src/domain/validators/CharacterAttributesValidator';

describe('CharacterAttributesValidator', () => {
  describe('Validação de dados válidos (Happy Path)', () => {
    it('deve validar atributos básicos válidos', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar atributos completos com todos os campos opcionais válidos', () => {
      const completeValidData: CharacterAttributesData = {
        st: 15,
        dx: 16,
        iq: 17,
        ht: 18,
        will: 19,
        per: 20,
        basicSpeed: 8.5,
        basicMove: 8,
        hitPoints: 18,
        fatiguePoints: 18,
        magicPoints: 25,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(completeValidData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar atributos com valores mínimos válidos', () => {
      const minimalValidData: CharacterAttributesData = {
        st: 1,
        dx: 1,
        iq: 1,
        ht: 1,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(minimalValidData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Validação de atributos obrigatórios', () => {
    it('deve falhar quando ST está ausente', () => {
      const invalidData = {
        dx: 13,
        iq: 14,
        ht: 11,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: st');
    });

    it('deve falhar quando DX está ausente', () => {
      const invalidData = {
        st: 12,
        iq: 14,
        ht: 11,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: dx');
    });

    it('deve falhar quando IQ está ausente', () => {
      const invalidData = {
        st: 12,
        dx: 13,
        ht: 11,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: iq');
    });

    it('deve falhar quando HT está ausente', () => {
      const invalidData = {
        st: 12,
        dx: 13,
        iq: 14,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: ht');
    });

    it('deve falhar quando ST é null', () => {
      const invalidData = {
        st: null,
        dx: 13,
        iq: 14,
        ht: 11,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: st');
    });

    it('deve falhar quando ST não é um número', () => {
      const invalidData = {
        st: '12' as any,
        dx: 13,
        iq: 14,
        ht: 11,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo st deve ser um número válido, recebido no tipo: string');
    });

    it('deve falhar quando ST é 0', () => {
      const invalidData: CharacterAttributesData = {
        st: 0,
        dx: 13,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo st deve ser maior que 0, recebido: 0');
    });

    it('deve falhar quando ST é negativo', () => {
      const invalidData: CharacterAttributesData = {
        st: -5,
        dx: 13,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo st deve ser maior que 0, recebido: -5');
    });

    it('deve falhar quando DX é 0', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 0,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo dx deve ser maior que 0, recebido: 0');
    });

    it('deve falhar quando IQ é negativo', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: -3,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo iq deve ser maior que 0, recebido: -3');
    });

    it('deve falhar quando HT é 0.5 (não inteiro)', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 0.5,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo ht deve ser maior que 0, recebido: 0.5');
    });
  });

  describe('Validação de atributos secundários (opcionais)', () => {
    it('deve validar quando WILL e PER não são fornecidos', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando WILL é fornecido e válido', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        will: 15,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve falhar quando WILL é fornecido mas não é número', () => {
      const invalidData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        will: '15' as any,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo will deve ser um número maior que 0, recebido: 15 com o tipo string');
    });

    it('deve falhar quando WILL é 0', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        will: 0,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo will deve ser um número maior que 0, recebido: 0');
    });

    it('deve falhar quando WILL é negativo', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        will: -2,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo will deve ser um número maior que 0, recebido: -2');
    });

    it('deve falhar quando PER é fornecido mas não é número', () => {
      const invalidData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        per: true as any,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo per deve ser um número maior que 0, recebido: true com o tipo boolean');
    });

    it('deve falhar quando PER é 0', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        per: 0,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo per deve ser um número maior que 0, recebido: 0');
    });
  });

  describe('Validação de atributos derivados', () => {
    it('deve validar quando basicSpeed não é fornecido', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando basicSpeed é positivo', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        basicSpeed: 7.5,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve falhar quando basicSpeed é 0', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        basicSpeed: 0,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo basicSpeed deve ser um número positivo, recebido: 0');
    });

    it('deve falhar quando basicSpeed é negativo', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        basicSpeed: -2.5,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo basicSpeed deve ser um número positivo, recebido: -2.5');
    });

    it('deve falhar quando basicSpeed não é número', () => {
      const invalidData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        basicSpeed: '7.5' as any,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo basicSpeed deve ser um número positivo, recebido: 7.5');
    });

    it('deve validar quando basicMove é 0 (valor mínimo válido)', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        basicMove: 0,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando basicMove é positivo', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        basicMove: 6,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve falhar quando basicMove é negativo', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        basicMove: -3,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo basicMove deve ser um número não negativo, recebido: -3');
    });

    it('deve falhar quando basicMove não é número', () => {
      const invalidData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        basicMove: '6' as any,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo basicMove deve ser um número não negativo, recebido: 6');
    });

    it('deve validar quando hitPoints não é fornecido', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando hitPoints é positivo', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        hitPoints: 15,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando hitPoints é 0', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        hitPoints: 0,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando hitPoints é negativo', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        hitPoints: -5,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve falhar quando hitPoints não é número', () => {
      const invalidData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        hitPoints: '15' as any,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo hitPoints deve ser um número, recebido: 15');
    });

    it('deve validar quando fatiguePoints não é fornecido', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando fatiguePoints é positivo', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        fatiguePoints: 16,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve falhar quando fatiguePoints é 0', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        fatiguePoints: 0,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo fatiguePoints deve ser um número maior que 0, recebido: 0');
    });

    it('deve falhar quando fatiguePoints é negativo', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        fatiguePoints: -8,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo fatiguePoints deve ser um número maior que 0, recebido: -8');
    });

    it('deve falhar quando fatiguePoints não é número', () => {
      const invalidData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        fatiguePoints: '16',
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo fatiguePoints deve ser um número maior que 0, recebido: 16');
    });

    it('deve validar quando magicPoints não é fornecido', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando magicPoints é 0 (valor mínimo válido)', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        magicPoints: 0,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar quando magicPoints é positivo', () => {
      const validData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        magicPoints: 20,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve falhar quando magicPoints é negativo', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        magicPoints: -10,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo magicPoints deve ser um número não negativo, recebido: -10');
    });

    it('deve falhar quando magicPoints não é número', () => {
      const invalidData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        magicPoints: '20' as any,
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo magicPoints deve ser um número não negativo, recebido: 20');
    });
  });

  describe('Validação com múltiplos erros', () => {
    it('deve reportar todos os erros quando múltiplos campos são inválidos', () => {
      const invalidData = {
        st: 0,        // erro: <= 0
        dx: '13' as any,     // erro: não é número
        iq: -5,       // erro: < 0
        ht: 11,
        will: -2,     // erro: < 0
        per: 0,       // erro: <= 0
        basicSpeed: -1, // erro: < 0
        basicMove: -5,  // erro: < 0
        hitPoints: 0, 
        fatiguePoints: '15' as any, // erro: não é número
        magicPoints: -3,     // erro: < 0
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors.length).toBeCloseTo(9) // Múltiplos erros

      expect(result.errors).toContain('Campo st deve ser maior que 0, recebido: 0');
      expect(result.errors).toContain('Campo dx deve ser um número válido, recebido: 13');
      expect(result.errors).toContain('Campo iq deve ser maior que 0, recebido: -5');
      expect(result.errors).toContain('Campo will deve ser um número maior que 0, recebido: -2');
      expect(result.errors).toContain('Campo per deve ser um número maior que 0, recebido: 0');
      expect(result.errors).toContain('Campo basicSpeed deve ser um número positivo, recebido: -1');
      expect(result.errors).toContain('Campo basicMove deve ser um número não negativo, recebido: -5');
      expect(result.errors).toContain('Campo fatiguePoints deve ser um número maior que 0, recebido: 15');
      expect(result.errors).toContain('Campo magicPoints deve ser um número não negativo, recebido: -3');
    });

    it('deve reportar erro de campo obrigatório ausente junto com outros erros', () => {
      const invalidData = {
        st: 12,
        // dx ausente - erro obrigatório
        iq: -5,       // erro: < 0
        ht: 11,
        basicSpeed: 0, // erro: <= 0
      } as any;

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: dx');
      expect(result.errors).toContain('Campo iq deve ser maior que 0, recebido: -5');
      expect(result.errors).toContain('Campo basicSpeed deve ser um número positivo, recebido: 0');
    });
  });

  describe('Edge cases e validações especiais', () => {
    it('deve validar com valores extremos válidos', () => {
      const extremeValidData: CharacterAttributesData = {
        st: 100,
        dx: 50,
        iq: 30,
        ht: 25,
        will: 40,
        per: 35,
        basicSpeed: 15.5,
        basicMove: 15,
        hitPoints: 25,
        fatiguePoints: 25,
        magicPoints: 100,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(extremeValidData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve falhar com NaN em atributos obrigatórios', () => {
      const invalidData: CharacterAttributesData = {
        st: NaN,
        dx: 13,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo st deve ser um número válido, recebido: NaN');
    });

    it('deve falhar com Infinity em atributos obrigatórios', () => {
      const invalidData: CharacterAttributesData = {
        st: 12,
        dx: Infinity,
        iq: 14,
        ht: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo dx deve ser um número válido, recebido: Infinity');
    });

    it('deve validar com valores decimais válidos para atributos derivados', () => {
      const decimalValidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        basicSpeed: 6.25,
        basicMove: 6.0,
        hitPoints: 12,
        fatiguePoints: 11,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(decimalValidData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar que atributos básicos devem ser números inteiros', () => {
      const integerValidData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        will: 15,
        per: 16,
        basicSpeed: 6.25, // pode ser decimal
        basicMove: 6,
        hitPoints: 12,
        fatiguePoints: 11,
        magicPoints: 20,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(integerValidData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve falhar com valores inválidos para atributos que precisam ser > 0', () => {
      const invalidDecimalData: CharacterAttributesData = {
        st: 12,
        dx: 13,
        iq: 14,
        ht: 11,
        will: 0.5,    // erro: < 1
        per: 1.0,     // válido
        basicSpeed: -0.1, // erro: <= 0
        basicMove: 0,    // válido (pode ser 0)
        hitPoints: -5,   // erro: inválido para hitPoints (mas agora aceito)
        fatiguePoints: 1.0, // válido
        magicPoints: 0,      // válido (pode ser 0)
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidDecimalData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo will deve ser um número maior que 0, recebido: 0.5');
      expect(result.errors).toContain('Campo basicSpeed deve ser um número positivo, recebido: -0.1');
      expect(result.errors).not.toContain('Campo per deve ser um número maior que 0, recebido: 1');
      expect(result.errors).not.toContain('Campo basicMove deve ser um número não negativo, recebido: 0');
      expect(result.errors).not.toContain('Campo magicPoints deve ser um número não negativo, recebido: 0');
    });
  });

  describe('Casos de uso realistas do GURPS', () => {
    it('deve validar personagem humano típico', () => {
      const typicalHuman: CharacterAttributesData = {
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
        will: 10,
        per: 10,
        basicSpeed: 5.0,
        basicMove: 5,
        hitPoints: 10,
        fatiguePoints: 10,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(typicalHuman);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar personagem com atributos elevados', () => {
      const highAttributes: CharacterAttributesData = {
        st: 18,
        dx: 16,
        iq: 16,
        ht: 15,
        will: 18,
        per: 16,
        basicSpeed: 7.75,
        basicMove: 7,
        hitPoints: 18,
        fatiguePoints: 15,
        magicPoints: 32,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(highAttributes);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar personagem com atributos mínimos', () => {
      const minimalAttributes: CharacterAttributesData = {
        st: 1,
        dx: 1,
        iq: 1,
        ht: 1,
        will: 1,
        per: 1,
        basicSpeed: 0.5,
        basicMove: 0,
        hitPoints: 1,
        fatiguePoints: 1,
        magicPoints: 0,
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(minimalAttributes);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve falhar com personagem com atributos inválidos para GURPS', () => {
      const invalidGurpsCharacter: CharacterAttributesData = {
        st: 0,    // erro: atributos básicos não podem ser 0
        dx: 10,
        iq: 10,
        ht: 10,
        will: 0,  // erro: will não pode ser 0
        per: 10,
        basicSpeed: 0, // erro: basicSpeed deve ser > 0
        basicMove: 5,
        hitPoints: -10, // erro: hitPoints inválido (NaN)
        fatiguePoints: 10,
        magicPoints: -5, // erro: magicPoints não pode ser negativo
      };

      const result: ValidationResult = CharacterAttributesValidator.validate(invalidGurpsCharacter);

      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(4);
      expect(result.errors).toContain('Campo st deve ser maior que 0, recebido: 0');
      expect(result.errors).toContain('Campo will deve ser um número maior que 0, recebido: 0');
      expect(result.errors).toContain('Campo basicSpeed deve ser um número positivo, recebido: 0');
      expect(result.errors).toContain('Campo magicPoints deve ser um número não negativo, recebido: -5');
    });
  });
});