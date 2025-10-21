/**
 * TypeGuard para validar objetos Spell
 * Responsabilidade: Verificar se um objeto é um Spell válido com validação profunda
 *
 * Regras de validação:
 * - Deve ser um objeto não nulo
 * - id: string obrigatória, não vazia
 * - name: string obrigatória, não vazia
 * - level: number obrigatório
 * - college: string obrigatória, não vazia
 * - Propriedades extras são permitidas (não invalidam)
 */

import { Spell } from '../models/Spell';

/**
 * Valida se um objeto é um Spell válido
 * @param obj Objeto a ser validado
 * @returns true se obj for um Spell válido
 */
export function isSpell(obj: unknown): obj is Spell {
  // Verifica se é um objeto não nulo
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return false;
  }

  const spell = obj as Record<string, unknown>;

  // Verifica campos obrigatórios
  if (!('id' in spell) || !('name' in spell) || !('level' in spell) || !('college' in spell)) {
    return false;
  }

  // Valida id
  if (typeof spell.id !== 'string' || spell.id.trim().length === 0) {
    return false;
  }

  // Valida name
  if (typeof spell.name !== 'string' || spell.name.trim().length === 0) {
    return false;
  }

  // Valida level
  if (typeof spell.level !== 'number') {
    return false;
  }

  // Valida college
  if (typeof spell.college !== 'string' || spell.college.trim().length === 0) {
    return false;
  }

  return true;
}