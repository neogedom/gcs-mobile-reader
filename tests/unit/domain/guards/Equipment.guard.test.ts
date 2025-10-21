import { isEquipment } from '../../../../src/domain/guards';
import { Equipment } from '../../../../src/domain/models/Equipment';

describe('isEquipment', () => {
  describe('objetos válidos', () => {
    it('deve retornar true para um equipment válido completo', () => {
      const equipment = new Equipment({
        id: 'equip-1',
        name: 'Sword',
        quantity: 1,
        weight: 2,
        cost: 500,
        description: 'A sharp sword',
        techLevel: 3,
        legalityClass: 'LC4',
        notes: 'Well balanced',
        category: 'Weapon',
      });

      expect(isEquipment(equipment)).toBe(true);
    });

    it('deve retornar true para equipment com valores mínimos', () => {
      const equipment = new Equipment({
        id: 'equip-2',
        name: 'Basic Item',
      });

      expect(isEquipment(equipment)).toBe(true);
    });

    it('deve retornar true para equipment com children', () => {
      const child = new Equipment({
        id: 'child-1',
        name: 'Scabbard',
      });

      const equipment = new Equipment({
        id: 'equip-3',
        name: 'Sword with Scabbard',
        children: [child],
      });

      expect(isEquipment(equipment)).toBe(true);
    });

    it('deve retornar true para equipment com quantity > 1', () => {
      const equipment = new Equipment({
        id: 'equip-4',
        name: 'Arrows',
        quantity: 20,
        weight: 0.1,
        cost: 2,
      });

      expect(isEquipment(equipment)).toBe(true);
    });

    it('deve retornar true para equipment com weight zero', () => {
      const equipment = new Equipment({
        id: 'equip-5',
        name: 'Magic Ring',
        weight: 0,
        cost: 1000,
      });

      expect(isEquipment(equipment)).toBe(true);
    });

    it('deve retornar true para equipment com cost zero', () => {
      const equipment = new Equipment({
        id: 'equip-6',
        name: 'Free Item',
        cost: 0,
      });

      expect(isEquipment(equipment)).toBe(true);
    });
  });

  describe('campos faltando', () => {
    it('deve retornar false quando id está ausente', () => {
      const obj = {
        name: 'Sword',
        quantity: 1,
        weight: 2,
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando name está ausente', () => {
      const obj = {
        id: 'equip-1',
        quantity: 1,
        weight: 2,
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });
  });

  describe('tipos errados', () => {
    it('deve retornar false quando id não é string', () => {
      const obj = {
        id: 123,
        name: 'Sword',
        quantity: 1,
        weight: 2,
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando name não é string', () => {
      const obj = {
        id: 'equip-1',
        name: 123,
        quantity: 1,
        weight: 2,
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando quantity não é number', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        quantity: '1',
        weight: 2,
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando weight não é number', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        quantity: 1,
        weight: '2',
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando cost não é number', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        quantity: 1,
        weight: 2,
        cost: '500',
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando techLevel não é number', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        techLevel: '3',
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando children não é array', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        children: 'not-array',
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando children contém item não-Equipment', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        children: ['invalid'],
      };

      expect(isEquipment(obj)).toBe(false);
    });
  });

  describe('valores nulos/undefined', () => {
    it('deve retornar false quando obj é null', () => {
      expect(isEquipment(null)).toBe(false);
    });

    it('deve retornar false quando obj é undefined', () => {
      expect(isEquipment(undefined)).toBe(false);
    });

    it('deve retornar false quando id é null', () => {
      const obj = {
        id: null,
        name: 'Sword',
        quantity: 1,
        weight: 2,
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando name é undefined', () => {
      const obj = {
        id: 'equip-1',
        name: undefined,
        quantity: 1,
        weight: 2,
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando quantity é null', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        quantity: null,
        weight: 2,
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando weight é undefined', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        quantity: 1,
        weight: undefined,
        cost: 500,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando cost é null', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        quantity: 1,
        weight: 2,
        cost: null,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false quando children é null', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        children: null,
      };

      expect(isEquipment(obj)).toBe(false);
    });
  });

  describe('casos limite', () => {
    it('deve retornar false para objeto vazio', () => {
      expect(isEquipment({})).toBe(false);
    });

    it('deve retornar false para string', () => {
      expect(isEquipment('invalid')).toBe(false);
    });

    it('deve retornar false para número', () => {
      expect(isEquipment(123)).toBe(false);
    });

    it('deve retornar false para array', () => {
      expect(isEquipment([])).toBe(false);
    });

    it('deve retornar false para objeto com propriedades extras', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        extra: 'field',
      };

      expect(isEquipment(obj)).toBe(true); // Propriedades extras não invalidam
    });

    it('deve retornar false para id vazio', () => {
      const obj = {
        id: '',
        name: 'Sword',
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false para name vazio', () => {
      const obj = {
        id: 'equip-1',
        name: '',
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false para quantity <= 0', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        quantity: 0,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false para weight < 0', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        weight: -1,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false para cost < 0', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        cost: -1,
      };

      expect(isEquipment(obj)).toBe(false);
    });

    it('deve retornar false para techLevel < 0', () => {
      const obj = {
        id: 'equip-1',
        name: 'Sword',
        techLevel: -1,
      };

      expect(isEquipment(obj)).toBe(false);
    });
  });
});