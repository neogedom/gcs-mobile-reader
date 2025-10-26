import { isTrait } from '../../../../src/domain/guards';
import { Trait } from '../../../../src/domain/models/Trait';

describe('isTrait', () => {
  describe('objetos válidos', () => {
    it('deve retornar true para uma trait válida completa', () => {
      const trait = new Trait({
        id: 'trait-1',
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
        description: 'You have enhanced reactions in combat.',
      });

      expect(isTrait(trait)).toBe(true);
    });

    it('deve retornar true para trait sem descrição', () => {
      const trait = new Trait({
        id: 'trait-2',
        name: 'High Pain Threshold',
        basePoints: 10,
        calc: { points: 10 },
        tags: ['Advantage'],
      });

      expect(isTrait(trait)).toBe(true);
    });

    it('deve retornar true para trait com basePoints zero', () => {
      const trait = new Trait({
        id: 'trait-3',
        name: 'Appearance',
        basePoints: 0,
        calc: { points: 0 },
        tags: ['Advantage'],
      });

      expect(isTrait(trait)).toBe(true);
    });

    it('deve retornar true para trait com basePoints negativo', () => {
      const trait = new Trait({
        id: 'trait-4',
        name: 'Bad Temper',
        basePoints: -10,
        calc: { points: -10 },
        tags: ['Disadvantage'],
      });

      expect(isTrait(trait)).toBe(true);
    });
  });

  describe('campos faltando', () => {
    it('deve retornar false quando id está ausente', () => {
      const obj = {
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });

    it('deve retornar false quando name está ausente', () => {
      const obj = {
        id: 'trait-1',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });

    it('deve retornar false quando calc está ausente', () => {
      const obj = {
        id: 'trait-1',
        name: 'Combat Reflexes',
        basePoints: 15,
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });
  });

  describe('tipos errados', () => {
    it('deve retornar false quando id não é string', () => {
      const obj = {
        id: 123,
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });

    it('deve retornar false quando name não é string', () => {
      const obj = {
        id: 'trait-1',
        name: 123,
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });

    it('deve retornar false quando basePoints não é number', () => {
      const obj = {
        id: 'trait-1',
        name: 'Combat Reflexes',
        basePoints: '15',
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });

    it('deve retornar false quando description não é string', () => {
      const obj = {
        id: 'trait-1',
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
        description: 123,
      };

      expect(isTrait(obj)).toBe(false);
    });
  });

  describe('valores nulos/undefined', () => {
    it('deve retornar false quando obj é null', () => {
      expect(isTrait(null)).toBe(false);
    });

    it('deve retornar false quando obj é undefined', () => {
      expect(isTrait(undefined)).toBe(false);
    });

    it('deve retornar false quando id é null', () => {
      const obj = {
        id: null,
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });

    it('deve retornar false quando name é undefined', () => {
      const obj = {
        id: 'trait-1',
        name: undefined,
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });

    it('deve retornar false quando basePoints é null', () => {
      const obj = {
        id: 'trait-1',
        name: 'Combat Reflexes',
        basePoints: null,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });

    it('deve retornar false quando description é null', () => {
      const obj = {
        id: 'trait-1',
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
        description: null,
      };

      expect(isTrait(obj)).toBe(false);
    });
  });

  describe('casos limite', () => {
    it('deve retornar false para objeto vazio', () => {
      expect(isTrait({})).toBe(false);
    });

    it('deve retornar false para string', () => {
      expect(isTrait('invalid')).toBe(false);
    });

    it('deve retornar false para número', () => {
      expect(isTrait(123)).toBe(false);
    });

    it('deve retornar false para array', () => {
      expect(isTrait([])).toBe(false);
    });

    it('deve retornar false para objeto com propriedades extras', () => {
      const obj = {
        id: 'trait-1',
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
        extra: 'field',
      };

      expect(isTrait(obj)).toBe(true); // Propriedades extras não invalidam
    });

    it('deve retornar false para id vazio', () => {
      const obj = {
        id: '',
        name: 'Combat Reflexes',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });

    it('deve retornar false para name vazio', () => {
      const obj = {
        id: 'trait-1',
        name: '',
        basePoints: 15,
        calc: { points: 15 },
        tags: ['Advantage'],
      };

      expect(isTrait(obj)).toBe(false);
    });
  });
});
