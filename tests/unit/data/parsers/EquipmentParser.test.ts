import { EquipmentParser } from '../../../../src/data/parsers';
import { Equipment } from '../../../../src/domain/models/Equipment';
import { Weapon } from '../../../../src/domain/models/Weapon';
import characterData from '../../../utils/characterBuilder';

describe('EquipmentParser', () => {
  let parser: EquipmentParser;
  let fixtureEquipmentData: any[];
  let fixtureOtherEquipmentData: any[];

  beforeEach(() => {
    parser = new EquipmentParser();
    fixtureEquipmentData = characterData.equipment;
    fixtureOtherEquipmentData = characterData.other_equipment;
  });

  describe('parseEquipment', () => {
    it('deve parsear equipment simples sem weapons ou children', () => {
      // Act
      const result = parser.parseEquipment(fixtureEquipmentData[0]);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Equipment);
      const equipment = result.data as Equipment;
      expect(equipment.id).toBe('eRpcfq4xA1Nt0HPUQ');
      expect(equipment.name).toBe('Assault Carbine, 5.56mm');
      expect(equipment.quantity).toBe(1);
      expect(equipment.isContainer).toBe(false);
      expect(equipment.hasWeapons).toBe(true);
      expect(equipment.calc?.extended_value).toBe(950);
      expect(equipment.calc?.extended_weight).toBe('7.3 lb');
    });

    it('deve parsear equipment com weapons (Assault Carbine)', () => {
      // Arrange - usar dados reais do character.gcs
      const assaultCarbine = fixtureEquipmentData[0];

      // Act
      const result = parser.parseEquipment(assaultCarbine);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Equipment);
      const equipment = result.data as Equipment;
      expect(equipment.id).toBe('eRpcfq4xA1Nt0HPUQ');
      expect(equipment.name).toBe('Assault Carbine, 5.56mm');
      expect(equipment.hasWeapons).toBe(true);
      expect(equipment.weapons).toHaveLength(1);

      const weapon = equipment.weapons![0];
      expect(weapon).toBeInstanceOf(Weapon);
      expect(weapon.id).toBe('WsbCkQXer3GEmuUpl');
      expect(weapon.damage.type).toBe('pi');
      expect(weapon.damage.base).toBe('4d+2');
      expect(weapon.strength).toBe('9†');
      expect(weapon.accuracy).toBe('4');
      expect(weapon.range).toBe('750/2,900');
      expect(weapon.rateOfFire).toBe('15');
      expect(weapon.shots).toBe('30+1(3)');
      expect(weapon.bulk).toBe('-4');
      expect(weapon.recoil).toBe('2');
    });

    it('deve parsear equipment com múltiplos weapons (Large Knife)', () => {
      // Arrange - usar dados reais do character.gcs
      const largeKnife = fixtureEquipmentData[1];

      // Act
      const result = parser.parseEquipment(largeKnife);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Equipment);
      const equipment = result.data as unknown as Equipment;
      expect(equipment.id).toBe('emr9XKLuJKTR3LBSv');
      expect(equipment.name).toBe('Large Knife');
      expect(equipment.hasWeapons).toBe(true);
      expect(equipment.weapons).toHaveLength(3);

      // Verificar primeiro weapon (Swung)
      const swungWeapon = equipment.weapons![0];
      expect(swungWeapon.usage).toBe('Swung');
      expect(swungWeapon.damage.type).toBe('cut');
      expect(swungWeapon.damage.st).toBe('sw');
      expect(swungWeapon.damage.base).toBe('-2');
      expect(swungWeapon.strength).toBe('6');
      expect(swungWeapon.reach).toBe('C,1');
      expect(swungWeapon.parry).toBe('-1');

      // Verificar segundo weapon (Thrust)
      const thrustWeapon = equipment.weapons![1];
      expect(thrustWeapon.usage).toBe('Thrust');
      expect(thrustWeapon.damage.type).toBe('imp');
      expect(thrustWeapon.damage.st).toBe('thr');
      expect(thrustWeapon.reach).toBe('C');
      expect(thrustWeapon.parry).toBe('-1');

      // Verificar terceiro weapon (Thrown)
      const thrownWeapon = equipment.weapons![2];
      expect(thrownWeapon.usage).toBe('Thrown');
      expect(thrownWeapon.damage.type).toBe('imp');
      expect(thrownWeapon.damage.st).toBe('thr');
      expect(thrownWeapon.range).toBe('x0.8/x1.5');
      expect(thrownWeapon.rateOfFire).toBe('1');
      expect(thrownWeapon.shots).toBe('T');
      expect(thrownWeapon.bulk).toBe('-2');
    });

    it('deve parsear container com children (Backpack)', () => {
      // Arrange - usar dados reais do character.gcs
      const backpack = fixtureOtherEquipmentData[0];

      // Act
      const result = parser.parseEquipment(backpack);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Equipment);
      const equipment = result.data as unknown as Equipment;
      expect(equipment.id).toBe('E5eINpU_Q6e85nMW6');
      expect(equipment.name).toBe('Backpack');
      expect(equipment.isContainer).toBe(true);
      expect(equipment.children).toHaveLength(2);

      // Verificar primeiro child (Flashlight)
      const flashlight = equipment.children![0];
      expect(flashlight).toBeInstanceOf(Equipment);
      expect(flashlight.id).toBe('eyTray6hN9oFwY9CW');
      expect(flashlight.name).toBe('Flashlight, Mini');
      expect(flashlight.isContainer).toBe(false);
      expect(flashlight.hasWeapons).toBe(false);

      // Verificar segundo child (Cigarette Lighter)
      const lighter = equipment.children![1];
      expect(lighter).toBeInstanceOf(Equipment);
      expect(lighter.id).toBe('eu-hg0WP_H1PYZoXo');
      expect(lighter.name).toBe('Cigarette Lighter');
      expect(lighter.isContainer).toBe(false);
      expect(lighter.hasWeapons).toBe(false);
    });

    it('deve parsear container vazio', () => {
      // Arrange
      const emptyContainer = {
        id: 'empty-container',
        description: 'Empty Container',
        quantity: 1,
        equipped: true,
        children: [],
        calc: {
          value: 0,
          extended_value: 0,
          weight: '0 lb',
          extended_weight: '0 lb',
        },
      };

      // Act
      const result = parser.parseEquipment(emptyContainer);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Equipment);
      const equipment = result.data as unknown as Equipment;
      expect(equipment.id).toBe('empty-container');
      expect(equipment.name).toBe('Empty Container');
      expect(equipment.isContainer).toBe(false); // children array vazio não conta como container
      expect(equipment.children).toHaveLength(0);
    });

    it('deve calcular isContainer automaticamente baseado em children.length > 0', () => {
      // Arrange

      // Act
      const result = parser.parseEquipment(fixtureOtherEquipmentData[0]);

      // Assert
      expect(result.success).toBe(true);
      const equipment = result.data as Equipment;
      expect(equipment.isContainer).toBe(true);
      expect(equipment.children).toHaveLength(2);
    });

    it('deve mapear calc.extended_value/extended_weight para valores finais', () => {
      // Act
      const result = parser.parseEquipment(fixtureOtherEquipmentData[0]);

      // Assert
      expect(result.success).toBe(true);
      const equipment = result.data as Equipment;
      expect(equipment.calc?.extended_value).toBe(20);
      expect(equipment.calc?.extended_weight).toBe('0.26 lb');
    });

    it('deve lidar com dados malformados retornando erro', () => {
      // Arrange - dados sem id obrigatório
      const malformedData = {
        description: 'Malformed Item',
        quantity: 1,
      };

      // Act
      const result = parser.parseEquipment(malformedData);

      // Assert
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: id');
      expect(result.data).toBeNull();
    });

    it('deve lidar com weapons malformadas', () => {
      // Arrange
      const equipmentWithBadWeapon = {
        id: 'bad-weapon-item',
        description: 'Bad Weapon Item',
        quantity: 1,
        equipped: true,
        weapons: [
          {
            // Weapon sem id obrigatório
            damage: { type: 'pi', base: '1d' },
          },
        ],
        calc: {
          value: 10,
          extended_value: 10,
          weight: '1 lb',
          extended_weight: '1 lb',
        },
      };

      // Act
      const result = parser.parseEquipment(equipmentWithBadWeapon);

      // Assert
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Erro ao parsear weapon: Erros de validação na weapon:\nCampo obrigatório ausente: id'
      );
      expect(result.data).toBeNull();
    });

    it('deve lidar com children malformadas recursivamente', () => {
      // Arrange
      const equipmentWithBadChild = {
        id: 'bad-child-item',
        description: 'Bad Child Item',
        quantity: 1,
        equipped: true,
        children: [
          {
            // Child sem id obrigatório
            description: 'Bad Child',
            quantity: 1,
          },
        ],
        calc: {
          value: 10,
          extended_value: 10,
          weight: '1 lb',
          extended_weight: '1 lb',
        },
      };

      // Act
      const result = parser.parseEquipment(equipmentWithBadChild);

      // Assert
      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        'Erro no child: Campo obrigatório ausente: id'
      );
      expect(result.data).toBeNull();
    });
  });

  describe('parseEquipmentList', () => {
    it('deve parsear lista de equipment corretamente', () => {
      // Arrange - usar dados reais do character.gcs
      const equipmentList = fixtureEquipmentData;

      // Act
      const result = parser.parseEquipmentList(equipmentList);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Array);
      const equipmentArray = result.data as Equipment[];
      expect(equipmentArray).toHaveLength(2);

      // Verificar Assault Carbine
      const assaultCarbine = equipmentArray[0];
      expect(assaultCarbine.name).toBe('Assault Carbine, 5.56mm');
      expect(assaultCarbine.hasWeapons).toBe(true);

      // Verificar Large Knife
      const largeKnife = equipmentArray[1];
      expect(largeKnife.name).toBe('Large Knife');
      expect(largeKnife.hasWeapons).toBe(true);
      expect(largeKnife.weapons).toHaveLength(3);
    });

    it('deve parsear lista de other_equipment corretamente', () => {
      // Arrange - usar dados reais do character.gcs
      const otherEquipmentList = fixtureOtherEquipmentData;

      // Act
      const result = parser.parseEquipmentList(otherEquipmentList);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Array);
      const equipmentArray = result.data as Equipment[];
      expect(equipmentArray).toHaveLength(1);

      // Verificar Backpack
      const backpack = equipmentArray[0];
      expect(backpack.name).toBe('Backpack');
      expect(backpack.isContainer).toBe(true);
      expect(backpack.children).toHaveLength(2);
    });

    it('deve retornar array vazio para lista vazia', () => {
      // Arrange
      const emptyList: any[] = [];

      // Act
      const result = parser.parseEquipmentList(emptyList);

      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeInstanceOf(Array);
      const equipmentArray = result.data as Equipment[];
      expect(equipmentArray).toHaveLength(0);
    });

    it('deve lidar com lista contendo itens malformados', () => {
      // Arrange
      const mixedList = [
        {
          id: 'valid-item',
          description: 'Valid Item',
          quantity: 1,
          calc: {
            value: 10,
            extended_value: 10,
            weight: '1 lb',
            extended_weight: '1 lb',
          },
        },
        {
          // Item sem id
          description: 'Invalid Item',
          quantity: 1,
        },
      ];

      // Act
      const result = parser.parseEquipmentList(mixedList);

      // Assert
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Campo obrigatório ausente: id');
      expect(result.data).toBeNull();
    });
  });

  describe('integração com dados reais', () => {
    it('deve parsear todo equipment do character.gcs sem erros', () => {
      // Arrange
      const equipmentList = fixtureEquipmentData;

      // Act
      const result = parser.parseEquipmentList(equipmentList);

      // Assert
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
      const equipmentArray = result.data as Equipment[];
      expect(equipmentArray.length).toBeGreaterThan(0);

      // Verificar que todos os itens têm IDs únicos
      const ids = equipmentArray.map(eq => eq.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('deve parsear todo other_equipment do character.gcs sem erros', () => {
      // Arrange
      const otherEquipmentList = fixtureOtherEquipmentData;

      // Act
      const result = parser.parseEquipmentList(otherEquipmentList);

      // Assert
      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);
      const equipmentArray = result.data as Equipment[];
      expect(equipmentArray.length).toBeGreaterThan(0);

      // Verificar que containers têm children
      const containers = equipmentArray.filter(eq => eq.isContainer);
      containers.forEach(container => {
        expect(container.children!.length).toBeGreaterThan(0);
      });
    });
  });
});
