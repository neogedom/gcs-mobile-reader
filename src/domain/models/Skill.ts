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

    this.id = data.id;
    this.name = data.name;
    this.level = data.level;
    this.difficulty = data.difficulty;
  }
}
