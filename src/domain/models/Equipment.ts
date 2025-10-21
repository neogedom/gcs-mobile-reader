/**
 * Modelo para equipamentos do personagem no sistema GURPS
 * Responsabilidade: Equipamentos, armas, armaduras e itens carregados
 *
 * Este modelo representa equipamentos individuais e suporta
 * estrutura hierárquica para equipamentos que contenham outros.
 */

export class Equipment {
  /** Identificador único do equipamento */
  public readonly id: string;

  /** Nome do equipamento */
  public readonly name: string;

  /** Quantidade de itens iguais */
  public readonly quantity: number;

  /** Peso total do equipamento (incluindo filhos) */
  public readonly weight: number;

  /** Custo total do equipamento (incluindo filhos) */
  public readonly cost: number;

  /** Equipamentos filhos (opcional) */
  public readonly children?: Equipment[];

  /** Descrição do equipamento (opcional) */
  public readonly description?: string;

  /** Tech level do equipamento (opcional) */
  public readonly techLevel?: number;

  /** Legality class do equipamento (opcional) */
  public readonly legalityClass?: string;

  /** Notas sobre o equipamento (opcional) */
  public readonly notes?: string;

  /** Categoria do equipamento (opcional) */
  public readonly category?: string;

  /**
   * Cria uma nova instância de Equipment
   * @param data Dados do equipamento
   * @throws Error quando campos obrigatórios estão ausentes ou inválidos
   */
  constructor(data: {
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
  }) {
    const result = this.validate(data);

    if (!result.success) {
      throw new Error(
        `Erros de validação no equipamento:\n${result.errors.join('\n')}`
      );
    }

    this.id = data.id;
    this.name = data.name;
    this.quantity = data.quantity ?? 1;
    this.weight = data.weight ?? 0;
    this.cost = data.cost ?? 0;
    this.children = data.children ?? [];
    this.description = data.description ?? '';
    this.techLevel = data.techLevel ?? 0;
    this.legalityClass = data.legalityClass ?? '';
    this.notes = data.notes ?? '';
    this.category = data.category ?? '';

    Object.freeze(this);
  }

  /**
   * Calcula o peso total incluindo equipamentos filhos
   * @returns Peso total em libras
   */
  get totalWeight(): number {
    if (!this.children || this.children.length === 0) {
      return Math.round(this.weight * this.quantity * 100) / 100;
    }

    const childrenWeight = this.children.reduce((total, child) => {
      return total + child.totalWeight * this.quantity;
    }, 0);

    return (
      Math.round((this.weight * this.quantity + childrenWeight) * 100) / 100
    );
  }

  /**
   * Calcula o custo total incluindo equipamentos filhos
   * @returns Custo total em dólares
   */
  get totalCost(): number {
    if (!this.children || this.children.length === 0) {
      return Math.round(this.cost * this.quantity * 100) / 100;
    }

    const childrenCost = this.children.reduce((total, child) => {
      return total + child.totalCost * this.quantity;
    }, 0);

    return Math.round((this.cost * this.quantity + childrenCost) * 100) / 100;
  }

  /**
   * Retorna todos os equipamentos filhos recursivamente
   * @returns Array plano com todos os equipamentos filhos
   */
  get allChildren(): Equipment[] {
    if (!this.children || this.children.length === 0) {
      return [];
    }

    const result: Equipment[] = [];

    for (const child of this.children) {
      result.push(child);
      result.push(...child.allChildren);
    }

    return result;
  }

  /**
   * Verifica se dois equipamentos são iguais
   * @param other Outro Equipment para comparar
   * @returns true se forem iguais
   */
  equals(other: Equipment): boolean {
    if (!other) return false;

    return (
      this.id === other.id &&
      this.name === other.name &&
      this.quantity === other.quantity &&
      this.weight === other.weight &&
      this.cost === other.cost &&
      this.description === other.description &&
      this.techLevel === other.techLevel &&
      this.legalityClass === other.legalityClass &&
      this.notes === other.notes &&
      this.category === other.category &&
      this.childrenEqual(other.children)
    );
  }

  /**
   * Compara arrays de equipamentos filhos
   * @param otherChildren Array de equipamentos para comparar
   * @returns true se forem iguais
   */
  private childrenEqual(otherChildren?: Equipment[]): boolean {
    if (!this.children && !otherChildren) return true;
    if (!this.children || !otherChildren) return false;
    if (this.children.length !== otherChildren.length) return false;

    for (let i = 0; i < this.children.length; i++) {
      if (!this.children[i].equals(otherChildren[i])) {
        return false;
      }
    }

    return true;
  }

  /**
   * Retorna uma representação em string do equipamento
   * @returns String formatada com os dados principais
   */
  toString(): string {
    const qty = this.quantity > 1 ? ` (x${this.quantity})` : '';
    const weight = this.totalWeight > 0 ? ` ${this.totalWeight}lbs` : '';
    const cost = this.totalCost > 0 ? ` $${this.totalCost}` : '';
    const children =
      this.children && this.children.length > 0
        ? ` +${this.children.length} itens`
        : '';

    return `Equipment{"${this.name}"${qty}${weight}${cost}${children}}`;
  }

  private validate(data: {
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
  }): { success: boolean; errors: string[] } {
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
