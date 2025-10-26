/**
 * Validador para traits do personagem
 * Responsabilidade: Validar dados de traits do sistema GURPS
 */

export interface TraitData {
  id: string;
  name: string;
  basePoints?: number | undefined;
  calc: { points: number };
  tags?: string[] | undefined;
  description?: string | undefined;
  reference?: string | undefined;
  replacements?: Record<string, string> | undefined;
  localNotes?: string | undefined;
  prereqs?: unknown | undefined;
  modifiers?: unknown[] | undefined;
  canLevel?: boolean | undefined;
  pointsPerLevel?: number | undefined;
  levels?: number | undefined;
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

    // Validação do campo basePoints (opcional)
    if (data.basePoints !== undefined && typeof data.basePoints !== 'number') {
      errors.push(
        `Campo basePoints deve ser um número, recebido: ${typeof data.basePoints}`
      );
    }

    // Validação do campo calc
    if (!data.calc || typeof data.calc.points !== 'number') {
      errors.push('Campo obrigatório ausente ou inválido: calc.points');
    }

    // Validação do campo tags (opcional)
    if (data.tags !== undefined) {
      if (!Array.isArray(data.tags)) {
        errors.push('Campo tags deve ser array se presente');
      } else if (!data.tags.every(tag => typeof tag === 'string')) {
        errors.push('Todos os elementos de tags devem ser strings');
      }
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

    // Validação do campo reference (opcional)
    if (
      data.reference !== undefined &&
      typeof data.reference !== 'string'
    ) {
      errors.push(
        `Campo reference deve ser uma string, recebido: ${typeof data.reference}`
      );
    }

    // Validação do campo replacements (opcional)
    if (
      data.replacements !== undefined &&
      (typeof data.replacements !== 'object' || data.replacements === null)
    ) {
      errors.push(
        `Campo replacements deve ser um objeto, recebido: ${typeof data.replacements}`
      );
    }

    // Validação do campo localNotes (opcional)
    if (
      data.localNotes !== undefined &&
      typeof data.localNotes !== 'string'
    ) {
      errors.push(
        `Campo localNotes deve ser uma string, recebido: ${typeof data.localNotes}`
      );
    }

    // Validação do campo canLevel (opcional)
    if (
      data.canLevel !== undefined &&
      typeof data.canLevel !== 'boolean'
    ) {
      errors.push(
        `Campo canLevel deve ser um boolean, recebido: ${typeof data.canLevel}`
      );
    }

    // Validação do campo pointsPerLevel (opcional)
    if (
      data.pointsPerLevel !== undefined &&
      typeof data.pointsPerLevel !== 'number'
    ) {
      errors.push(
        `Campo pointsPerLevel deve ser um número, recebido: ${typeof data.pointsPerLevel}`
      );
    }

    // Validação do campo levels (opcional)
    if (
      data.levels !== undefined &&
      typeof data.levels !== 'number'
    ) {
      errors.push(
        `Campo levels deve ser um número, recebido: ${typeof data.levels}`
      );
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
