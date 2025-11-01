import { Weapon } from '../../../../src/domain/models/Weapon';

describe('Weapon', () => {
  // ✅ Testes de criação válida com dados reais GCS
  describe('criação válida com estrutura real GCS', () => {
    it('deve criar Weapon para Assault Carbine com estrutura completa', () => {
      const weaponData = {
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
      };

      const weapon = new Weapon(weaponData);

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
      expect(weapon.defaults).toHaveLength(2);
      expect(weapon.calc?.level).toBe(13);
      expect(weapon.calc?.damage).toBe('4d+2 pi');
    });

    it('deve criar Weapon para Large Knife (Swung) com damage baseado em ST', () => {
      const weaponData = {
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
        defaults: [
          {
            type: 'dx',
            modifier: -4,
          },
          {
            type: 'skill',
            name: 'Knife',
          },
        ],
        calc: {
          level: 13,
          damage: '1d cut',
          parry: '8',
        },
      };

      const weapon = new Weapon(weaponData);

      expect(weapon.id).toBe('wAT01wgErvN347DNo');
      expect(weapon.damage.type).toBe('cut');
      expect(weapon.damage.st).toBe('sw');
      expect(weapon.damage.base).toBe('-2');
      expect(weapon.strength).toBe('6');
      expect(weapon.usage).toBe('Swung');
      expect(weapon.reach).toBe('C,1');
      expect(weapon.parry).toBe('-1');
      expect(weapon.calc?.damage).toBe('1d cut');
      expect(weapon.calc?.parry).toBe('8');
    });

    it('deve criar Weapon para Large Knife (Thrown) com dados de ranged', () => {
      const weaponData = {
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
        defaults: [
          {
            type: 'dx',
            modifier: -4,
          },
          {
            type: 'skill',
            name: 'Thrown Weapon',
            specialization: 'Knife',
          },
        ],
        calc: {
          level: 9,
          damage: '1d-1 imp',
          range: '9/18',
        },
      };

      const weapon = new Weapon(weaponData);

      expect(weapon.id).toBe('WNGxOybMOdUyuWahP');
      expect(weapon.damage.type).toBe('imp');
      expect(weapon.damage.st).toBe('thr');
      expect(weapon.usage).toBe('Thrown');
      expect(weapon.range).toBe('x0.8/x1.5');
      expect(weapon.rateOfFire).toBe('1');
      expect(weapon.shots).toBe('T');
      expect(weapon.bulk).toBe('-2');
      expect(weapon.calc?.range).toBe('9/18');
    });

    it('deve criar Weapon com valores mínimos', () => {
      const weaponData = {
        id: 'minimal-weapon',
        damage: {
          type: 'cr',
          base: '1',
        },
      };

      const weapon = new Weapon(weaponData);

      expect(weapon.id).toBe('minimal-weapon');
      expect(weapon.damage.type).toBe('cr');
      expect(weapon.damage.base).toBe('1');
      expect(weapon.strength).toBeUndefined();
      expect(weapon.accuracy).toBeUndefined();
      expect(weapon.defaults).toEqual([]);
    });
  });

  // ✅ Testes de validação
  describe('validação de dados', () => {
    it('deve lançar erro com ID inválido', () => {
      expect(
        () =>
          new Weapon({
            id: '',
            damage: { type: 'cr', base: '1' },
          } as any)
      ).toThrow();
    });

    it('deve lançar erro com damage type inválido', () => {
      expect(
        () =>
          new Weapon({
            id: 'test-weapon',
            damage: { type: '', base: '1' },
          } as any)
      ).toThrow();
    });

    it('deve aceitar campos opcionais ausentes', () => {
      const weapon = new Weapon({
        id: 'test-weapon',
        damage: { type: 'cr', base: '1' },
      });

      expect(weapon.strength).toBeUndefined();
      expect(weapon.accuracy).toBeUndefined();
      expect(weapon.range).toBeUndefined();
      expect(weapon.calc).toBeUndefined();
    });
  });

  // ✅ Testes de tipos de damage
  describe('tipos de damage', () => {
    it('deve identificar damage type corretamente', () => {
      const piercingWeapon = new Weapon({
        id: 'piercing',
        damage: { type: 'pi', base: '4d+2' },
      });

      const cuttingWeapon = new Weapon({
        id: 'cutting',
        damage: { type: 'cut', st: 'sw', base: '-2' },
      });

      const crushingWeapon = new Weapon({
        id: 'crushing',
        damage: { type: 'cr', base: '1d' },
      });

      expect(piercingWeapon.damage.type).toBe('pi');
      expect(cuttingWeapon.damage.type).toBe('cut');
      expect(crushingWeapon.damage.type).toBe('cr');
    });

    it('deve identificar damage baseado em ST vs base fixo', () => {
      const stBased = new Weapon({
        id: 'st-based',
        damage: { type: 'cut', st: 'sw', base: '-2' },
      });

      const fixed = new Weapon({
        id: 'fixed',
        damage: { type: 'pi', base: '4d+2' },
      });

      expect(stBased.damage.st).toBe('sw');
      expect(stBased.damage.base).toBe('-2');
      expect(fixed.damage.st).toBeUndefined();
      expect(fixed.damage.base).toBe('4d+2');
    });
  });

  // ✅ Testes de cálculo
  describe('cálculos e propriedades derivadas', () => {
    it('deve calcular reach para melee weapons', () => {
      const meleeWeapon = new Weapon({
        id: 'melee',
        damage: { type: 'cut', st: 'sw', base: '-2' },
        reach: 'C,1,2',
      });

      expect(meleeWeapon.reach).toBe('C,1,2');
    });

    it('deve identificar bulk para ranged weapons', () => {
      const rangedWeapon = new Weapon({
        id: 'ranged',
        damage: { type: 'pi', base: '4d+2' },
        bulk: '-4',
      });

      expect(rangedWeapon.bulk).toBe('-4');
    });

    it('deve armazenar dados de recoil', () => {
      const recoilWeapon = new Weapon({
        id: 'recoil',
        damage: { type: 'pi', base: '4d+2' },
        recoil: '2',
      });

      expect(recoilWeapon.recoil).toBe('2');
    });
  });

  // ✅ Testes de weapons defaults
  describe('weapons defaults (para skills)', () => {
    it('deve armazenar defaults com type skill', () => {
      const weapon = new Weapon({
        id: 'test',
        damage: { type: 'cr', base: '1' },
        defaults: [
          {
            type: 'skill',
            name: 'Guns',
            specialization: 'Rifle',
          },
          {
            type: 'skill',
            name: 'Guns',
            modifier: -2,
          },
        ],
      });

      expect(weapon.defaults).toHaveLength(2);
      expect(weapon.defaults[0].type).toBe('skill');
      expect(weapon.defaults[0].name).toBe('Guns');
      expect(weapon.defaults[0].specialization).toBe('Rifle');
      expect(weapon.defaults[1].name).toBe('Guns');
      expect(weapon.defaults[1].modifier).toBe(-2);
    });

    it('deve armazenar defaults com type attribute', () => {
      const weapon = new Weapon({
        id: 'test',
        damage: { type: 'cr', base: '1' },
        defaults: [
          {
            type: 'dx',
            modifier: -4,
          },
          {
            type: 'iq',
            modifier: -5,
          },
        ],
      });

      expect(weapon.defaults[0].type).toBe('dx');
      expect(weapon.defaults[0].modifier).toBe(-4);
      expect(weapon.defaults[1].type).toBe('iq');
      expect(weapon.defaults[1].modifier).toBe(-5);
    });
  });

  // ✅ Testes de calc fields
  describe('campos calc (dados calculados)', () => {
    it('deve armazenar level calculado', () => {
      const weapon = new Weapon({
        id: 'test',
        damage: { type: 'cr', base: '1' },
        calc: {
          level: 13,
        },
      });

      expect(weapon.calc?.level).toBe(13);
    });

    it('deve armazenar damage formatado', () => {
      const weapon = new Weapon({
        id: 'test',
        damage: { type: 'pi', base: '4d+2' },
        calc: {
          damage: '4d+2 pi',
        },
      });

      expect(weapon.calc?.damage).toBe('4d+2 pi');
    });

    it('deve armazenar parry para melee weapons', () => {
      const weapon = new Weapon({
        id: 'test',
        damage: { type: 'cut', st: 'sw', base: '-2' },
        calc: {
          parry: '8',
        },
      });

      expect(weapon.calc?.parry).toBe('8');
    });
  });

  // ✅ Testes de diferentes usage types
  describe('tipos de usage', () => {
    it('deve identificar Swung (melee)', () => {
      const weapon = new Weapon({
        id: 'swung',
        damage: { type: 'cut', st: 'sw', base: '-2' },
        usage: 'Swung',
      });

      expect(weapon.usage).toBe('Swung');
    });

    it('deve identificar Thrust (melee)', () => {
      const weapon = new Weapon({
        id: 'thrust',
        damage: { type: 'imp', st: 'thr' },
        usage: 'Thrust',
      });

      expect(weapon.usage).toBe('Thrust');
    });

    it('deve identificar Thrown (ranged)', () => {
      const weapon = new Weapon({
        id: 'thrown',
        damage: { type: 'imp', st: 'thr' },
        usage: 'Thrown',
      });

      expect(weapon.usage).toBe('Thrown');
    });
  });

  // ✅ Testes de equalidade
  describe('comparação de weapons', () => {
    it('deve identificar weapons iguais', () => {
      const weapon1 = new Weapon({
        id: 'same-weapon',
        damage: { type: 'cr', base: '1' },
      });

      const weapon2 = new Weapon({
        id: 'same-weapon',
        damage: { type: 'cr', base: '1' },
      });

      expect(weapon1.equals(weapon2)).toBe(true);
    });

    it('deve identificar weapons diferentes', () => {
      const weapon1 = new Weapon({
        id: 'weapon1',
        damage: { type: 'cr', base: '1' },
      });

      const weapon2 = new Weapon({
        id: 'weapon2',
        damage: { type: 'pi', base: '1d' },
      });

      expect(weapon1.equals(weapon2)).toBe(false);
    });
  });

  // ✅ Testes de toString
  describe('representação em string', () => {
    it('deve gerar string para ranged weapon', () => {
      const weapon = new Weapon({
        id: 'assault-carbine',
        damage: { type: 'pi', base: '4d+2' },
        strength: '9†',
        calc: { damage: '4d+2 pi' },
      });

      expect(weapon.toString()).toBe(
        'Weapon{assault-carbine, 4d+2 pi (ST: 9†)}'
      );
    });

    it('deve gerar string para melee weapon', () => {
      const weapon = new Weapon({
        id: 'large-knife',
        damage: { type: 'cut', st: 'sw', base: '-2' },
        calc: { damage: '1d cut' },
        strength: '6',
      });

      expect(weapon.toString()).toBe('Weapon{large-knife, 1d cut (ST: 6)}');
    });

    it('deve gerar string básica sem dados opcionais', () => {
      const weapon = new Weapon({
        id: 'basic-weapon',
        damage: { type: 'cr', base: '1' },
      });

      expect(weapon.toString()).toBe('Weapon{basic-weapon, 1 cr}');
    });
  });

  // ✅ Testes de casos extremos
  describe('casos extremos', () => {
    it('deve lidar com damage types incomuns', () => {
      const uncommonTypes = ['burn', 'tox', 'cor', 'spec'];

      uncommonTypes.forEach(type => {
        const weapon = new Weapon({
          id: `uncommon-${type}`,
          damage: { type, base: '1' },
        });

        expect(weapon.damage.type).toBe(type);
      });
    });

    it('deve lidar com strength notation complexa', () => {
      const weapon = new Weapon({
        id: 'complex-st',
        damage: { type: 'pi', base: '4d+2' },
        strength: '9†', // com nota
      });

      expect(weapon.strength).toBe('9†');
    });

    it('deve lidar com range notation complexa', () => {
      const weapon = new Weapon({
        id: 'complex-range',
        damage: { type: 'pi', base: '4d+2' },
        range: '750/2,900',
      });

      expect(weapon.range).toBe('750/2,900');
    });

    it('deve lidar com shots notation complexa', () => {
      const weapon = new Weapon({
        id: 'complex-shots',
        damage: { type: 'pi', base: '4d+2' },
        shots: '30+1(3)',
      });

      expect(weapon.shots).toBe('30+1(3)');
    });
  });
});
