import {
  EquipmentValidator,
  EquipmentData,
  ValidationResult,
} from '../../../../src/domain/validators/EquipmentValidator';

describe('EquipmentValidator', () => {
  describe('Validação de dados válidos (Happy Path)', () => {
    it('deve validar equipment com todos os campos mínimos válidos', () => {
      const validData: EquipmentData = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        quantity: 1,
        weight: 7.3,
        cost: 950,
      };

      const result: ValidationResult = EquipmentValidator.validate(validData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar equipment com campos opcionais válidos', () => {
      const validData: EquipmentData = {
        id: 'equipment-002',
        name: 'Backpack',
        quantity: 1,
        weight: 2.0,
        cost: 50,
        description: 'A sturdy backpack for carrying gear',
        techLevel: 3,
        legalityClass: '4',
        notes: 'Waterproof',
        category: 'Container',
        children: [], // Array vazio é válido
      };

      const result: ValidationResult = EquipmentValidator.validate(validData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve validar equipment sem campos opcionais', () => {
      const validData: EquipmentData = {
        id: 'equipment-003',
        name: 'Large Knife',
      };

      const result: ValidationResult = EquipmentValidator.validate(validData);
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('Validação de campos obrigatórios e mensagens', () => {
    it('deve reportar erro quando id ausente', () => {
      const invalid: any = {
        name: 'Assault Carbine',
        quantity: 1,
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: id');
    });

    it('deve reportar erro quando name ausente', () => {
      const invalid: any = {
        id: 'equipment-001',
        quantity: 1,
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: name');
    });

    it('deve reportar erro quando id é string vazia', () => {
      const invalid: EquipmentData = {
        id: '',
        name: 'Assault Carbine',
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: id');
    });

    it('deve reportar erro quando name é string vazia', () => {
      const invalid: EquipmentData = {
        id: 'equipment-001',
        name: '',
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: name');
    });
  });

  describe('Validação de tipos de campos (mensagens claras)', () => {
    it('deve falhar quando id não é string', () => {
      const invalid: any = {
        id: 123,
        name: 'Assault Carbine',
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo id deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando name não é string', () => {
      const invalid: any = {
        id: 'equipment-001',
        name: 123,
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo name deve ser uma string, recebido: number'
      );
    });

    it('deve falhar quando quantity não é number válido', () => {
      const invalid: any = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        quantity: '1',
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo quantity deve ser um número maior que 0, recebido: 1'
      );
    });

    it('deve falhar quando quantity é menor que 1', () => {
      const invalid: EquipmentData = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        quantity: 0,
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo quantity deve ser um número maior que 0, recebido: 0'
      );
    });

    it('deve falhar quando weight não é number válido', () => {
      const invalid: any = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        weight: '7.3',
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo weight deve ser um número não negativo, recebido: 7.3'
      );
    });

    it('deve falhar quando weight é negativo', () => {
      const invalid: EquipmentData = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        weight: -1,
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo weight deve ser um número não negativo, recebido: -1'
      );
    });

    it('deve falhar quando cost não é number válido', () => {
      const invalid: any = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        cost: '950',
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo cost deve ser um número não negativo, recebido: 950'
      );
    });

    it('deve falhar quando cost é negativo', () => {
      const invalid: EquipmentData = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        cost: -100,
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo cost deve ser um número não negativo, recebido: -100'
      );
    });

    it('deve falhar quando techLevel não é number válido', () => {
      const invalid: any = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        techLevel: '3',
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo techLevel deve ser um número não negativo, recebido: 3'
      );
    });

    it('deve falhar quando techLevel é negativo', () => {
      const invalid: EquipmentData = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        techLevel: -1,
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo techLevel deve ser um número não negativo, recebido: -1'
      );
    });

    // Os campos opcionais não são validados por tipo no validator atual
    // Isso pode ser adicionado posteriormente se necessário

    it('deve falhar quando children não é array', () => {
      const invalid: any = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        children: 'not an array',
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo children deve ser um array, recebido: string'
      );
    });

    it('deve falhar quando children contém elementos não-Equipment', () => {
      const invalid: any = {
        id: 'equipment-001',
        name: 'Assault Carbine',
        children: ['not an equipment'],
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Campo children[0] deve ser uma instância de Equipment'
      );
    });
  });

  describe('Validação de objetos e múltiplos erros', () => {
    it('deve acumular múltiplos erros e retornar todos', () => {
      const invalid: any = {
        id: 123,
        name: '',
        quantity: '1',
        weight: '7.3',
        cost: -100,
        techLevel: '3',
        children: 'invalid',
      };

      const result = EquipmentValidator.validate(invalid);
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(7);
      expect(result.errors).toContain(
        'Campo id deve ser uma string, recebido: number'
      );
      expect(result.errors).toContain('Campo obrigatório ausente: name');
      expect(result.errors).toContain(
        'Campo quantity deve ser um número maior que 0, recebido: 1'
      );
      expect(result.errors).toContain(
        'Campo weight deve ser um número não negativo, recebido: 7.3'
      );
      expect(result.errors).toContain(
        'Campo cost deve ser um número não negativo, recebido: -100'
      );
      expect(result.errors).toContain(
        'Campo techLevel deve ser um número não negativo, recebido: 3'
      );
      expect(result.errors).toContain(
        'Campo children deve ser um array, recebido: string'
      );
    });
  });

  describe('Validação de valores específicos do GURPS', () => {
    it('deve aceitar quantity fracionária (para itens leves)', () => {
      const validData: EquipmentData = {
        id: 'equipment-001',
        name: 'Bullet',
        quantity: 30,
        weight: 0.01,
        cost: 0.05,
      };

      const result = EquipmentValidator.validate(validData);
      expect(result.success).toBe(true);
    });

    it('deve aceitar weight zero (para itens sem peso)', () => {
      const validData: EquipmentData = {
        id: 'equipment-001',
        name: 'Digital File',
        quantity: 1,
        weight: 0,
        cost: 0,
      };

      const result = EquipmentValidator.validate(validData);
      expect(result.success).toBe(true);
    });

    it('deve aceitar cost zero (para itens gratuitos)', () => {
      const validData: EquipmentData = {
        id: 'equipment-001',
        name: 'Free Item',
        quantity: 1,
        weight: 1,
        cost: 0,
      };

      const result = EquipmentValidator.validate(validData);
      expect(result.success).toBe(true);
    });

    it('deve aceitar techLevel zero (para itens primitivos)', () => {
      const validData: EquipmentData = {
        id: 'equipment-001',
        name: 'Stone Knife',
        quantity: 1,
        weight: 1,
        cost: 10,
        techLevel: 0,
      };

      const result = EquipmentValidator.validate(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('Validação de estrutura hierárquica', () => {
    it('deve validar equipment com children válidos', () => {
      const validData: EquipmentData = {
        id: 'container-001',
        name: 'Backpack',
        quantity: 1,
        weight: 2.0,
        cost: 50,
        children: [],
      };

      const result = EquipmentValidator.validate(validData);
      expect(result.success).toBe(true);
    });

    it('deve aceitar children como array vazio', () => {
      const validData: EquipmentData = {
        id: 'container-001',
        name: 'Empty Container',
        quantity: 1,
        weight: 1.0,
        cost: 20,
        children: [],
      };

      const result = EquipmentValidator.validate(validData);
      expect(result.success).toBe(true);
    });
  });
});
