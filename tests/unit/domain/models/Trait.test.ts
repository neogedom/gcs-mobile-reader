import { Trait } from '../../../../src/domain/models/Trait';

describe('Trait Model', () => {
  describe('Instanciação válida', () => {
    it('deve criar uma instância válida com todos os campos obrigatórios', () => {
      // Arrange
      const traitData = {
        id: 'trait-001',
        name: 'Combat Reflexes',
        cost: 15,
      };

      // Act
      const trait = new Trait(traitData);

      // Assert
      expect(trait).toBeInstanceOf(Trait);
      expect(trait.id).toBe(traitData.id);
      expect(trait.name).toBe(traitData.name);
      expect(trait.cost).toBe(traitData.cost);
      expect(trait.description).toBeUndefined();
    });

    it('deve criar uma instância válida com campo opcional description', () => {
      // Arrange
      const traitData = {
        id: 'trait-002',
        name: 'High Pain Threshold',
        cost: 10,
        description: 'Você sofre apenas 1/3 do choque de ferimentos',
      };

      // Act
      const trait = new Trait(traitData);

      // Assert
      expect(trait).toBeInstanceOf(Trait);
      expect(trait.id).toBe(traitData.id);
      expect(trait.name).toBe(traitData.name);
      expect(trait.cost).toBe(traitData.cost);
      expect(trait.description).toBe(traitData.description);
    });
  });

  describe('Campos obrigatórios ausentes', () => {
    it('deve lançar erro quando id está ausente', () => {
      // Arrange
      const traitData = {
        name: 'Combat Reflexes',
        cost: 15,
      };

      // Act & Assert
      expect(() => new Trait(traitData as any)).toThrow(
        'Campo obrigatório ausente: id'
      );
    });

    it('deve lançar erro quando name está ausente', () => {
      // Arrange
      const traitData = {
        id: 'trait-001',
        cost: 15,
      };

      // Act & Assert
      expect(() => new Trait(traitData as any)).toThrow(
        'Campo obrigatório ausente: name'
      );
    });

    it('deve lançar erro quando cost está ausente', () => {
      // Arrange
      const traitData = {
        id: 'trait-001',
        name: 'Combat Reflexes',
      };

      // Act & Assert
      expect(() => new Trait(traitData as any)).toThrow(
        'Campo obrigatório ausente: cost'
      );
    });
  });

  describe('Tipos incorretos', () => {
    it('deve lançar erro quando id não é string', () => {
      // Arrange
      const traitData = {
        id: 123,
        name: 'Combat Reflexes',
        cost: 15,
      };

      // Act & Assert
      expect(() => new Trait(traitData as any)).toThrow(
        'Tipo incorreto para o campo id: esperado string, recebido number'
      );
    });

    it('deve lançar erro quando name não é string', () => {
      // Arrange
      const traitData = {
        id: 'trait-001',
        name: 123,
        cost: 15,
      };

      // Act & Assert
      expect(() => new Trait(traitData as any)).toThrow(
        'Tipo incorreto para o campo name: esperado string, recebido number'
      );
    });

    it('deve lançar erro quando cost não é number', () => {
      // Arrange
      const traitData = {
        id: 'trait-001',
        name: 'Combat Reflexes',
        cost: '15',
      };

      // Act & Assert
      expect(() => new Trait(traitData as any)).toThrow(
        'Tipo incorreto para o campo cost: esperado number, recebido string'
      );
    });

    it('deve lançar erro quando description não é string', () => {
      // Arrange
      const traitData = {
        id: 'trait-001',
        name: 'Combat Reflexes',
        cost: 15,
        description: 123,
      };

      // Act & Assert
      expect(() => new Trait(traitData as any)).toThrow(
        'Tipo incorreto para o campo description: esperado string, recebido number'
      );
    });
  });
});
