/**
 * Validador para equipamentos do personagem
 * Responsabilidade: Validar dados de equipamentos e estrutura hierárquica
 */

import { Equipment } from '../models/Equipment';

export interface EquipmentData {
  id: string;
  name: string;
  quantity?: number;
  weight?: number;
  cost?: number;
  children?: Equipment[];
  description?: string;
  techLevel?: number;
  legalityClass?: string;
  notes?: string;
  category?: string;
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
}

export class EquipmentValidator {
  /**
   * Valida dados de equipamento
   * @param data Dados a serem validados
   * @returns Resultado da validação
   */
  static validate(data: EquipmentData): ValidationResult {
    const errors: string[] = [];

    // Validação do campo id
    if (!data.id) {
      errors.push('Campo obrigatório ausente: id');
    } else if (typeof data.id !== 'string') {
      errors.push(`Campo id deve ser uma string, recebido: ${typeof data.id}`);
    } else if (data.id.trim().length === 0) {
      errors.push('Campo id não pode ser uma string vazia');
    }

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

    // Validação do campo quantity
    if (
      data.quantity !== undefined &&
      (typeof data.quantity !== 'number' || data.quantity < 1)
    ) {
      errors.push(
        `Campo quantity deve ser um número maior que 0, recebido: ${data.quantity}`
      );
    }

    // Validação do campo weight
    if (
      data.weight !== undefined &&
      (typeof data.weight !== 'number' || data.weight < 0)
    ) {
      errors.push(
        `Campo weight deve ser um número não negativo, recebido: ${data.weight}`
      );
    }

    // Validação do campo cost
    if (
      data.cost !== undefined &&
      (typeof data.cost !== 'number' || data.cost < 0)
    ) {
      errors.push(
        `Campo cost deve ser um número não negativo, recebido: ${data.cost}`
      );
    }

    // Validação do campo techLevel
    if (
      data.techLevel !== undefined &&
      (typeof data.techLevel !== 'number' || data.techLevel < 0)
    ) {
      errors.push(
        `Campo techLevel deve ser um número não negativo, recebido: ${data.techLevel}`
      );
    }

    // Validação do campo children
    if (data.children !== undefined) {
      if (!Array.isArray(data.children)) {
        errors.push(
          `Campo children deve ser um array, recebido: ${typeof data.children}`
        );
      } else {
        for (let i = 0; i < data.children.length; i++) {
          if (!(data.children[i] instanceof Equipment)) {
            errors.push(
              `Campo children[${i}] deve ser uma instância de Equipment`
            );
          }
        }
      }
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
