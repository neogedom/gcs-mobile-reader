/**
 * Parser para equipamentos GCS baseado na estrutura real observada
 * Responsabilidade: Parsear equipment e other_equipment do formato GCS
 *
 * Estrutura Real GCS Observada:
 * - "equipment": Equipamentos individuais com weapons[] e children[] array
 * - "other_equipment": Containers com weapons[] e children[] array
 *
 * Campos essenciais: id, description, quantity, equipped, calc, source, base_value, base_weight
 * Weapons: structures detalhadas (damage.type, damage.base, strength, accuracy, range, etc.)
 * Children: estrutura simples similar ao equipment básico
 */

import { Equipment, EquipmentCalc } from '../../domain/models/Equipment';
import { Weapon } from '../../domain/models/Weapon';
import { ParseResult } from '../../domain/types/ParseResult';

export class EquipmentParser {
  /**
   * Parseia um único equipamento do formato GCS
   * @param rawEquipment Dados brutos do equipamento GCS
   * @returns Resultado do parsing com Equipment ou erros
   */
  parseEquipment(rawEquipment: any): ParseResult<Equipment> {
    try {
      const errors: string[] = [];

      // Validação básica dos campos obrigatórios
      if (!rawEquipment.id) {
        errors.push('Campo obrigatório ausente: id');
      }
      if (!rawEquipment.description) {
        errors.push('Campo obrigatório ausente: description');
      }

      if (errors.length > 0) {
        return {
          success: false,
          data: null,
          errors,
        };
      }

      // Parsear weapons se presentes
      let weapons: Weapon[] | undefined;
      if (rawEquipment.weapons && Array.isArray(rawEquipment.weapons)) {
        weapons = [];
        for (const rawWeapon of rawEquipment.weapons) {
          try {
            const weapon = this.parseWeapon(rawWeapon);
            weapons.push(weapon);
          } catch (error) {
            errors.push(
              `Erro ao parsear weapon: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
            );
          }
        }
      }

      // Parsear children recursivamente se presentes
      let children: Equipment[] | undefined;
      if (rawEquipment.children && Array.isArray(rawEquipment.children)) {
        children = [];
        for (const rawChild of rawEquipment.children) {
          const childResult = this.parseEquipment(rawChild);
          if (childResult.success) {
            children.push(childResult.data as Equipment);
          } else {
            errors.push(
              ...childResult.errors.map(err => `Erro no child: ${err}`)
            );
          }
        }
      }

      if (errors.length > 0) {
        return {
          success: false,
          data: null,
          errors,
        };
      }

      // Mapear calc.extended_value/extended_weight para valores finais
      const calc: EquipmentCalc | undefined = rawEquipment.calc
        ? {
            extended_value: rawEquipment.calc.extended_value,
            extended_weight: rawEquipment.calc.extended_weight as string,
          }
        : undefined;

      // Calcular isContainer automaticamente: children?.length > 0 (removido pois não é usado)

      // Criar Equipment
      const equipment = new Equipment({
        id: rawEquipment.id,
        name: rawEquipment.description,
        quantity: rawEquipment.quantity || 1,
        weight: this.parseWeight(
          rawEquipment.calc?.extended_weight || rawEquipment.base_weight
        ),
        cost: rawEquipment.calc?.extended_value || rawEquipment.base_value || 0,
        children: children || [],
        weapons: weapons || [],
        ...(calc ? { calc } : {}),
        description: rawEquipment.description,
        ...(rawEquipment.tech_level !== undefined ? { techLevel: parseInt(rawEquipment.tech_level, 10) } : {}),
        legalityClass: rawEquipment.legality_class,
        notes: rawEquipment.local_notes,
      });

      return {
        success: true,
        data: equipment,
        errors: [],
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: [
          `Erro inesperado ao parsear equipamento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        ],
      };
    }
  }

  /**
   * Parseia uma lista de equipamentos do formato GCS
   * @param rawEquipmentList Lista de equipamentos brutos GCS
   * @returns Resultado do parsing com array de Equipment ou erros
   */
  parseEquipmentList(rawEquipmentList: any[]): ParseResult<Equipment[]> {
    try {
      const errors: string[] = [];
      const equipmentList: Equipment[] = [];

      if (!Array.isArray(rawEquipmentList)) {
        return {
          success: false,
          data: null,
          errors: ['Lista de equipamentos deve ser um array'],
        };
      }

      for (const rawEquipment of rawEquipmentList) {
        const result = this.parseEquipment(rawEquipment);
        if (result.success) {
          equipmentList.push(result.data as Equipment);
        } else {
          errors.push(...result.errors);
        }
      }

      if (errors.length > 0) {
        return {
          success: false,
          data: null,
          errors,
        };
      }

      return {
        success: true,
        data: equipmentList,
        errors: [],
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: [
          `Erro inesperado ao parsear lista de equipamentos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        ],
      };
    }
  }

  /**
   * Parseia uma weapon do formato GCS
   * @param rawWeapon Dados brutos da weapon GCS
   * @returns Weapon parseada
   * @throws Error se dados inválidos
   */
  private parseWeapon(rawWeapon: Record<string, unknown>): Weapon {
    // Mapear defaults
    const defaults =
      (rawWeapon.defaults as any[])?.map((def: Record<string, unknown>) => ({
        type: def.type as string,
        name: def.name as string,
        specialization: def.specialization as string,
        modifier: def.modifier as number,
      })) || [];

    // Mapear damage
    const damage = {
      type: (rawWeapon.damage as any)?.type || 'unk',
      base: (rawWeapon.damage as any)?.base,
      st: (rawWeapon.damage as any)?.st,
    };

    // Mapear calc se presente
    const calc = rawWeapon.calc
      ? {
          level: (rawWeapon.calc as any).level,
          damage: (rawWeapon.calc as any).damage,
          parry: (rawWeapon.calc as any).parry,
          range: (rawWeapon.calc as any).range,
        }
      : undefined;

    return new Weapon({
      id: rawWeapon.id as string,
      damage: damage,
      strength: rawWeapon.strength as string,
      accuracy: rawWeapon.accuracy as string,
      range: rawWeapon.range as string,
      rateOfFire: rawWeapon.rate_of_fire as string,
      shots: rawWeapon.shots as string,
      bulk: rawWeapon.bulk as string,
      recoil: rawWeapon.recoil as string,
      usage: rawWeapon.usage as string,
      reach: rawWeapon.reach as string,
      parry: rawWeapon.parry as string,
      defaults: defaults,
      ...(calc ? { calc } : {}),
    });
  }

  /**
   * Converte string de peso para número
   * @param weightStr String de peso (ex: "7.3 lb")
   * @returns Peso em libras como número
   */
  private parseWeight(weightStr?: string): number {
    if (!weightStr) return 0;

    // Extrair número da string (ex: "7.3 lb" -> 7.3)
    const match = weightStr.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  }
}
