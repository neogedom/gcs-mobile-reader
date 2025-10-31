/**
 * Helper para operações com Equipment trees
 * Responsabilidade: Manipular estruturas hierárquicas de equipamentos
 *
 * Este helper fornece funções utilitárias para trabalhar com
 * estruturas de equipamentos em forma de árvore.
 */

import { Equipment } from '../models/Equipment';

export class EquipmentTree {
  /**
   * Converte uma estrutura de equipment hierárquica em array plano (depth-first)
   * @param equipment Lista de equipment para fazer flatten
   * @returns Array plano com todos os itens em ordem depth-first
   */
  static flatten(equipment: Equipment[]): Equipment[] {
    const result: Equipment[] = [];

    for (const item of equipment) {
      result.push(item);
      if (item.children && item.children.length > 0) {
        const childFlattened = this.flatten(item.children);
        result.push(...childFlattened);
      }
    }

    return result;
  }

  /**
   * Calcula a profundidade máxima de uma estrutura de equipment
   * @param equipment Equipment para calcular a profundidade
   * @returns Profundidade máxima (0 para leaf nodes)
   */
  static getDepth(equipments: Equipment[] | Equipment): number {
    const items = Array.isArray(equipments) ? equipments : [equipments];
    if (items.length === 0) return 0;

    return 1 + Math.max(0, ...items.flatMap(eq =>
      eq.children?.map(child => this.getDepth(child)) ?? []
    ));
  }

  /**
   * Busca um equipment por ID na estrutura hierárquica
   * @param equipment Lista de equipment para buscar
   * @param id ID do equipment a ser encontrado
   * @returns Equipment encontrado ou null se não encontrado
   */
  static findById(equipment: Equipment[], id: string): Equipment | null {
    for (const item of equipment) {
      if (item.id === id) {
        return item;
      }

      // Buscar em children se existirem
      if (item.children && item.children.length > 0) {
        const found = this.findById(item.children, id);
        if (found) {
          return found;
        }
      }
    }

    return null;
  }

  /**
   * Calcula estatísticas de uma estrutura de equipment
   * @param equipment Lista de equipment para analisar
   * @returns Objeto com estatísticas da estrutura
   */
  static getStatistics(equipment: Equipment[]): {
    totalItems: number;
    containers: number;
    leafNodes: number;
    maxDepth: number;
    averageDepth: number;
  } {
    const allItems = this.flatten(equipment);
    const containers = allItems.filter(item => item.isContainer);
    const leafNodes = allItems.filter(item => !item.isContainer);

    const depths = allItems.map(item => this.getDepth(item));
    const maxDepth = depths.length > 0 ? Math.max(...depths) : 0;
    const averageDepth =
      depths.length > 0
        ? depths.reduce((sum, depth) => sum + depth, 0) / depths.length
        : 0;

    return {
      totalItems: allItems.length,
      containers: containers.length,
      leafNodes: leafNodes.length,
      maxDepth,
      averageDepth: Math.round(averageDepth * 100) / 100,
    };
  }

  /**
   * Filtra equipment baseado em um predicado
   * @param equipment Lista de equipment para filtrar
   * @param predicate Função predicado para testar cada item
   * @returns Lista de equipment que atendem ao predicado
   */
  static filter(
    equipment: Equipment[],
    predicate: (item: Equipment) => boolean
  ): Equipment[] {
    const result: Equipment[] = [];

    for (const item of equipment) {
      if (predicate(item)) {
        result.push(item);
      }

      // Filtrar recursivamente nos children
      if (item.children && item.children.length > 0) {
        const filteredChildren = this.filter(item.children, predicate);
        result.push(...filteredChildren);
      }
    }

    return result;
  }

  /**
   * Executa uma função para cada item na estrutura (depth-first)
   * @param equipment Lista de equipment para iterar
   * @param callback Função a executar para cada item
   */
  static forEach(
    equipment: Equipment[],
    callback: (item: Equipment) => void
  ): void {
    for (const item of equipment) {
      callback(item);

      if (item.children && item.children.length > 0) {
        this.forEach(item.children, callback);
      }
    }
  }

  /**
   * Mapeia todos os items da estrutura para novos valores
   * @param equipment Lista de equipment para mapear
   * @param mapper Função que mapeia cada item
   * @returns Nova estrutura de equipment com valores mapeados
   */
  static map<T>(equipment: Equipment[], mapper: (item: Equipment) => T): T[] {
    const result: T[] = [];

    for (const item of equipment) {
      result.push(mapper(item));

      if (item.children && item.children.length > 0) {
        const childMapped = this.map(item.children, mapper);
        result.push(...childMapped);
      }
    }

    return result;
  }
}
