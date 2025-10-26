import { CharacterProfileValidator, CharacterProfileData, ValidationResult } from '../../../../src/domain/validators/CharacterProfileValidator';

describe('CharacterProfileValidator', () => {
  describe('Validação de dados válidos (Happy Path)', () => {
    it('deve validar perfil mínimo válido', () => {
      const validData: CharacterProfileData = {
        name: 'Nome',
        playerName: 'Jogador',
      };

      const result: ValidationResult = CharacterProfileValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve aceitar valores zero para campos numéricos opcionais', () => {
      const validData: CharacterProfileData = {
        name: 'Test',
        playerName: 'Player',
        age: 0,
        height: 0,
        weight: 0,
        techLevel: 0,
      };

      const result = CharacterProfileValidator.validate(validData);

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Validação de campos obrigatórios e tipos', () => {
    it('deve falhar quando name está ausente ou vazio', () => {
      const invalid1 = {
        playerName: 'Player',
      } as any;

      const r1 = CharacterProfileValidator.validate(invalid1);
      expect(r1.success).toBe(false);
      expect(r1.errors).toContain('Campo obrigatório ausente: name');

      const invalid2 = {
        name: '',
        playerName: 'Player',
      } as any;

      const r2 = CharacterProfileValidator.validate(invalid2);
      expect(r2.success).toBe(false);
      expect(r2.errors).toContain('Campo obrigatório ausente: name');
    });

    it('deve falhar quando playerName está ausente ou vazio', () => {
      const invalid1 = {
        name: 'Name',
      } as any;

      const r1 = CharacterProfileValidator.validate(invalid1);
      expect(r1.success).toBe(false);
      expect(r1.errors).toContain('Campo obrigatório ausente: playerName');

      const invalid2 = {
        name: 'Name',
        playerName: '',
      } as any;

      const r2 = CharacterProfileValidator.validate(invalid2);
      expect(r2.success).toBe(false);
      expect(r2.errors).toContain('Campo obrigatório ausente: playerName');
    });

    it('deve falhar quando age/height/weight são negativos ou não numéricos', () => {
      const invalid1: CharacterProfileData = {
        name: 'N',
        playerName: 'P',
        age: -1,
      } as any;

      const r1 = CharacterProfileValidator.validate(invalid1);
      expect(r1.success).toBe(false);
      expect(r1.errors).toContain('Campo age deve ser um número não negativo, recebido: -1 com o tipo number');

      const invalid2: any = {
        name: 'N',
        playerName: 'P',
        height: '180',
      };

      const r2 = CharacterProfileValidator.validate(invalid2);
      expect(r2.success).toBe(false);
      expect(r2.errors).toContain('Campo height deve ser um número não negativo, recebido: 180 com o tipo string');
    });

    it('deve falhar quando techLevel não é número ou é negativo', () => {
      const invalid1: any = {
        name: 'N',
        playerName: 'P',
        techLevel: -2,
      };

      const r1 = CharacterProfileValidator.validate(invalid1);
      expect(r1.success).toBe(false);
      expect(r1.errors).toContain('Campo techLevel deve ser um número não negativo, recebido: -2 com o tipo number');

      const invalid2: any = {
        name: 'N',
        playerName: 'P',
        techLevel: '3',
      };

      const r2 = CharacterProfileValidator.validate(invalid2);
      expect(r2.success).toBe(false);
      expect(r2.errors).toContain('Campo techLevel deve ser um número não negativo, recebido: 3 com o tipo string');
    });
  });

  describe('Relatório de múltiplos erros', () => {
    it('deve acumular e retornar todos os erros encontrados', () => {
      const invalid: any = {
        name: '',
        playerName: '',
        age: -5,
        height: -1,
        weight: '80',
        techLevel: 'NaN',
      };

      const result = CharacterProfileValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(5);
      expect(result.errors).toContain('Campo obrigatório ausente: name');
      expect(result.errors).toContain('Campo obrigatório ausente: playerName');
      expect(result.errors).toContain('Campo age deve ser um número não negativo, recebido: -5 com o tipo number');
      expect(result.errors).toContain('Campo height deve ser um número não negativo, recebido: -1 com o tipo number');
      expect(result.errors).toContain('Campo weight deve ser um número não negativo, recebido: 80 com o tipo string');
      expect(result.errors).toContain('Campo techLevel deve ser um número não negativo, recebido: NaN com o tipo string');
    });
  });
});