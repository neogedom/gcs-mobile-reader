import { Equipment } from '../../../../src/domain/models/Equipment';
import { EquipmentTree } from '../../../../src/domain/helpers/EquipmentTree';

describe('EquipmentTree helper', () => {
  /**
   * Estrutura usada nos testes:
   *
   * Mochila (backpack)
   * ├─ Espada (sword)
   * ├─ Aljava (quiver)
   * │  └─ Flecha (arrow)
   * └─ Bolsa (pouch)
   *    └─ Poção (potion)
   *       └─ Ouro (gold)
   *
   * Ordem esperada do flatten (depth-first):
   * [backpack, sword, quiver, arrow, pouch, potion, gold]
   */

  let backpack: Equipment;
  let sword: Equipment;
  let quiver: Equipment;
  let arrow: Equipment;
  let pouch: Equipment;
  let potion: Equipment;
  let gold: Equipment;

  beforeEach(() => {
    // folha mais profunda
    gold = new Equipment({
      id: 'gold',
      name: 'Ouro',
      weight: 0.1,
      cost: 100,
    });

    // nível acima
    potion = new Equipment({
      id: 'potion',
      name: 'Poção',
      children: [gold],
    });

    // bolsa que contém a poção
    pouch = new Equipment({
      id: 'pouch',
      name: 'Bolsa',
      children: [potion],
    });

    // flecha dentro da aljava
    arrow = new Equipment({
      id: 'arrow',
      name: 'Flecha',
      quantity: 10,
      weight: 0.05,
      cost: 1,
    });

    quiver = new Equipment({
      id: 'quiver',
      name: 'Aljava',
      children: [arrow],
    });

    // item direto na mochila
    sword = new Equipment({
      id: 'sword',
      name: 'Espada',
      weight: 3,
      cost: 50,
    });

    // mochila raiz contendo espada, aljava e bolsa
    backpack = new Equipment({
      id: 'backpack',
      name: 'Mochila',
      children: [sword, quiver, pouch],
    });
  });

  test('flatten deve retornar lista plana em ordem depth-first (raiz -> filhos -> netos)', () => {
    const flat = EquipmentTree.flatten([backpack]);

    const ids = flat.map(e => e.id);
    expect(ids).toEqual([
      'backpack',
      'sword',
      'quiver',
      'arrow',
      'pouch',
      'potion',
      'gold',
    ]);
  });

  test('getDepth deve retornar profundidade máxima da árvore', () => {
    // caminho mais profundo: backpack -> pouch -> potion -> gold = 4 níveis
    const depth = EquipmentTree.getDepth([backpack]);
    expect(depth).toBe(4);
  });

  test('findById deve localizar nó pela id em qualquer profundidade', () => {
    const foundGold = EquipmentTree.findById([backpack], 'gold');
    expect(foundGold).not.toBeNull();
    expect(foundGold!.id).toBe('gold');
    expect(foundGold!.name).toBe('Ouro');

    const foundQuiver = EquipmentTree.findById([backpack], 'quiver');
    expect(foundQuiver).not.toBeNull();
    expect(foundQuiver!.id).toBe('quiver');

    const notFound = EquipmentTree.findById([backpack], 'non-existent-id');
    expect(notFound).toBeNull();
  });

  test('flatten em lista vazia deve retornar array vazio', () => {
    expect(EquipmentTree.flatten([])).toEqual([]);
  });

  test('getDepth em lista vazia deve retornar 0', () => {
    expect(EquipmentTree.getDepth([])).toBe(0);
  });

  test('helpers devem funcionar com múltiplas raízes', () => {
    const chest = new Equipment({
      id: 'chest',
      name: 'Baú',
      children: [new Equipment({ id: 'ring', name: 'Anel', cost: 200 })],
    });

    const flat = EquipmentTree.flatten([backpack, chest]);
    const ids = flat.map(e => e.id);

    // Verifica presença de todos os ids de ambas as árvores,
    // mantendo a ordem depth-first por raiz.
    expect(ids).toEqual([
      'backpack',
      'sword',
      'quiver',
      'arrow',
      'pouch',
      'potion',
      'gold',
      'chest',
      'ring',
    ]);

    // profundidade máxima considerando ambas as raízes (backpack tem profundidade 4, chest tem 2)
    expect(EquipmentTree.getDepth([backpack, chest])).toBe(4);
  });
});
