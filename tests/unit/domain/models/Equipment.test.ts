import { Equipment } from '../../../../src/domain/models/Equipment';
import { Weapon } from '../../../../src/domain/models/Weapon';

describe('Equipment', () => {
  // ✅ Testes de criação válida
  describe('criação válida', () => {
    it('deve criar Equipment com dados básicos válidos', () => {
      const data = {
        id: 'sword-001',
        name: 'Espada Longa',
        quantity: 1,
        weight: 3,
        cost: 500,
      };

      const equipment = new Equipment(data);

      expect(equipment.id).toBe('sword-001');
      expect(equipment.name).toBe('Espada Longa');
      expect(equipment.quantity).toBe(1);
      expect(equipment.weight).toBe(3);
      expect(equipment.cost).toBe(500);
      expect(equipment.totalWeight).toBe(3);
      expect(equipment.totalCost).toBe(500);
    });

    it('deve criar Equipment com valores padrão', () => {
      const data = {
        id: 'potion-001',
        name: 'Poção de Vida',
      };

      const equipment = new Equipment(data);

      expect(equipment.quantity).toBe(1);
      expect(equipment.weight).toBe(0);
      expect(equipment.cost).toBe(0);
      expect(equipment.totalWeight).toBe(0);
      expect(equipment.totalCost).toBe(0);
    });

    it('deve criar Equipment com equipamentos filhos', () => {
      const childEquipment = new Equipment({
        id: 'gem-001',
        name: 'Gema Mágica',
        weight: 0.1,
        cost: 1000,
      });

      const data = {
        id: 'sword-002',
        name: 'Espada com Gema',
        weight: 3,
        cost: 1500,
        children: [childEquipment],
      };

      const equipment = new Equipment(data);

      expect(equipment.children).toHaveLength(1);
      expect(equipment.children![0].name).toBe('Gema Mágica');
      expect(equipment.totalWeight).toBe(3.1); // 3 + 0.1
      expect(equipment.totalCost).toBe(2500); // 1500 + 1000
    });

    it('deve criar Equipment com múltiplos filhos', () => {
      const equipment1 = new Equipment({
        id: 'arrow-001',
        name: 'Flecha',
        quantity: 20,
        weight: 0.1,
        cost: 2,
      });

      const equipment2 = new Equipment({
        id: 'bow-001',
        name: 'Arco',
        weight: 2,
        cost: 100,
      });

      const quiver = new Equipment({
        id: 'quiver-001',
        name: 'Aljava com Flechas',
        weight: 1,
        cost: 50,
        children: [equipment1, equipment2],
      });

      expect(quiver.totalWeight).toBe(5); // 1 + (20 * 0.1) + 2
      expect(quiver.totalCost).toBe(190); // 50 + (20 * 2) + 100
    });

    it('deve congelar o objeto após criação', () => {
      const equipment = new Equipment({
        id: 'test-equipment',
        name: 'Equipamento de Teste',
      });

      expect(() => {
        (equipment as any).name = 'Nome Alterado';
      }).toThrow();
    });
  });

  // ✅ Testes de equipamentos com weapons (estrutura real GCS)
  describe('equipamentos com weapons', () => {
    it('deve criar Equipment com weapons array (Assault Carbine)', () => {
      const weapons = [
        new Weapon({
          id: 'WsbCkQXer3GEmuUpl',
          damage: {
            type: 'pi',
            base: '4d+2',
          },
          strength: '9†',
          accuracy: '4',
          range: '750/2,900',
          rateOfFire: '15',
          shots: '30+1(3)',
          bulk: '-4',
          recoil: '2',
          defaults: [
            {
              type: 'skill',
              name: 'Guns',
              specialization: 'Rifle',
            },
            {
              type: 'dx',
              modifier: -4,
            },
          ],
          calc: {
            level: 13,
            damage: '4d+2 pi',
          },
        }),
      ];

      const equipment = new Equipment({
        id: 'eRpcfq4xA1Nt0HPUQ',
        name: 'Assault Carbine, 5.56mm',
        quantity: 1,
        weight: 7.3,
        cost: 950,
        weapons: weapons,
        calc: {
          extended_value: 950,
          extended_weight: 7.3,
        },
      });

      expect(equipment.weapons).toHaveLength(1);
      expect(equipment.weapons![0].id).toBe('WsbCkQXer3GEmuUpl');
      expect(equipment.weapons![0].damage.type).toBe('pi');
      expect(equipment.weapons![0].calc?.damage).toBe('4d+2 pi');
      expect(equipment.isContainer).toBe(false); // não tem children
      expect(equipment.calc?.extended_value).toBe(950);
      expect(equipment.calc?.extended_weight).toBe(7.3);
    });

    it('deve criar Equipment com múltiplas weapons (Large Knife)', () => {
      const weapons = [
        new Weapon({
          id: 'wAT01wgErvN347DNo',
          damage: {
            type: 'cut',
            st: 'sw',
            base: '-2',
          },
          strength: '6',
          usage: 'Swung',
          reach: 'C,1',
          parry: '-1',
          calc: {
            damage: '1d cut',
            parry: '8',
          },
        }),
        new Weapon({
          id: 'w6hanNs0zRtLyvUoI',
          damage: {
            type: 'imp',
            st: 'thr',
          },
          strength: '6',
          usage: 'Thrust',
          reach: 'C',
          parry: '-1',
          calc: {
            damage: '1d-1 imp',
            parry: '8',
          },
        }),
        new Weapon({
          id: 'WNGxOybMOdUyuWahP',
          damage: {
            type: 'imp',
            st: 'thr',
          },
          strength: '6',
          usage: 'Thrown',
          range: 'x0.8/x1.5',
          rateOfFire: '1',
          shots: 'T',
          bulk: '-2',
          calc: {
            damage: '1d-1 imp',
            range: '9/18',
          },
        }),
      ];

      const equipment = new Equipment({
        id: 'emr9XKLuJKTR3LBSv',
        name: 'Large Knife',
        quantity: 1,
        weight: 1,
        cost: 40,
        weapons: weapons,
      });

      expect(equipment.weapons).toHaveLength(3);
      expect(equipment.weapons![0].usage).toBe('Swung');
      expect(equipment.weapons![1].usage).toBe('Thrust');
      expect(equipment.weapons![2].usage).toBe('Thrown');
      expect(equipment.isContainer).toBe(false);
    });

    it('deve identificar equipment com weapons como não-container', () => {
      const equipment = new Equipment({
        id: 'weapon-only',
        name: 'Weapon Only',
        weapons: [
          new Weapon({
            id: 'test-weapon',
            damage: { type: 'cr', base: '1' },
          }),
        ],
      });

      expect(equipment.isContainer).toBe(false);
      expect(equipment.hasWeapons).toBe(true);
    });
  });

  // ✅ Testes de equipment containers (estrutura real GCS)
  describe('equipment containers', () => {
    it('deve criar Equipment container com children (Backpack)', () => {
      const flashlight = new Equipment({
        id: 'eyTray6hN9oFwY9CW',
        name: 'Flashlight, Mini',
        weight: 0.25,
        cost: 10,
        calc: {
          extended_value: 10,
          extended_weight: 0.25,
        },
      });

      const lighter = new Equipment({
        id: 'eu-hg0WP_H1PYZoXo',
        name: 'Cigarette Lighter',
        weight: 0.01,
        cost: 10,
        calc: {
          extended_value: 10,
          extended_weight: 0.01,
        },
      });

      const backpack = new Equipment({
        id: 'E5eINpU_Q6e85nMW6',
        name: 'Backpack',
        quantity: 1,
        weight: 0,
        cost: 0,
        children: [flashlight, lighter],
        calc: {
          extended_value: 20,
          extended_weight: 0.26,
        },
      });

      expect(backpack.isContainer).toBe(true);
      expect(backpack.hasWeapons).toBe(false);
      expect(backpack.children).toHaveLength(2);
      expect(backpack.children![0].name).toBe('Flashlight, Mini');
      expect(backpack.children![1].name).toBe('Cigarette Lighter');
      expect(backpack.totalWeight).toBe(0.26);
      expect(backpack.totalCost).toBe(20);
      expect(backpack.calc?.extended_value).toBe(20);
      expect(backpack.calc?.extended_weight).toBe(0.26);
    });

    it('deve identificar equipment com children como container', () => {
      const container = new Equipment({
        id: 'container',
        name: 'Container',
        children: [new Equipment({ id: 'child1', name: 'Child 1' })],
      });

      expect(container.isContainer).toBe(true);
      expect(container.hasWeapons).toBe(false);
    });

    it('deve calcular isContainer como false para equipment sem children', () => {
      const regular = new Equipment({
        id: 'regular',
        name: 'Regular Equipment',
      });

      expect(regular.isContainer).toBe(false);
      expect(regular.hasWeapons).toBe(false);
    });

    it('deve calcular isContainer como false para equipment com children vazio', () => {
      const emptyContainer = new Equipment({
        id: 'empty',
        name: 'Empty Container',
        children: [],
      });

      expect(emptyContainer.isContainer).toBe(false);
    });
  });

  // ✅ Testes de equipment com weapons E children (caso complexo)
  describe('equipment com weapons e children', () => {
    it('deve criar Equipment com weapons e children', () => {
      const weapon = new Weapon({
        id: 'integrated-weapon',
        damage: { type: 'pi', base: '2d' },
      });

      const child = new Equipment({
        id: 'child-item',
        name: 'Child Item',
        weight: 1,
        cost: 50,
      });

      const complexEquipment = new Equipment({
        id: 'complex',
        name: 'Complex Equipment',
        weapons: [weapon],
        children: [child],
      });

      expect(complexEquipment.hasWeapons).toBe(true);
      expect(complexEquipment.isContainer).toBe(true);
      expect(complexEquipment.weapons).toHaveLength(1);
      expect(complexEquipment.children).toHaveLength(1);
    });
  });

  // ✅ Testes de calc fields (extended_value, extended_weight)
  describe('campos calc (extended values)', () => {
    it('deve armazenar calc com extended_value e extended_weight', () => {
      const equipment = new Equipment({
        id: 'test-calc',
        name: 'Equipment com Calc',
        weight: 5,
        cost: 100,
        calc: {
          extended_value: 150,
          extended_weight: 6.5,
        },
      });

      expect(equipment.calc?.extended_value).toBe(150);
      expect(equipment.calc?.extended_weight).toBe(6.5);
    });

    it('deve calcular totais corretamente com calc fields', () => {
      const equipment = new Equipment({
        id: 'calc-test',
        name: 'Calc Test',
        quantity: 2,
        weight: 3,
        cost: 50,
        calc: {
          extended_value: 120, // incluindo children
          extended_weight: 8.5, // incluindo children
        },
      });

      expect(equipment.weight).toBe(3);
      expect(equipment.cost).toBe(50);
      expect(equipment.totalWeight).toBe(6); // 3 * 2
      expect(equipment.totalCost).toBe(100); // 50 * 2
      expect(equipment.calc?.extended_value).toBe(120);
      expect(equipment.calc?.extended_weight).toBe(8.5);
    });
  });

  // ✅ Testes de validação
  describe('validação de dados', () => {
    it('deve lançar erro com dados inválidos', () => {
      const invalidData = {
        id: '', // ❌ Inválido - vazio
        name: '', // ❌ Inválido - vazio
        quantity: 0, // ❌ Inválido - deve ser > 0
        weight: -1, // ❌ Inválido - não pode ser negativo
        cost: -50, // ❌ Inválido - não pode ser negativo
      };

      expect(() => new Equipment(invalidData as any)).toThrow();
    });

    it('deve aceitar valores mínimos válidos', () => {
      const equipment = new Equipment({
        id: 'minimal-equipment',
        name: 'Equipamento Mínimo',
        quantity: 1,
        weight: 0,
        cost: 0,
      });

      expect(equipment.quantity).toBe(1);
      expect(equipment.weight).toBe(0);
      expect(equipment.cost).toBe(0);
    });

    it('deve aceitar equipamentos filhos válidos', () => {
      const child = new Equipment({
        id: 'child-equipment',
        name: 'Equipamento Filho',
      });

      const parent = new Equipment({
        id: 'parent-equipment',
        name: 'Equipamento Pai',
        children: [child],
      });

      expect(parent.children).toHaveLength(1);
      expect(parent.children![0]).toBe(child);
    });

    it('deve aceitar weapons válidos', () => {
      const weapon = new Weapon({
        id: 'test-weapon',
        damage: { type: 'cr', base: '1' },
      });

      const equipment = new Equipment({
        id: 'weapon-equipment',
        name: 'Equipment com Weapon',
        weapons: [weapon],
      });

      expect(equipment.weapons).toHaveLength(1);
      expect(equipment.weapons![0]).toBe(weapon);
    });
  });

  // ✅ Testes dos métodos auxiliares
  describe('métodos auxiliares', () => {
    const equipment1 = new Equipment({
      id: 'test-equipment',
      name: 'Equipamento de Teste',
      weight: 5,
      cost: 100,
    });

    const equipment2 = new Equipment({
      id: 'test-equipment',
      name: 'Equipamento de Teste',
      weight: 5,
      cost: 100,
    });

    const equipment3 = new Equipment({
      id: 'different-equipment',
      name: 'Equipamento Diferente',
      weight: 10,
      cost: 200,
    });

    it('deve identificar equipamentos iguais', () => {
      expect(equipment1.equals(equipment2)).toBe(true);
    });

    it('deve identificar equipamentos diferentes', () => {
      expect(equipment1.equals(equipment3)).toBe(false);
      expect(equipment1.equals(null as any)).toBe(false);
      expect(equipment1.equals(undefined as any)).toBe(false);
    });

    it('deve comparar equipamentos com filhos', () => {
      const child1 = new Equipment({
        id: 'child-1',
        name: 'Filho 1',
      });

      const child2 = new Equipment({
        id: 'child-1',
        name: 'Filho 1',
      });

      const parent1 = new Equipment({
        id: 'parent',
        name: 'Pai',
        children: [child1],
      });

      const parent2 = new Equipment({
        id: 'parent',
        name: 'Pai',
        children: [child2],
      });

      expect(parent1.equals(parent2)).toBe(true);
    });

    it('deve gerar representação em string correta', () => {
      const equipment = new Equipment({
        id: 'magic-sword',
        name: 'Espada Mágica',
        quantity: 1,
        weight: 3,
        cost: 1000,
      });

      expect(equipment.toString()).toBe(
        'Equipment{"Espada Mágica" 3lbs $1000}'
      );
    });

    it('deve gerar representação com quantidade', () => {
      const equipment = new Equipment({
        id: 'arrows',
        name: 'Flechas',
        quantity: 20,
        weight: 0.1,
        cost: 2,
      });

      expect(equipment.toString()).toBe('Equipment{"Flechas" (x20) 2lbs $40}');
    });

    it('deve gerar representação com filhos', () => {
      const child = new Equipment({
        id: 'gem',
        name: 'Gema',
      });

      const equipment = new Equipment({
        id: 'sword-with-gem',
        name: 'Espada com Gema',
        children: [child],
      });

      expect(equipment.toString()).toBe(
        'Equipment{"Espada com Gema" +1 itens}'
      );
    });

    it('deve gerar representação com weapons', () => {
      const weapon = new Weapon({
        id: 'test-weapon',
        damage: { type: 'cr', base: '1' },
        calc: { damage: '1d cr' },
      });

      const equipment = new Equipment({
        id: 'weapon-item',
        name: 'Item com Weapon',
        weapons: [weapon],
      });

      expect(equipment.toString()).toBe('Equipment{"Item com Weapon"}');
    });
  });

  // ✅ Testes de equipamentos filhos
  describe('equipamentos filhos', () => {
    it('deve calcular peso total com filhos', () => {
      const child1 = new Equipment({
        id: 'child-1',
        name: 'Filho 1',
        weight: 2,
      });

      const child2 = new Equipment({
        id: 'child-2',
        name: 'Filho 2',
        weight: 3,
      });

      const parent = new Equipment({
        id: 'parent',
        name: 'Pai',
        weight: 1,
        children: [child1, child2],
      });

      expect(parent.totalWeight).toBe(6); // 1 + 2 + 3
    });

    it('deve calcular custo total com filhos', () => {
      const child1 = new Equipment({
        id: 'child-1',
        name: 'Filho 1',
        cost: 100,
      });

      const child2 = new Equipment({
        id: 'child-2',
        name: 'Filho 2',
        cost: 200,
      });

      const parent = new Equipment({
        id: 'parent',
        name: 'Pai',
        cost: 50,
        children: [child1, child2],
      });

      expect(parent.totalCost).toBe(350); // 50 + 100 + 200
    });

    it('deve calcular totais com quantidade e filhos', () => {
      const child = new Equipment({
        id: 'child',
        name: 'Filho',
        weight: 1,
        cost: 10,
      });

      const parent = new Equipment({
        id: 'parent',
        name: 'Pai',
        quantity: 3,
        weight: 2,
        cost: 20,
        children: [child],
      });

      expect(parent.totalWeight).toBe(9); // (2 * 3) + (1 * 3) = 6 + 3 = 9
      expect(parent.totalCost).toBe(90); // (20 * 3) + (10 * 3) = 60 + 30 = 90
    });

    it('deve retornar lista de todos os filhos recursivamente', () => {
      const grandchild = new Equipment({
        id: 'grandchild',
        name: 'Neto',
      });

      const child = new Equipment({
        id: 'child',
        name: 'Filho',
        children: [grandchild],
      });

      const parent = new Equipment({
        id: 'parent',
        name: 'Pai',
        children: [child],
      });

      const allChildren = parent.allChildren;
      expect(allChildren).toHaveLength(2);
      expect(allChildren[0].name).toBe('Filho');
      expect(allChildren[1].name).toBe('Neto');
    });

    it('deve retornar array vazio quando não há filhos', () => {
      const equipment = new Equipment({
        id: 'no-children',
        name: 'Sem Filhos',
      });

      expect(equipment.allChildren).toEqual([]);
    });
  });

  // ✅ Testes de casos extremos
  describe('casos extremos', () => {
    it('deve aceitar nomes com caracteres especiais', () => {
      const equipment = new Equipment({
        id: 'special-chars',
        name: 'Equipamento com Çaracteres Éspeciais e Núm3r0s!',
      });

      expect(equipment.name).toBe(
        'Equipamento com Çaracteres Éspeciais e Núm3r0s!'
      );
    });

    it('deve aceitar equipamentos com muitos filhos', () => {
      const children = [];
      for (let i = 0; i < 100; i++) {
        children.push(
          new Equipment({
            id: `child-${i}`,
            name: `Filho ${i}`,
            weight: 0.1,
            cost: 1,
          })
        );
      }

      const parent = new Equipment({
        id: 'parent-many-children',
        name: 'Pai com Muitos Filhos',
        children,
      });

      expect(parent.children).toHaveLength(100);
      expect(parent.totalWeight).toBe(10); // 100 * 0.1 (arredondado)
      expect(parent.totalCost).toBe(100); // 100 * 1
    });

    it('deve lidar com weapons array vazio', () => {
      const equipment = new Equipment({
        id: 'empty-weapons',
        name: 'Equipment com Weapons Vazio',
        weapons: [],
      });

      expect(equipment.weapons).toEqual([]);
      expect(equipment.hasWeapons).toBe(false);
    });

    it('deve lidar com children array vazio', () => {
      const equipment = new Equipment({
        id: 'empty-children',
        name: 'Equipment com Children Vazio',
        children: [],
      });

      expect(equipment.children).toEqual([]);
      expect(equipment.isContainer).toBe(false);
    });
  });
});
