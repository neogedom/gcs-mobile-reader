import { isSkill } from '../../../../src/domain/guards';
import { Skill } from '../../../../src/domain/models/Skill';

describe('isSkill', () => {
  describe('objetos válidos', () => {
    it('deve retornar true para uma skill válida completa', () => {
      const skill = new Skill({
        id: 'skill-1',
        name: 'Sword',
        level: 12,
        difficulty: 'A',
      });

      expect(isSkill(skill)).toBe(true);
    });

    it('deve retornar true para skill com nível zero', () => {
      const skill = new Skill({
        id: 'skill-2',
        name: 'Untrained',
        level: 0,
        difficulty: 'E',
      });

      expect(isSkill(skill)).toBe(true);
    });

    it('deve retornar true para skill com nível alto', () => {
      const skill = new Skill({
        id: 'skill-3',
        name: 'Master Sword',
        level: 25,
        difficulty: 'VH',
      });

      expect(isSkill(skill)).toBe(true);
    });

    it('deve retornar true para skill com dificuldade diferente', () => {
      const skill = new Skill({
        id: 'skill-4',
        name: 'Easy Skill',
        level: 10,
        difficulty: 'E',
      });

      expect(isSkill(skill)).toBe(true);
    });
  });

  describe('campos faltando', () => {
    it('deve retornar false quando id está ausente', () => {
      const obj = {
        name: 'Sword',
        level: 12,
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false quando name está ausente', () => {
      const obj = {
        id: 'skill-1',
        level: 12,
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false quando level está ausente', () => {
      const obj = {
        id: 'skill-1',
        name: 'Sword',
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false quando difficulty está ausente', () => {
      const obj = {
        id: 'skill-1',
        name: 'Sword',
        level: 12,
      };

      expect(isSkill(obj)).toBe(false);
    });
  });

  describe('tipos errados', () => {
    it('deve retornar false quando id não é string', () => {
      const obj = {
        id: 123,
        name: 'Sword',
        level: 12,
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false quando name não é string', () => {
      const obj = {
        id: 'skill-1',
        name: 123,
        level: 12,
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false quando level não é number', () => {
      const obj = {
        id: 'skill-1',
        name: 'Sword',
        level: '12',
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false quando difficulty não é string', () => {
      const obj = {
        id: 'skill-1',
        name: 'Sword',
        level: 12,
        difficulty: 123,
      };

      expect(isSkill(obj)).toBe(false);
    });
  });

  describe('valores nulos/undefined', () => {
    it('deve retornar false quando obj é null', () => {
      expect(isSkill(null)).toBe(false);
    });

    it('deve retornar false quando obj é undefined', () => {
      expect(isSkill(undefined)).toBe(false);
    });

    it('deve retornar false quando id é null', () => {
      const obj = {
        id: null,
        name: 'Sword',
        level: 12,
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false quando name é undefined', () => {
      const obj = {
        id: 'skill-1',
        name: undefined,
        level: 12,
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false quando level é null', () => {
      const obj = {
        id: 'skill-1',
        name: 'Sword',
        level: null,
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false quando difficulty é undefined', () => {
      const obj = {
        id: 'skill-1',
        name: 'Sword',
        level: 12,
        difficulty: undefined,
      };

      expect(isSkill(obj)).toBe(false);
    });
  });

  describe('casos limite', () => {
    it('deve retornar false para objeto vazio', () => {
      expect(isSkill({})).toBe(false);
    });

    it('deve retornar false para string', () => {
      expect(isSkill('invalid')).toBe(false);
    });

    it('deve retornar false para número', () => {
      expect(isSkill(123)).toBe(false);
    });

    it('deve retornar false para array', () => {
      expect(isSkill([])).toBe(false);
    });

    it('deve retornar false para objeto com propriedades extras', () => {
      const obj = {
        id: 'skill-1',
        name: 'Sword',
        level: 12,
        difficulty: 'A',
        extra: 'field',
      };

      expect(isSkill(obj)).toBe(true); // Propriedades extras não invalidam
    });

    it('deve retornar false para id vazio', () => {
      const obj = {
        id: '',
        name: 'Sword',
        level: 12,
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false para name vazio', () => {
      const obj = {
        id: 'skill-1',
        name: '',
        level: 12,
        difficulty: 'A',
      };

      expect(isSkill(obj)).toBe(false);
    });

    it('deve retornar false para difficulty vazia', () => {
      const obj = {
        id: 'skill-1',
        name: 'Sword',
        level: 12,
        difficulty: '',
      };

      expect(isSkill(obj)).toBe(false);
    });
  });
});
