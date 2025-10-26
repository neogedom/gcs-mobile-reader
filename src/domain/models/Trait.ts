/**
 * Classe que representa uma trait no sistema GURPS
 */
export class Trait {
  /** Identificador único da trait */
  public readonly id: string;

  /** Nome da trait */
  public readonly name: string;

  /** Pontos base da trait (opcional) */
  public readonly basePoints?: number | undefined;

  /** Cálculo de pontos da trait */
  public readonly calc: { points: number };

  /** Tags da trait (ex: Advantage, Disadvantage) (opcional) */
  public readonly tags?: string[] | undefined;

  /** Descrição da trait (opcional) */
  public readonly description?: string | undefined;

  /** Referência bibliográfica (opcional) */
  public readonly reference?: string | undefined;

  /** Substituições para nomes com @ (opcional) */
  public readonly replacements?: Record<string, string> | undefined;

  /** Notas locais (opcional) */
  public readonly localNotes?: string | undefined;

  /** Pré-requisitos (opcional) */
  public readonly prereqs?: unknown | undefined; // TODO: Definir tipo específico para prereqs

  /** Modificadores da trait (opcional) */
  public readonly modifiers?: unknown[] | undefined; // TODO: Definir tipo específico para modifiers

  /** Se a trait pode ter níveis (opcional) */
  public readonly canLevel?: boolean | undefined;

  /** Pontos por nível (opcional) */
  public readonly pointsPerLevel?: number | undefined;

  /** Níveis da trait (opcional) */
  public readonly levels?: number | undefined;

  /**
   * Cria uma nova instância de Trait
   * @param data Dados da trait
   * @throws Error quando campos obrigatórios estão ausentes ou com tipos incorretos
   */
  constructor(data: {
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
    modifiers?: unknown | undefined;
    canLevel?: boolean | undefined;
    pointsPerLevel?: number | undefined;
    levels?: number | undefined;
  }) {
    if (!data.id) {
      throw new Error('Campo obrigatório ausente: id');
    }
    if (typeof data.id !== 'string') {
      throw new Error(
        `Tipo incorreto para o campo id: esperado string, recebido ${typeof data.id}`
      );
    }

    if (!data.name) {
      throw new Error('Campo obrigatório ausente: name');
    }
    if (typeof data.name !== 'string') {
      throw new Error(
        `Tipo incorreto para o campo name: esperado string, recebido ${typeof data.name}`
      );
    }

    if (data.basePoints !== undefined && typeof data.basePoints !== 'number') {
      throw new Error(
        `Tipo incorreto para o campo basePoints: esperado number, recebido ${typeof data.basePoints}`
      );
    }

    if (!data.calc || typeof data.calc.points !== 'number') {
      throw new Error('Campo obrigatório ausente ou inválido: calc.points');
    }

    if (data.tags !== undefined && !Array.isArray(data.tags)) {
      throw new Error('Campo tags deve ser array se presente');
    }

    if (
      data.description !== undefined &&
      typeof data.description !== 'string'
    ) {
      throw new Error(
        `Tipo incorreto para o campo description: esperado string, recebido ${typeof data.description}`
      );
    }

    if (
      data.reference !== undefined &&
      typeof data.reference !== 'string'
    ) {
      throw new Error(
        `Tipo incorreto para o campo reference: esperado string, recebido ${typeof data.reference}`
      );
    }

    if (
      data.replacements !== undefined &&
      (typeof data.replacements !== 'object' || data.replacements === null)
    ) {
      throw new Error(
        `Tipo incorreto para o campo replacements: esperado object, recebido ${typeof data.replacements}`
      );
    }

    if (
      data.localNotes !== undefined &&
      typeof data.localNotes !== 'string'
    ) {
      throw new Error(
        `Tipo incorreto para o campo localNotes: esperado string, recebido ${typeof data.localNotes}`
      );
    }

    if (
      data.canLevel !== undefined &&
      typeof data.canLevel !== 'boolean'
    ) {
      throw new Error(
        `Tipo incorreto para o campo canLevel: esperado boolean, recebido ${typeof data.canLevel}`
      );
    }

    if (
      data.pointsPerLevel !== undefined &&
      typeof data.pointsPerLevel !== 'number'
    ) {
      throw new Error(
        `Tipo incorreto para o campo pointsPerLevel: esperado number, recebido ${typeof data.pointsPerLevel}`
      );
    }

    if (
      data.levels !== undefined &&
      typeof data.levels !== 'number'
    ) {
      throw new Error(
        `Tipo incorreto para o campo levels: esperado number, recebido ${typeof data.levels}`
      );
    }

    this.id = data.id;
    this.name = data.name;
    this.basePoints = data.basePoints;
    this.calc = data.calc;
    this.tags = data.tags;
    this.description = data.description;
    this.reference = data.reference;
    this.replacements = data.replacements;
    this.localNotes = data.localNotes;
    this.prereqs = data.prereqs;
    this.modifiers = data.modifiers as unknown[];
    this.canLevel = data.canLevel;
    this.pointsPerLevel = data.pointsPerLevel;
    this.levels = data.levels;
  }
}
