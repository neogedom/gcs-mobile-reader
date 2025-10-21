/**
 * Validador para traits do personagem
 * Responsabilidade: Validar dados de traits do sistema GURPS
 */

export interface TraitData {
  id: string;
  name: string;
  cost: number;
  description?: string;
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export class TraitValidator {
  /**
   * Valida dados de trait
   * @param data Dados a serem validados
   * @returns Resultado da validação
   */
  static validate(data: TraitData): ValidationResult {
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

    // Validação do campo cost
    if (data.cost === undefined || data.cost === null) {
      errors.push('Campo obrigatório ausente: cost');
    } else if (typeof data.cost !== 'number') {
      errors.push(
        `Campo cost deve ser um número, recebido: ${typeof data.cost}`
      );
    }

    // Validação do campo description (opcional)
    if (
      data.description !== undefined &&
      typeof data.description !== 'string'
    ) {
      errors.push(
        `Campo description deve ser uma string, recebido: ${typeof data.description}`
      );
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
