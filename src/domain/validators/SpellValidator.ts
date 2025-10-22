/**
 * Validador para spells do personagem
 * Responsabilidade: Validar dados de spells do sistema GURPS
 */

export interface SpellData {
  id: string;
  name: string;
  level: number;
  college: string;
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export class SpellValidator {
  /**
   * Valida dados de spell
   * @param data Dados a serem validados
   * @returns Resultado da validação
   */
  static validate(data: SpellData): ValidationResult {
    const errors: string[] = [];

    // Validação do campo id
    if (!data.id) {
      errors.push('Campo obrigatório ausente: id');
    } else if (typeof data.id !== 'string') {
      errors.push(`Campo id deve ser uma string, recebido: ${typeof data.id}`);
    }

    // Validação do campo name
    if (!data.name) {
      errors.push('Campo obrigatório ausente: name');
    } else if (typeof data.name !== 'string') {
      errors.push(
        `Campo name deve ser uma string, recebido: ${typeof data.name}`
      );
    }

    // Validação do campo level
    if (data.level === undefined || data.level === null) {
      errors.push('Campo obrigatório ausente: level');
    } else if (typeof data.level !== 'number') {
      errors.push(
        `Campo level deve ser um número, recebido: ${typeof data.level}`
      );
    }

    // Validação do campo college
    if (!data.college) {
      errors.push('Campo obrigatório ausente: college');
    } else if (typeof data.college !== 'string') {
      errors.push(
        `Campo college deve ser uma string, recebido: ${typeof data.college}`
      );
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
