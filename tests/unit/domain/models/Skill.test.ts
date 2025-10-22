import { Skill } from '../../../../src/domain/models/Skill';

describe('Skill Model', () => {
  describe('Instanciação válida', () => {
    it('deve criar uma instância válida com todos os campos obrigatórios', () => {
      // Arrange
      const skillData = {
        id: 'skill-001',
        name: 'Broadsword',
        level: 15,
        difficulty: 'DX/A',
      };

      // Act
      const skill = new Skill(skillData);

      // Assert
      expect(skill).toBeInstanceOf(Skill);
      expect(skill.id).toBe(skillData.id);
      expect(skill.name).toBe(skillData.name);
      expect(skill.level).toBe(skillData.level);
      expect(skill.difficulty).toBe(skillData.difficulty);
    });

    it('deve criar uma instância válida com diferentes valores de difficulty', () => {
      // Arrange
      const skillData = {
        id: 'skill-002',
        name: 'Stealth',
        level: 12,
        difficulty: 'DX/A',
      };

      // Act
      const skill = new Skill(skillData);

      // Assert
      expect(skill).toBeInstanceOf(Skill);
      expect(skill.id).toBe(skillData.id);
      expect(skill.name).toBe(skillData.name);
      expect(skill.level).toBe(skillData.level);
      expect(skill.difficulty).toBe(skillData.difficulty);
    });
  });

  describe('Campos obrigatórios ausentes', () => {
    it('deve lançar erro quando id está ausente', () => {
      // Arrange
      const skillData = {
        name: 'Broadsword',
        level: 15,
        difficulty: 'DX/A',
      };

      // Act & Assert
      expect(() => new Skill(skillData as any)).toThrow(
        'Campo obrigatório ausente: id'
      );
    });

    it('deve lançar erro quando name está ausente', () => {
      // Arrange
      const skillData = {
        id: 'skill-001',
        level: 15,
        difficulty: 'DX/A',
      };

      // Act & Assert
      expect(() => new Skill(skillData as any)).toThrow(
        'Campo obrigatório ausente: name'
      );
    });

    it('deve lançar erro quando level está ausente', () => {
      // Arrange
      const skillData = {
        id: 'skill-001',
        name: 'Broadsword',
        difficulty: 'DX/A',
      };

      // Act & Assert
      expect(() => new Skill(skillData as any)).toThrow(
        'Campo obrigatório ausente: level'
      );
    });

    it('deve lançar erro quando difficulty está ausente', () => {
      // Arrange
      const skillData = {
        id: 'skill-001',
        name: 'Broadsword',
        level: 15,
      };

      // Act & Assert
      expect(() => new Skill(skillData as any)).toThrow(
        'Campo obrigatório ausente: difficulty'
      );
    });
  });

  describe('Tipos incorretos', () => {
    it('deve lançar erro quando id não é string', () => {
      // Arrange
      const skillData = {
        id: 123,
        name: 'Broadsword',
        level: 15,
        difficulty: 'DX/A',
      };

      // Act & Assert
      expect(() => new Skill(skillData as any)).toThrow(
        'Tipo incorreto para o campo id: esperado string, recebido number'
      );
    });

    it('deve lançar erro quando name não é string', () => {
      // Arrange
      const skillData = {
        id: 'skill-001',
        name: 123,
        level: 15,
        difficulty: 'DX/A',
      };

      // Act & Assert
      expect(() => new Skill(skillData as any)).toThrow(
        'Tipo incorreto para o campo name: esperado string, recebido number'
      );
    });

    it('deve lançar erro quando level não é number', () => {
      // Arrange
      const skillData = {
        id: 'skill-001',
        name: 'Broadsword',
        level: '15',
        difficulty: 'DX/A',
      };

      // Act & Assert
      expect(() => new Skill(skillData as any)).toThrow(
        'Tipo incorreto para o campo level: esperado number, recebido string'
      );
    });

    it('deve lançar erro quando difficulty não é string', () => {
      // Arrange
      const skillData = {
        id: 'skill-001',
        name: 'Broadsword',
        level: 15,
        difficulty: 123,
      };

      // Act & Assert
      expect(() => new Skill(skillData as any)).toThrow(
        'Tipo incorreto para o campo difficulty: esperado string, recebido number'
      );
    });
  });
});
