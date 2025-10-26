/**
 * Modelo para atributos do personagem no sistema GURPS
 * Responsabilidade: Atributos básicos e derivados do personagem
 *
 * Este modelo representa todos os atributos básicos do sistema GURPS
 * seguindo as regras oficiais do jogo.
 */

export class CharacterAttributes {
  /** Força (Strength) - atributo básico */
  public readonly st: number;

  /** Destreza (Dexterity) - atributo básico */
  public readonly dx: number;

  /** Inteligência (Intelligence) - atributo básico */
  public readonly iq: number;

  /** Saúde (Health) - atributo básico */
  public readonly ht: number;

  /** Vontade (Will) - atributo secundário */
  public readonly will: number;

  /** Percepção (Perception) - atributo secundário */
  public readonly per: number;

  /** Velocidade Básica (Basic Speed) - atributo derivado */
  public readonly basicSpeed: number;

  /** Movimento Básico (Basic Move) - atributo derivado */
  public readonly basicMove: number;

  /** Pontos de Vida (Hit Points) - atributo derivado */
  public readonly hitPoints: number;

  /** Pontos de Fadiga (Fatigue Points) - atributo derivado */
  public readonly fatiguePoints: number;

  /** Pontos de Magia (Magic Points) - opcional, para personagens mágicos */
  public readonly magicPoints?: number | undefined;

  /**
   * Cria uma nova instância de CharacterAttributes
   * @param data Dados dos atributos do personagem
   * @throws Error quando campos obrigatórios estão ausentes ou inválidos
   */
  constructor(data: {
    st: number;
    dx: number;
    iq: number;
    ht: number;
    will?: number;
    per?: number;
    basicSpeed?: number;
    basicMove?: number;
    hitPoints?: number;
    fatiguePoints?: number;
    magicPoints?: number;
  }) {
    const result = this.validate(data);

    if (!result.success) {
      throw new Error(
        `Erros de validação nos atributos:\n${result.errors.join('\n')}`
      );
    }

    this.st = data.st;
    this.dx = data.dx;
    this.iq = data.iq;
    this.ht = data.ht;
    this.will = data.will ?? this.iq;
    this.per = data.per ?? this.iq;
    this.basicSpeed = data.basicSpeed ?? this.calculateBasicSpeed();
    this.basicMove = data.basicMove ?? this.calculateBasicMove();
    this.hitPoints = data.hitPoints ?? this.st;
    this.fatiguePoints = data.fatiguePoints ?? this.ht;
    this.magicPoints = data.magicPoints;

    Object.freeze(this);
  }

  /**
   * Calcula a velocidade básica baseada nos atributos
   * @returns Valor calculado de Basic Speed
   */
  private calculateBasicSpeed(): number {
    return (this.dx + this.ht) / 4;
  }

  /**
   * Calcula o movimento básico baseado na velocidade básica
   * @returns Valor calculado de Basic Move
   */
  private calculateBasicMove(): number {
    return Math.floor(this.basicSpeed);
  }

  /**
   * Calcula pontos de vida baseado na força
   * @returns Valor calculado de Hit Points
   */
  private calculateHitPoints(): number {
    return this.st;
  }

  /**
   * Calcula pontos de fadiga baseado na saúde
   * @returns Valor calculado de Fatigue Points
   */
  private calculateFatiguePoints(): number {
    return this.ht;
  }

  /**
   * Calcula modificador de atributo
   * @param attribute Valor do atributo
   * @returns Modificador calculado
   */
  private calculateModifier(attribute: number): number {
    const modifier = (attribute - 10) / 2;
    return Math.floor(modifier);
  }

  /**
   * Retorna o modificador de ST
   * @returns Modificador de Strength
   */
  get stModifier(): number {
    return this.calculateModifier(this.st);
  }

  /**
   * Retorna o modificador de DX
   * @returns Modificador de Dexterity
   */
  get dxModifier(): number {
    return this.calculateModifier(this.dx);
  }

  /**
   * Retorna o modificador de IQ
   * @returns Modificador de Intelligence
   */
  get iqModifier(): number {
    return this.calculateModifier(this.iq);
  }

  /**
   * Retorna o modificador de HT
   * @returns Modificador de Health
   */
  get htModifier(): number {
    return this.calculateModifier(this.ht);
  }

  /**
   * Retorna o modificador de WILL
   * @returns Modificador de Will
   */
  get willModifier(): number {
    return this.calculateModifier(this.will);
  }

  /**
   * Retorna o modificador de PER
   * @returns Modificador de Perception
   */
  get perModifier(): number {
    return this.calculateModifier(this.per);
  }

  /**
   * Verifica se dois conjuntos de atributos são iguais
   * @param other Outro CharacterAttributes para comparar
   * @returns true se forem iguais
   */
  equals(other: CharacterAttributes): boolean {
    if (!other) return false;

    return (
      this.st === other.st &&
      this.dx === other.dx &&
      this.iq === other.iq &&
      this.ht === other.ht &&
      this.will === other.will &&
      this.per === other.per &&
      this.basicSpeed === other.basicSpeed &&
      this.basicMove === other.basicMove &&
      this.hitPoints === other.hitPoints &&
      this.fatiguePoints === other.fatiguePoints &&
      this.magicPoints === other.magicPoints
    );
  }

  /**
   * Retorna uma representação em string dos atributos
   * @returns String formatada com os principais atributos
   */
  toString(): string {
    const mp = this.magicPoints !== undefined ? ` MP:${this.magicPoints}` : '';
    return `Attributes{ST:${this.st} DX:${this.dx} IQ:${this.iq} HT:${this.ht} HP:${this.hitPoints} FP:${this.fatiguePoints}${mp}}`;
  }

  private validate(data: {
    st: number;
    dx: number;
    iq: number;
    ht: number;
    will?: number;
    per?: number;
    basicSpeed?: number;
    basicMove?: number;
    hitPoints?: number;
    fatiguePoints?: number;
    magicPoints?: number;
  }): { success: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validação dos atributos básicos (ST, DX, IQ, HT)
    const basicAttributes = [
      { name: 'st', value: data.st },
      { name: 'dx', value: data.dx },
      { name: 'iq', value: data.iq },
      { name: 'ht', value: data.ht },
    ];

    for (const attr of basicAttributes) {
      if (attr.value === undefined || attr.value === null) {
        errors.push(`Campo obrigatório ausente: ${attr.name}`);
      } else if (typeof attr.value !== 'number' || isNaN(attr.value) || !isFinite(attr.value)) {
        errors.push(
          `Campo ${attr.name} deve ser um número válido, recebido: ${attr.value}`
        );
      } else if (attr.value < 1) {
        errors.push(
          `Campo ${attr.name} deve ser maior que 0, recebido: ${attr.value}`
        );
      }
    }

    // Validação dos atributos secundários (WILL, PER)
    if (
      data.will !== undefined &&
      (typeof data.will !== 'number' || isNaN(data.will) || !isFinite(data.will) || data.will < 1)
    ) {
      errors.push(
        `Campo will deve ser um número maior que 0, recebido: ${data.will}`
      );
    }

    if (
      data.per !== undefined &&
      (typeof data.per !== 'number' || isNaN(data.per) || !isFinite(data.per) || data.per < 1)
    ) {
      errors.push(
        `Campo per deve ser um número maior que 0, recebido: ${data.per}`
      );
    }

    // Validação dos atributos derivados
    if (
      data.basicSpeed !== undefined &&
      (typeof data.basicSpeed !== 'number' || isNaN(data.basicSpeed) || !isFinite(data.basicSpeed) || data.basicSpeed <= 0)
    ) {
      errors.push(
        `Campo basicSpeed deve ser um número positivo, recebido: ${data.basicSpeed}`
      );
    }

    if (
      data.basicMove !== undefined &&
      (typeof data.basicMove !== 'number' || isNaN(data.basicMove) || !isFinite(data.basicMove) || data.basicMove < 0)
    ) {
      errors.push(
        `Campo basicMove deve ser um número não negativo, recebido: ${data.basicMove}`
      );
    }

    if (
      data.hitPoints !== undefined &&
      (typeof data.hitPoints !== 'number' || isNaN(data.hitPoints) || !isFinite(data.hitPoints))
    ) {
      errors.push(
        `Campo hitPoints deve ser um número, recebido: ${data.hitPoints}`
      );
    }

    if (
      data.fatiguePoints !== undefined &&
      (typeof data.fatiguePoints !== 'number' || isNaN(data.fatiguePoints) || !isFinite(data.fatiguePoints) || data.fatiguePoints < 1)
    ) {
      errors.push(
        `Campo fatiguePoints deve ser um número maior que 0, recebido: ${data.fatiguePoints}`
      );
    }

    if (
      data.magicPoints !== undefined &&
      (typeof data.magicPoints !== 'number' || isNaN(data.magicPoints) || !isFinite(data.magicPoints) || data.magicPoints < 0)
    ) {
      errors.push(
        `Campo magicPoints deve ser um número não negativo, recebido: ${data.magicPoints}`
      );
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}
