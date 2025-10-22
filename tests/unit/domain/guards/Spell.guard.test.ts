import { isSpell } from '../../../../src/domain/guards';
import { Spell } from '../../../../src/domain/models/Spell';

describe('isSpell', () => {
  describe('objetos válidos', () => {
    it('deve retornar true para uma spell válida completa', () => {
      const spell = new Spell({
        id: 'spell-1',
        name: 'Fireball',
        level: 15,
        college: 'Fire',
      });

      expect(isSpell(spell)).toBe(true);
    });

    it('deve retornar true para spell com nível zero', () => {
      const spell = new Spell({
        id: 'spell-2',
        name: 'Minor Healing',
        level: 0,
        college: 'Healing',
      });

      expect(isSpell(spell)).toBe(true);
    });

    it('deve retornar true para spell com nível alto', () => {
      const spell = new Spell({
        id: 'spell-3',
        name: 'Great Haste',
        level: 30,
        college: 'Movement',
      });

      expect(isSpell(spell)).toBe(true);
    });

    it('deve retornar true para spell com college diferente', () => {
      const spell = new Spell({
        id: 'spell-4',
        name: 'Light',
        level: 5,
        college: 'Light and Darkness',
      });

      expect(isSpell(spell)).toBe(true);
    });
  });

  describe('campos faltando', () => {
    it('deve retornar false quando id está ausente', () => {
      const obj = {
        name: 'Fireball',
        level: 15,
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false quando name está ausente', () => {
      const obj = {
        id: 'spell-1',
        level: 15,
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false quando level está ausente', () => {
      const obj = {
        id: 'spell-1',
        name: 'Fireball',
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false quando college está ausente', () => {
      const obj = {
        id: 'spell-1',
        name: 'Fireball',
        level: 15,
      };

      expect(isSpell(obj)).toBe(false);
    });
  });

  describe('tipos errados', () => {
    it('deve retornar false quando id não é string', () => {
      const obj = {
        id: 123,
        name: 'Fireball',
        level: 15,
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false quando name não é string', () => {
      const obj = {
        id: 'spell-1',
        name: 123,
        level: 15,
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false quando level não é number', () => {
      const obj = {
        id: 'spell-1',
        name: 'Fireball',
        level: '15',
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false quando college não é string', () => {
      const obj = {
        id: 'spell-1',
        name: 'Fireball',
        level: 15,
        college: 123,
      };

      expect(isSpell(obj)).toBe(false);
    });
  });

  describe('valores nulos/undefined', () => {
    it('deve retornar false quando obj é null', () => {
      expect(isSpell(null)).toBe(false);
    });

    it('deve retornar false quando obj é undefined', () => {
      expect(isSpell(undefined)).toBe(false);
    });

    it('deve retornar false quando id é null', () => {
      const obj = {
        id: null,
        name: 'Fireball',
        level: 15,
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false quando name é undefined', () => {
      const obj = {
        id: 'spell-1',
        name: undefined,
        level: 15,
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false quando level é null', () => {
      const obj = {
        id: 'spell-1',
        name: 'Fireball',
        level: null,
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false quando college é undefined', () => {
      const obj = {
        id: 'spell-1',
        name: 'Fireball',
        level: 15,
        college: undefined,
      };

      expect(isSpell(obj)).toBe(false);
    });
  });

  describe('casos limite', () => {
    it('deve retornar false para objeto vazio', () => {
      expect(isSpell({})).toBe(false);
    });

    it('deve retornar false para string', () => {
      expect(isSpell('invalid')).toBe(false);
    });

    it('deve retornar false para número', () => {
      expect(isSpell(123)).toBe(false);
    });

    it('deve retornar false para array', () => {
      expect(isSpell([])).toBe(false);
    });

    it('deve retornar false para objeto com propriedades extras', () => {
      const obj = {
        id: 'spell-1',
        name: 'Fireball',
        level: 15,
        college: 'Fire',
        extra: 'field',
      };

      expect(isSpell(obj)).toBe(true); // Propriedades extras não invalidam
    });

    it('deve retornar false para id vazio', () => {
      const obj = {
        id: '',
        name: 'Fireball',
        level: 15,
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false para name vazio', () => {
      const obj = {
        id: 'spell-1',
        name: '',
        level: 15,
        college: 'Fire',
      };

      expect(isSpell(obj)).toBe(false);
    });

    it('deve retornar false para college vazio', () => {
      const obj = {
        id: 'spell-1',
        name: 'Fireball',
        level: 15,
        college: '',
      };

      expect(isSpell(obj)).toBe(false);
    });
  });
});
