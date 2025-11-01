/**
 * Modelo para weapons do sistema GURPS
 * Responsabilidade: Weapons individuais (armas, facas, etc.) com estruturas complexas
 *
 * Este modelo representa weapons com todas as propriedades observadas
 * na estrutura real GCS, incluindo damage, strength, accuracy, range, etc.
 */

export interface WeaponDamage {
  /** Tipo de damage (pi, cut, cr, imp, burn, tox, cor, spec) */
  type: string;

  /** Base damage - pode ser valor fixo ou expressão (ex: "4d+2") */
  base?: string;

  /** ST-based damage - tipo de ST (sw, thr) - opcional */
  st?: string;
}

export interface WeaponDefault {
  /** Tipo do default (skill, dx, iq, etc.) */
  type: string;

  /** Nome da skill (se type = skill) */
  name?: string;

  /** Especialização da skill (se aplicável) */
  specialization?: string;

  /** Modificador do default */
  modifier?: number;
}

export interface WeaponCalc {
  /** Level calculado da weapon */
  level?: number;

  /** Damage formatado (ex: "4d+2 pi") */
  damage?: string;

  /** Parry calculado (para melee weapons) */
  parry?: string;

  /** Range calculado (para ranged weapons) */
  range?: string;
}

export class Weapon {
  /** Identificador único da weapon */
  public readonly id: string;

  /** Dados do damage */
  public readonly damage: WeaponDamage;

  /** Strength requerida */
  public readonly strength?: string | undefined;

  /** Accuracy (para ranged weapons) */
  public readonly accuracy?: string | undefined;

  /** Range (para ranged weapons) */
  public readonly range?: string | undefined;

  /** Rate of fire (para ranged weapons) */
  public readonly rateOfFire?: string | undefined;

  /** Shots (munição/tiros) */
  public readonly shots?: string | undefined;

  /** Bulk (penalidade de transporte) */
  public readonly bulk?: string | undefined;

  /** Recoil (recuo) */
  public readonly recoil?: string | undefined;

  /** Usage type (Swung, Thrust, Thrown) */
  public readonly usage?: string | undefined;

  /** Reach (alcance para melee weapons) */
  public readonly reach?: string | undefined;

  /** Parry (para melee weapons) */
  public readonly parry?: string | undefined;

  /** Defaults para cálculo de level */
  public readonly defaults: WeaponDefault[];

  /** Dados calculados */
  public readonly calc?: WeaponCalc | undefined;

  /**
   * Cria uma nova instância de Weapon
   * @param data Dados da weapon
   * @throws Error quando campos obrigatórios estão ausentes ou inválidos
   */
  constructor(data: {
    id: string;
    damage: WeaponDamage;
    strength?: string;
    accuracy?: string;
    range?: string;
    rateOfFire?: string;
    shots?: string;
    bulk?: string;
    recoil?: string;
    usage?: string;
    reach?: string;
    parry?: string;
    defaults?: WeaponDefault[];
    calc?: WeaponCalc;
  }) {
    const result = this.validate(data);

    if (!result.success) {
      throw new Error(
        `Erros de validação na weapon:\n${result.errors.join('\n')}`
      );
    }

    this.id = data.id;
    this.damage = data.damage;
    this.strength = data.strength;
    this.accuracy = data.accuracy;
    this.range = data.range;
    this.rateOfFire = data.rateOfFire;
    this.shots = data.shots;
    this.bulk = data.bulk;
    this.recoil = data.recoil;
    this.usage = data.usage;
    this.reach = data.reach;
    this.parry = data.parry;
    this.defaults = data.defaults ?? [];
    this.calc = data.calc;

    Object.freeze(this);
  }

  /**
   * Identifica se a weapon é melee
   * @returns true se for melee weapon
   */
  get isMelee(): boolean {
    return this.usage === 'Swung' || this.usage === 'Thrust';
  }

  /**
   * Identifica se a weapon é ranged
   * @returns true se for ranged weapon
   */
  get isRanged(): boolean {
    return this.usage === 'Thrown' || !!this.range;
  }

  /**
   * Identifica se a weapon é baseada em ST
   * @returns true se o damage é baseado em ST
   */
  get isSTBased(): boolean {
    return !!this.damage.st;
  }

  /**
   * Verifica se duas weapons são iguais
   * @param other Outra Weapon para comparar
   * @returns true se forem iguais
   */
  equals(other: Weapon): boolean {
    if (!other) return false;

    return (
      this.id === other.id &&
      this.damage.type === other.damage.type &&
      this.damage.base === other.damage.base &&
      this.damage.st === other.damage.st &&
      this.strength === other.strength &&
      this.accuracy === other.accuracy &&
      this.range === other.range &&
      this.rateOfFire === other.rateOfFire &&
      this.shots === other.shots &&
      this.bulk === other.bulk &&
      this.recoil === other.recoil &&
      this.usage === other.usage &&
      this.reach === other.reach &&
      this.parry === other.parry &&
      this.defaults.length === other.defaults.length &&
      this.defaults.every((defaultItem, index) => {
        const otherDefault = other.defaults[index];
        return (
          defaultItem.type === otherDefault.type &&
          defaultItem.name === otherDefault.name &&
          defaultItem.specialization === otherDefault.specialization &&
          defaultItem.modifier === otherDefault.modifier
        );
      })
    );
  }

  /**
   * Retorna uma representação em string da weapon
   * @returns String formatada com os dados principais
   */
  toString(): string {
    const damageStr =
      this.calc?.damage ||
      (this.damage.st
        ? `${this.damage.base} ${this.damage.type} (ST: ${this.damage.st}${this.damage.st === 'sw' ? '-' : ''})`
        : `${this.damage.base} ${this.damage.type}`);

    const strengthStr = this.strength ? ` (ST: ${this.strength})` : '';

    return `Weapon{${this.id}, ${damageStr}${strengthStr}}`;
  }

  private validate(data: {
    id: string;
    damage: WeaponDamage;
    strength?: string;
    accuracy?: string;
    range?: string;
    rateOfFire?: string;
    shots?: string;
    bulk?: string;
    recoil?: string;
    usage?: string;
    reach?: string;
    parry?: string;
    defaults?: WeaponDefault[];
    calc?: WeaponCalc;
  }): { success: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validação do campo id
    if (!data.id) {
      errors.push('Campo obrigatório ausente: id');
    } else if (typeof data.id !== 'string') {
      errors.push(`Campo id deve ser uma string, recebido: ${typeof data.id}`);
    } else if (data.id.trim().length === 0) {
      errors.push('Campo id não pode ser uma string vazia');
    }

    // Validação do campo damage
    if (!data.damage) {
      errors.push('Campo obrigatório ausente: damage');
    } else if (typeof data.damage !== 'object') {
      errors.push(
        `Campo damage deve ser um objeto, recebido: ${typeof data.damage}`
      );
    } else {
      if (!data.damage.type) {
        errors.push('Campo damage.type é obrigatório');
      } else if (typeof data.damage.type !== 'string') {
        errors.push(
          `Campo damage.type deve ser uma string, recebido: ${typeof data.damage.type}`
        );
      }

      if (data.damage.base && typeof data.damage.base !== 'string') {
        errors.push(
          `Campo damage.base deve ser uma string, recebido: ${typeof data.damage.base}`
        );
      }

      if (data.damage.st && typeof data.damage.st !== 'string') {
        errors.push(
          `Campo damage.st deve ser uma string, recebido: ${typeof data.damage.st}`
        );
      }
    }

    // Validação do campo defaults
    if (data.defaults !== undefined) {
      if (!Array.isArray(data.defaults)) {
        errors.push(
          `Campo defaults deve ser um array, recebido: ${typeof data.defaults}`
        );
      } else {
        for (let i = 0; i < data.defaults.length; i++) {
          const def = data.defaults[i];
          if (!def.type) {
            errors.push(`Campo defaults[${i}].type é obrigatório`);
          }
          if (def.type === 'skill' && !def.name) {
            errors.push(
              `Campo defaults[${i}].name é obrigatório quando type = skill`
            );
          }
          if (def.modifier !== undefined && typeof def.modifier !== 'number') {
            errors.push(
              `Campo defaults[${i}].modifier deve ser um número, recebido: ${typeof def.modifier}`
            );
          }
        }
      }
    }

    // Validação dos campos opcionais
    const optionalStringFields = [
      'strength',
      'accuracy',
      'range',
      'rateOfFire',
      'shots',
      'bulk',
      'recoil',
      'usage',
      'reach',
      'parry',
    ];

    for (const field of optionalStringFields) {
      if (
        data[field as keyof typeof data] !== undefined &&
        typeof data[field as keyof typeof data] !== 'string'
      ) {
        errors.push(
          `Campo ${field} deve ser uma string, recebido: ${typeof data[field as keyof typeof data]}`
        );
      }
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
