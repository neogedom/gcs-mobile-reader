/**
 * TypeGuard para validar objetos Character
 * Responsabilidade: Verificar se um objeto é um Character válido com validação profunda
 *
 * Regras de validação:
 * - Deve ser um objeto não nulo
 * - Deve ter propriedade 'basic' que é um CharacterBasic válido
 * - Deve ter propriedade 'profile' que é um CharacterProfile válido
 * - Deve ter propriedade 'attributes' que é um CharacterAttributes válido
 * - Propriedades extras são permitidas (não invalidam)
 */

import { Character } from '../models/Character';
import { CharacterBasic } from '../models/CharacterBasic';
import { CharacterProfile } from '../models/CharacterProfile';
import { CharacterAttributes } from '../models/CharacterAttributes';

/**
 * Valida se um objeto é um Character válido
 * @param obj Objeto a ser validado
 * @returns true se obj for um Character válido
 */
export function isCharacter(obj: unknown): obj is Character {
  // Verifica se é um objeto não nulo
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return false;
  }

  const character = obj as Record<string, unknown>;

  // Verifica se tem as propriedades obrigatórias
  if (!('basic' in character) || !('profile' in character) || !('attributes' in character)) {
    return false;
  }

  // Valida cada componente
  if (!(character.basic instanceof CharacterBasic)) {
    return false;
  }

  if (!(character.profile instanceof CharacterProfile)) {
    return false;
  }

  if (!(character.attributes instanceof CharacterAttributes)) {
    return false;
  }

  return true;
}