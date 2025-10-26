/**
 * Validador para atributos do personagem
 * Responsabilidade: Validar atributos básicos e derivados do sistema GURPS
 */

export interface CharacterAttributesData {
  st: number;
  dx: number;
  iq: number;
  ht: number;
  will?: number;
  per?: number;
  basicSpeed?: number;
  basicMove?: number;
  hitPoints?: number;
  fatiguePoints?: number;
  magicPoints?: number;
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export class CharacterAttributesValidator {
  /**
   * Valida dados de atributos do personagem
   * @param data Dados a serem validados
   * @returns Resultado da validação
   */
  static validate(data: CharacterAttributesData): ValidationResult {
    const errors: string[] = [];

    // Validação dos atributos básicos (ST, DX, IQ, HT)
    const basicAttributes = [
      { name: 'st', value: data.st },
      { name: 'dx', value: data.dx },
      { name: 'iq', value: data.iq },
      { name: 'ht', value: data.ht },
    ];

    for (const attr of basicAttributes) {
      if (attr.value === undefined || attr.value === null) {
        errors.push(`Campo obrigatório ausente: ${attr.name}`);
      } else if (typeof attr.value !== 'number' || isNaN(attr.value) || !isFinite(attr.value)) {
        errors.push(
          `Campo ${attr.name} deve ser um número válido, recebido ${attr.value} no tipo: ${typeof attr.value}`
        );
      } else if (attr.value < 1) {
        errors.push(
          `Campo ${attr.name} deve ser maior que 0, recebido: ${attr.value}`
        );
      }
    }

    // Validação dos atributos secundários (WILL, PER)
    if (
      data.will !== undefined &&
      (typeof data.will !== 'number' || isNaN(data.will) || !isFinite(data.will) || data.will < 1)
    ) {
      errors.push(
        `Campo will deve ser um número maior que 0, recebido: ${data.will} com o tipo ${typeof data.will}`
      );
    }

    if (
      data.per !== undefined &&
      (typeof data.per !== 'number' || isNaN(data.per) || !isFinite(data.per) || data.per < 1)
    ) {
      errors.push(
        `Campo per deve ser um número maior que 0, recebido: ${data.per} com o tipo ${typeof data.per}`
      );
    }

    // Validação dos atributos derivados
    if (
      data.basicSpeed !== undefined &&
      (typeof data.basicSpeed !== 'number' || isNaN(data.basicSpeed) || !isFinite(data.basicSpeed) || data.basicSpeed <= 0)
    ) {
      errors.push(
        `Campo basicSpeed deve ser um número positivo, recebido: ${data.basicSpeed}`
      );
    }

    if (
      data.basicMove !== undefined &&
      (typeof data.basicMove !== 'number' || isNaN(data.basicMove) || !isFinite(data.basicMove) || data.basicMove < 0)
    ) {
      errors.push(
        `Campo basicMove deve ser um número não negativo, recebido: ${data.basicMove}`
      );
    }

    if (
      data.hitPoints !== undefined &&
      (typeof data.hitPoints !== 'number' || isNaN(data.hitPoints) || !isFinite(data.hitPoints))
    ) {
      errors.push(
        `Campo hitPoints deve ser um número, recebido: ${data.hitPoints}`
      );
    }

    if (
      data.fatiguePoints !== undefined &&
      (typeof data.fatiguePoints !== 'number' || isNaN(data.fatiguePoints) || !isFinite(data.fatiguePoints) || data.fatiguePoints < 1)
    ) {
      errors.push(
        `Campo fatiguePoints deve ser um número maior que 0, recebido: ${data.fatiguePoints}`
      );
    }

    if (
      data.magicPoints !== undefined &&
      (typeof data.magicPoints !== 'number' || isNaN(data.magicPoints) || !isFinite(data.magicPoints) || data.magicPoints < 0)
    ) {
      errors.push(
        `Campo magicPoints deve ser um número não negativo, recebido: ${data.magicPoints}`
      );
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
