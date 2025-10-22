/**
 * TypeGuard para validar objetos Trait
 * Responsabilidade: Verificar se um objeto é um Trait válido com validação profunda
 *
 * Regras de validação:
 * - Deve ser um objeto não nulo
 * - id: string obrigatória, não vazia
 * - name: string obrigatória, não vazia
 * - cost: number obrigatório
 * - description: string opcional (se presente, não pode ser vazia)
 * - Propriedades extras são permitidas (não invalidam)
 */

import { Trait } from '../models/Trait';

/**
 * Valida se um objeto é um Trait válido
 * @param obj Objeto a ser validado
 * @returns true se obj for um Trait válido
 */
export function isTrait(obj: unknown): obj is Trait {
  // Verifica se é um objeto não nulo
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return false;
  }

  const trait = obj as Record<string, unknown>;

  // Verifica campos obrigatórios
  if (!('id' in trait) || !('name' in trait) || !('cost' in trait)) {
    return false;
  }

  // Valida id
  if (typeof trait.id !== 'string' || trait.id.trim().length === 0) {
    return false;
  }

  // Valida name
  if (typeof trait.name !== 'string' || trait.name.trim().length === 0) {
    return false;
  }

  // Valida cost
  if (typeof trait.cost !== 'number') {
    return false;
  }

  // Valida description se presente
  if ('description' in trait) {
    if (
      trait.description !== undefined &&
      (typeof trait.description !== 'string' ||
        trait.description.trim().length === 0)
    ) {
      return false;
    }
  }

  return true;
}
