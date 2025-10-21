/**
 * Classe que representa uma spell no sistema GURPS
 */
export class Spell {
  /** Identificador único da spell */
  public readonly id: string;

  /** Nome da spell */
  public readonly name: string;

  /** Nível da spell */
  public readonly level: number;

  /** Escola de magia da spell */
  public readonly college: string;

  /**
   * Cria uma nova instância de Spell
   * @param data Dados da spell
   * @throws Error quando campos obrigatórios estão ausentes ou com tipos incorretos
   */
  constructor(data: {
    id: string;
    name: string;
    level: number;
    college: string;
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

    if (!data.college) {
      throw new Error('Campo obrigatório ausente: college');
    }
    if (typeof data.college !== 'string') {
      throw new Error(
        `Tipo incorreto para o campo college: esperado string, recebido ${typeof data.college}`
      );
    }

    this.id = data.id;
    this.name = data.name;
    this.level = data.level;
    this.college = data.college;
  }
}
