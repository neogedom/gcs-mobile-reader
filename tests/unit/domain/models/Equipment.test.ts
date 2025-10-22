import { Equipment } from '../../../../src/domain/models/Equipment';

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
  });
});
