/**
 * TypeGuard para validar objetos Trait
 * Responsabilidade: Verificar se um objeto é um Trait válido com validação profunda
 *
 * Regras de validação:
 * - Deve ser um objeto não nulo
 * - id: string obrigatória, não vazia
 * - name: string obrigatória, não vazia
 * - basePoints: number obrigatório
 * - calc: objeto com points: number obrigatório
 * - tags: array de strings obrigatório
 * - description: string opcional (se presente, não pode ser vazia)
 * - reference: string opcional
 * - replacements: objeto opcional
 * - localNotes: string opcional
 * - canLevel: boolean opcional
 * - pointsPerLevel: number opcional
 * - levels: number opcional
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
  if (!('id' in trait) || !('name' in trait) || !('calc' in trait)) {
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

  // Valida basePoints se presente
  if (
    'basePoints' in trait &&
    trait.basePoints !== undefined &&
    typeof trait.basePoints !== 'number'
  ) {
    return false;
  }

  // Valida calc
  if (
    typeof trait.calc !== 'object' ||
    trait.calc === null ||
    !('points' in trait.calc) ||
    typeof trait.calc.points !== 'number'
  ) {
    return false;
  }

  // Valida tags se presente
  if ('tags' in trait && trait.tags !== undefined) {
    if (
      !Array.isArray(trait.tags) ||
      !trait.tags.every(tag => typeof tag === 'string')
    ) {
      return false;
    }
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

  // Valida reference se presente
  if ('reference' in trait) {
    if (trait.reference !== undefined && typeof trait.reference !== 'string') {
      return false;
    }
  }

  // Valida replacements se presente
  if ('replacements' in trait) {
    if (
      trait.replacements !== undefined &&
      (typeof trait.replacements !== 'object' || trait.replacements === null)
    ) {
      return false;
    }
  }

  // Valida localNotes se presente
  if ('localNotes' in trait) {
    if (
      trait.localNotes !== undefined &&
      typeof trait.localNotes !== 'string'
    ) {
      return false;
    }
  }

  // Valida canLevel se presente
  if ('canLevel' in trait) {
    if (trait.canLevel !== undefined && typeof trait.canLevel !== 'boolean') {
      return false;
    }
  }

  // Valida pointsPerLevel se presente
  if ('pointsPerLevel' in trait) {
    if (
      trait.pointsPerLevel !== undefined &&
      typeof trait.pointsPerLevel !== 'number'
    ) {
      return false;
    }
  }

  // Valida levels se presente
  if ('levels' in trait) {
    if (trait.levels !== undefined && typeof trait.levels !== 'number') {
      return false;
    }
  }

  return true;
}
