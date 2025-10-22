/**
 * TypeGuard para validar objetos Skill
 * Responsabilidade: Verificar se um objeto é um Skill válido com validação profunda
 *
 * Regras de validação:
 * - Deve ser um objeto não nulo
 * - id: string obrigatória, não vazia
 * - name: string obrigatória, não vazia
 * - level: number obrigatório
 * - difficulty: string obrigatória, não vazia
 * - Propriedades extras são permitidas (não invalidam)
 */

import { Skill } from '../models/Skill';

/**
 * Valida se um objeto é um Skill válido
 * @param obj Objeto a ser validado
 * @returns true se obj for um Skill válido
 */
export function isSkill(obj: unknown): obj is Skill {
  // Verifica se é um objeto não nulo
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return false;
  }

  const skill = obj as Record<string, unknown>;

  // Verifica campos obrigatórios
  if (
    !('id' in skill) ||
    !('name' in skill) ||
    !('level' in skill) ||
    !('difficulty' in skill)
  ) {
    return false;
  }

  // Valida id
  if (typeof skill.id !== 'string' || skill.id.trim().length === 0) {
    return false;
  }

  // Valida name
  if (typeof skill.name !== 'string' || skill.name.trim().length === 0) {
    return false;
  }

  // Valida level
  if (typeof skill.level !== 'number') {
    return false;
  }

  // Valida difficulty
  if (
    typeof skill.difficulty !== 'string' ||
    skill.difficulty.trim().length === 0
  ) {
    return false;
  }

  return true;
}
