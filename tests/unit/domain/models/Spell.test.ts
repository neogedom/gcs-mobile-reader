import { Spell } from '../../../../src/domain/models/Spell';

describe('Spell Model', () => {
  describe('Instanciação válida', () => {
    it('deve criar uma instância válida com todos os campos obrigatórios', () => {
      // Arrange
      const spellData = {
        id: 'spell-001',
        name: 'Lightning',
        level: 3,
        college: 'Air'
      };

      // Act
      const spell = new Spell(spellData);

      // Assert
      expect(spell).toBeInstanceOf(Spell);
      expect(spell.id).toBe(spellData.id);
      expect(spell.name).toBe(spellData.name);
      expect(spell.level).toBe(spellData.level);
      expect(spell.college).toBe(spellData.college);
    });

    it('deve criar uma instância válida com diferentes valores de college', () => {
      // Arrange
      const spellData = {
        id: 'spell-002',
        name: 'Fireball',
        level: 2,
        college: 'Fire'
      };

      // Act
      const spell = new Spell(spellData);

      // Assert
      expect(spell).toBeInstanceOf(Spell);
      expect(spell.id).toBe(spellData.id);
      expect(spell.name).toBe(spellData.name);
      expect(spell.level).toBe(spellData.level);
      expect(spell.college).toBe(spellData.college);
    });
  });

  describe('Campos obrigatórios ausentes', () => {
    it('deve lançar erro quando id está ausente', () => {
      // Arrange
      const spellData = {
        name: 'Lightning',
        level: 3,
        college: 'Air'
      };

      // Act & Assert
      expect(() => new Spell(spellData as any)).toThrow('Campo obrigatório ausente: id');
    });

    it('deve lançar erro quando name está ausente', () => {
      // Arrange
      const spellData = {
        id: 'spell-001',
        level: 3,
        college: 'Air'
      };

      // Act & Assert
      expect(() => new Spell(spellData as any)).toThrow('Campo obrigatório ausente: name');
    });

    it('deve lançar erro quando level está ausente', () => {
      // Arrange
      const spellData = {
        id: 'spell-001',
        name: 'Lightning',
        college: 'Air'
      };

      // Act & Assert
      expect(() => new Spell(spellData as any)).toThrow('Campo obrigatório ausente: level');
    });

    it('deve lançar erro quando college está ausente', () => {
      // Arrange
      const spellData = {
        id: 'spell-001',
        name: 'Lightning',
        level: 3
      };

      // Act & Assert
      expect(() => new Spell(spellData as any)).toThrow('Campo obrigatório ausente: college');
    });
  });

  describe('Tipos incorretos', () => {
    it('deve lançar erro quando id não é string', () => {
      // Arrange
      const spellData = {
        id: 123,
        name: 'Lightning',
        level: 3,
        college: 'Air'
      };

      // Act & Assert
      expect(() => new Spell(spellData as any)).toThrow('Tipo incorreto para o campo id: esperado string, recebido number');
    });

    it('deve lançar erro quando name não é string', () => {
      // Arrange
      const spellData = {
        id: 'spell-001',
        name: 123,
        level: 3,
        college: 'Air'
      };

      // Act & Assert
      expect(() => new Spell(spellData as any)).toThrow('Tipo incorreto para o campo name: esperado string, recebido number');
    });

    it('deve lançar erro quando level não é number', () => {
      // Arrange
      const spellData = {
        id: 'spell-001',
        name: 'Lightning',
        level: '3',
        college: 'Air'
      };

      // Act & Assert
      expect(() => new Spell(spellData as any)).toThrow('Tipo incorreto para o campo level: esperado number, recebido string');
    });

    it('deve lançar erro quando college não é string', () => {
      // Arrange
      const spellData = {
        id: 'spell-001',
        name: 'Lightning',
        level: 3,
        college: 123
      };

      // Act & Assert
      expect(() => new Spell(spellData as any)).toThrow('Tipo incorreto para o campo college: esperado string, recebido number');
    });
  });
});