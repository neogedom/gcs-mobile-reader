/**
 * Classe que representa uma skill no sistema GURPS
 */
export class Skill {
  /** Identificador único da skill */
  public readonly id: string;

  /** Nome da skill */
  public readonly name: string;

  /** Nível da skill */
  public readonly level: number;

  /** Dificuldade da skill */
  public readonly difficulty: string;

  /** Especialização da skill (opcional) */
  public readonly specialization?: string | undefined;

  /** Referência bibliográfica (opcional) */
  public readonly reference?: string | undefined;

  /** Tags da skill (opcional) */
  public readonly tags?: string[] | undefined;

  /** Defaults da skill (opcional) */
  public readonly defaults?: unknown[] | undefined;

  /** Nível tecnológico (opcional) */
  public readonly techLevel?: string | undefined;

  /** Pontos investidos na skill (opcional) */
  public readonly points?: number | undefined;

  /** Cálculo da skill */
  public readonly calc: { level: number; rsl?: string };

  /** Defaulted from (opcional) */
  public readonly defaultedFrom?: unknown | undefined;

  /**
   * Cria uma nova instância de Skill
   * @param data Dados da skill
   * @throws Error quando campos obrigatórios estão ausentes ou com tipos incorretos
   */
  constructor(data: {
    id: string;
    name: string;
    level: number;
    difficulty: string;
    specialization?: string | undefined;
    reference?: string | undefined;
    tags?: string[] | undefined;
    defaults?: unknown[] | undefined;
    techLevel?: string | undefined;
    points?: number | undefined;
    calc: { level: number; rsl?: string };
    defaultedFrom?: unknown | undefined;
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

    if (data.level === undefined || data.level === null) {
      throw new Error('Campo obrigatório ausente: level');
    }
    if (typeof data.level !== 'number') {
      throw new Error(
        `Tipo incorreto para o campo level: esperado number, recebido ${typeof data.level}`
      );
    }

    if (!data.difficulty) {
      throw new Error('Campo obrigatório ausente: difficulty');
    }
    if (typeof data.difficulty !== 'string') {
      throw new Error(
        `Tipo incorreto para o campo difficulty: esperado string, recebido ${typeof data.difficulty}`
      );
    }

    if (!data.calc || typeof data.calc.level !== 'number') {
      throw new Error('Campo obrigatório ausente ou inválido: calc.level');
    }

    if (
      data.specialization !== undefined &&
      typeof data.specialization !== 'string'
    ) {
      throw new Error(
        `Tipo incorreto para o campo specialization: esperado string, recebido ${typeof data.specialization}`
      );
    }

    if (data.reference !== undefined && typeof data.reference !== 'string') {
      throw new Error(
        `Tipo incorreto para o campo reference: esperado string, recebido ${typeof data.reference}`
      );
    }

    if (data.tags !== undefined && !Array.isArray(data.tags)) {
      throw new Error('Campo tags deve ser array se presente');
    }

    if (data.techLevel !== undefined && typeof data.techLevel !== 'string') {
      throw new Error(
        `Tipo incorreto para o campo techLevel: esperado string, recebido ${typeof data.techLevel}`
      );
    }

    if (data.points !== undefined && typeof data.points !== 'number') {
      throw new Error(
        `Tipo incorreto para o campo points: esperado number, recebido ${typeof data.points}`
      );
    }

    this.id = data.id;
    this.name = data.name;
    this.level = data.level;
    this.difficulty = data.difficulty;
    this.specialization = data.specialization;
    this.reference = data.reference;
    this.tags = data.tags;
    this.defaults = data.defaults;
    this.techLevel = data.techLevel;
    this.points = data.points;
    this.calc = data.calc;
    this.defaultedFrom = data.defaultedFrom;
  }
}
