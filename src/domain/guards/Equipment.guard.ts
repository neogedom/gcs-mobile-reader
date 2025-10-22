/**
 * TypeGuard para validar objetos Equipment
 * Responsabilidade: Verificar se um objeto é um Equipment válido com validação profunda
 *
 * Regras de validação:
 * - Deve ser um objeto não nulo
 * - id: string obrigatória, não vazia
 * - name: string obrigatória, não vazia
 * - quantity: number opcional, se presente deve ser > 0
 * - weight: number opcional, se presente deve ser >= 0
 * - cost: number opcional, se presente deve ser >= 0
 * - techLevel: number opcional, se presente deve ser >= 0
 * - children: array opcional, se presente todos os itens devem ser Equipment válidos
 * - description, legalityClass, notes, category: strings opcionais
 * - Propriedades extras são permitidas (não invalidam)
 */

import { Equipment } from '../models/Equipment';

/**
 * Valida se um objeto é um Equipment válido
 * @param obj Objeto a ser validado
 * @returns true se obj for um Equipment válido
 */
export function isEquipment(obj: unknown): obj is Equipment {
  // Verifica se é um objeto não nulo
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return false;
  }

  const equipment = obj as Record<string, unknown>;

  // Verifica campos obrigatórios
  if (!('id' in equipment) || !('name' in equipment)) {
    return false;
  }

  // Valida id
  if (typeof equipment.id !== 'string' || equipment.id.trim().length === 0) {
    return false;
  }

  // Valida name
  if (
    typeof equipment.name !== 'string' ||
    equipment.name.trim().length === 0
  ) {
    return false;
  }

  // Valida quantity se presente
  if ('quantity' in equipment) {
    if (typeof equipment.quantity !== 'number' || equipment.quantity < 1) {
      return false;
    }
  }

  // Valida weight se presente
  if ('weight' in equipment) {
    if (typeof equipment.weight !== 'number' || equipment.weight < 0) {
      return false;
    }
  }

  // Valida cost se presente
  if ('cost' in equipment) {
    if (typeof equipment.cost !== 'number' || equipment.cost < 0) {
      return false;
    }
  }

  // Valida techLevel se presente
  if ('techLevel' in equipment) {
    if (typeof equipment.techLevel !== 'number' || equipment.techLevel < 0) {
      return false;
    }
  }

  // Valida children se presente
  if ('children' in equipment) {
    if (!Array.isArray(equipment.children)) {
      return false;
    }
    for (const child of equipment.children) {
      if (!isEquipment(child)) {
        return false;
      }
    }
  }

  // Valida strings opcionais se presentes
  const optionalStrings = ['description', 'legalityClass', 'notes', 'category'];
  for (const field of optionalStrings) {
    if (field in equipment) {
      if (typeof equipment[field] !== 'string') {
        return false;
      }
    }
  }

  return true;
}
