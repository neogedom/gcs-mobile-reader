/**
 * Validador para dados de perfil do personagem
 * Responsabilidade: Validar informações pessoais e de aparência
 */

export interface CharacterProfileData {
  name: string;
  playerName: string;
  age?: number;
  birthday?: string;
  eyes?: string;
  hair?: string;
  skin?: string;
  handedness?: string;
  gender?: string;
  height?: number;
  weight?: number;
  techLevel?: number;
  portrait?: string;
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export class CharacterProfileValidator {
  /**
   * Valida dados de perfil do personagem
   * @param data Dados a serem validados
   * @returns Resultado da validação
   */
  static validate(data: CharacterProfileData): ValidationResult {
    const errors: string[] = [];

    // Validação do campo name
    if (!data.name) {
      errors.push('Campo obrigatório ausente: name');
    } else if (typeof data.name !== 'string') {
      errors.push(
        `Campo name deve ser uma string, recebido: ${typeof data.name}`
      );
    } else if (data.name.trim().length === 0) {
      errors.push('Campo name não pode ser uma string vazia');
    }

    // Validação do campo playerName
    if (!data.playerName) {
      errors.push('Campo obrigatório ausente: playerName');
    } else if (typeof data.playerName !== 'string') {
      errors.push(
        `Campo playerName deve ser uma string, recebido: ${typeof data.playerName}`
      );
    } else if (data.playerName.trim().length === 0) {
      errors.push('Campo playerName não pode ser uma string vazia');
    }

    // Validação do campo age
    if (
      data.age !== undefined &&
      (typeof data.age !== 'number' || data.age < 0)
    ) {
      errors.push(
        `Campo age deve ser um número não negativo, recebido: ${data.age} com o tipo ${typeof data.age}`
      );
    }

    // Validação do campo height
    if (
      data.height !== undefined &&
      (typeof data.height !== 'number' || data.height < 0)
    ) {
      errors.push(
        `Campo height deve ser um número não negativo, recebido: ${data.height} com o tipo ${typeof data.height}`
      );
    }

    // Validação do campo weight
    if (
      data.weight !== undefined &&
      (typeof data.weight !== 'number' || data.weight < 0)
    ) {
      errors.push(
        `Campo weight deve ser um número não negativo, recebido: ${data.weight} com o tipo ${typeof data.weight}`
      );
    }

    // Validação do campo techLevel
    if (
      data.techLevel !== undefined &&
      (typeof data.techLevel !== 'number' || data.techLevel < 0)
    ) {
      errors.push(
        `Campo techLevel deve ser um número não negativo, recebido: ${data.techLevel} com o tipo ${typeof data.techLevel}`
      );
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
