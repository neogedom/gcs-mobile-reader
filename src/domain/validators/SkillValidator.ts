/**
 * Validador para skills do personagem
 * Responsabilidade: Validar dados de skills do sistema GURPS
 */

export interface SkillData {
  id: string;
  name: string;
  level: number;
  difficulty: string;
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export class SkillValidator {
  /**
   * Valida dados de skill
   * @param data Dados a serem validados
   * @returns Resultado da validação
   */
  static validate(data: SkillData): ValidationResult {
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

    // Validação do campo difficulty
    if (!data.difficulty) {
      errors.push('Campo obrigatório ausente: difficulty');
    } else if (typeof data.difficulty !== 'string') {
      errors.push(
        `Campo difficulty deve ser uma string, recebido: ${typeof data.difficulty}`
      );
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
