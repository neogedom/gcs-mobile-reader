/**
 * Classe que representa uma trait no sistema GURPS
 */
export class Trait {
  /** Identificador único da trait */
  public readonly id: string;

  /** Nome da trait */
  public readonly name: string;

  /** Custo em pontos da trait */
  public readonly cost: number;

  /** Descrição da trait (opcional) */
  public readonly description?: string | undefined;

  /**
   * Cria uma nova instância de Trait
   * @param data Dados da trait
   * @throws Error quando campos obrigatórios estão ausentes ou com tipos incorretos
   */
  constructor(data: {
    id: string;
    name: string;
    cost: number;
    description?: string;
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

    if (data.cost === undefined || data.cost === null) {
      throw new Error('Campo obrigatório ausente: cost');
    }
    if (typeof data.cost !== 'number') {
      throw new Error(
        `Tipo incorreto para o campo cost: esperado number, recebido ${typeof data.cost}`
      );
    }

    if (
      data.description !== undefined &&
      typeof data.description !== 'string'
    ) {
      throw new Error(
        `Tipo incorreto para o campo description: esperado string, recebido ${typeof data.description}`
      );
    }

    this.id = data.id;
    this.name = data.name;
    this.cost = data.cost;
    this.description = data.description;
  }
}
