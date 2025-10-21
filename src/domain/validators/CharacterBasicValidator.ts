/**
 * Validador para dados básicos do personagem
 * Responsabilidade: Validar campos essenciais de CharacterBasic
 */

export interface CharacterBasicData {
  version: number;
  id: string;
  totalPoints: number;
  createdDate: string;
  modifiedDate: string;
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export class CharacterBasicValidator {
  /**
   * Valida dados básicos do personagem
   * @param data Dados a serem validados
   * @returns Resultado da validação
   */
  static validate(data: CharacterBasicData): ValidationResult {
    const errors: string[] = [];

    // Validação do campo version
    if (data.version === undefined || data.version === null) {
      errors.push('Campo obrigatório ausente: version');
    } else if (typeof data.version !== 'number') {
      errors.push(
        `Campo version deve ser um número, recebido: ${typeof data.version}`
      );
    } else if (data.version < 0) {
      errors.push(
        `Campo version deve ser um número positivo, recebido: ${data.version}`
      );
    }

    // Validação do campo id
    if (!data.id) {
      errors.push('Campo obrigatório ausente: id');
    } else if (typeof data.id !== 'string') {
      errors.push(`Campo id deve ser uma string, recebido: ${typeof data.id}`);
    } else if (data.id.trim().length === 0) {
      errors.push('Campo id não pode ser uma string vazia');
    }

    // Validação do campo totalPoints
    if (data.totalPoints === undefined || data.totalPoints === null) {
      errors.push('Campo obrigatório ausente: totalPoints');
    } else if (typeof data.totalPoints !== 'number') {
      errors.push(
        `Campo totalPoints deve ser um número, recebido: ${typeof data.totalPoints}`
      );
    } else if (data.totalPoints < 0) {
      errors.push(
        `Campo totalPoints deve ser um número não negativo, recebido: ${data.totalPoints}`
      );
    }

    // Validação do campo createdDate
    if (!data.createdDate) {
      errors.push('Campo obrigatório ausente: createdDate');
    } else if (typeof data.createdDate !== 'string') {
      errors.push(
        `Campo createdDate deve ser uma string, recebido: ${typeof data.createdDate}`
      );
    }

    // Validação do campo modifiedDate
    if (!data.modifiedDate) {
      errors.push('Campo obrigatório ausente: modifiedDate');
    } else if (typeof data.modifiedDate !== 'string') {
      errors.push(
        `Campo modifiedDate deve ser uma string, recebido: ${typeof data.modifiedDate}`
      );
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
