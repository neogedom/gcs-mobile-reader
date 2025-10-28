/**
 * Validador para skills do personagem
 * Responsabilidade: Validar dados de skills do sistema GURPS
 */

export interface SkillData {
  id: string;
  name: string;
  level: number;
  difficulty: string;
  specialization?: string | undefined;
  reference?: string | undefined;
  tags?: string[] | undefined;
  defaults?: unknown[] | undefined;
  techLevel?: string | undefined;
  points?: number | undefined;
  calc: { level: number; rsl?: string };
  defaultedFrom?: unknown | undefined;
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

    // Validação do campo calc
    if (!data.calc) {
      errors.push('Campo obrigatório ausente: calc');
    } else if (typeof data.calc !== 'object' || data.calc === null) {
      errors.push(
        `Campo calc deve ser um objeto, recebido: ${typeof data.calc}`
      );
    } else {
      if (data.calc.level === undefined || data.calc.level === null) {
        errors.push('Campo obrigatório ausente: calc.level');
      } else if (typeof data.calc.level !== 'number') {
        errors.push(
          `Campo calc.level deve ser um número, recebido: ${typeof data.calc.level}`
        );
      }

      if (data.calc.rsl !== undefined && typeof data.calc.rsl !== 'string') {
        errors.push(
          `Campo calc.rsl deve ser uma string, recebido: ${typeof data.calc.rsl}`
        );
      }
    }

    // Validação de campos opcionais
    if (
      data.specialization !== undefined &&
      typeof data.specialization !== 'string'
    ) {
      errors.push(
        `Campo specialization deve ser uma string, recebido: ${typeof data.specialization}`
      );
    }

    if (data.reference !== undefined && typeof data.reference !== 'string') {
      errors.push(
        `Campo reference deve ser uma string, recebido: ${typeof data.reference}`
      );
    }

    if (data.tags !== undefined) {
      if (!Array.isArray(data.tags)) {
        errors.push('Campo tags deve ser array se presente');
      } else {
        const nonStringElements = data.tags.filter(
          tag => typeof tag !== 'string'
        );
        if (nonStringElements.length > 0) {
          errors.push('Todos os elementos de tags devem ser strings');
        }
      }
    }

    if (data.techLevel !== undefined && typeof data.techLevel !== 'string') {
      errors.push(
        `Campo techLevel deve ser uma string, recebido: ${typeof data.techLevel}`
      );
    }

    if (data.points !== undefined && typeof data.points !== 'number') {
      errors.push(
        `Campo points deve ser um número, recebido: ${typeof data.points}`
      );
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
