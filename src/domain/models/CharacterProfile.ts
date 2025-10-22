/**
 * Modelo para dados de perfil do personagem
 * Responsabilidade: Informações pessoais, aparência e identidade do personagem
 *
 * Este modelo é independente e pode ser usado em diferentes contextos
 */

import { CharacterProfileValidator } from '../validators/CharacterProfileValidator';

export class CharacterProfile {
  /** Nome completo do personagem */
  public readonly name: string;

  /** Nome do jogador */
  public readonly playerName: string;

  /** Idade do personagem em anos */
  public readonly age: number | null;

  /** Data de aniversário */
  public readonly birthday: string | null;

  /** Cor dos olhos */
  public readonly eyes: string | null;

  /** Cor do cabelo */
  public readonly hair: string | null;

  /** Tom de pele */
  public readonly skin: string | null;

  /** Mão dominante */
  public readonly handedness: string | null;

  /** Gênero */
  public readonly gender: string | null;

  /** Altura em metros */
  public readonly height: number | null;

  /** Peso em quilogramas */
  public readonly weight: number | null;

  /** Tech level do cenário */
  public readonly techLevel: number | null;

  /** URL ou caminho para o retrato */
  public readonly portrait: string | null;

  /**
   * Cria uma nova instância de CharacterProfile
   * @param data Dados de perfil do personagem
   * @throws Error quando campos obrigatórios estão ausentes ou inválidos
   */
  constructor(data: {
    name: string;
    playerName: string;
    age?: number;
    birthday?: string;
    eyes?: string;
    hair?: string;
    skin?: string;
    handedness?: string;
    gender?: string;
    height?: number;
    weight?: number;
    techLevel?: number;
    portrait?: string;
  }) {
    const result = CharacterProfileValidator.validate(data);

    if (!result.success) {
      throw new Error(
        `Erros de validação no perfil:\n${result.errors.join('\n')}`
      );
    }

    this.name = data.name;
    this.playerName = data.playerName;
    this.age = data.age ?? null;
    this.birthday = data.birthday ?? null;
    this.eyes = data.eyes ?? null;
    this.hair = data.hair ?? null;
    this.skin = data.skin ?? null;
    this.handedness = data.handedness ?? null;
    this.gender = data.gender ?? null;
    this.height = data.height ?? null;
    this.weight = data.weight ?? null;
    this.techLevel = data.techLevel ?? null;
    this.portrait = data.portrait ?? null;

    Object.freeze(this);
  }

  /**
   * Verifica se dois perfis são iguais
   * @param other Outro CharacterProfile para comparar
   * @returns true se forem iguais
   */
  equals(other: CharacterProfile): boolean {
    if (!other) return false;

    return (
      this.name === other.name &&
      this.playerName === other.playerName &&
      this.age === other.age &&
      this.birthday === other.birthday &&
      this.eyes === other.eyes &&
      this.hair === other.hair &&
      this.skin === other.skin &&
      this.handedness === other.handedness &&
      this.gender === other.gender &&
      this.height === other.height &&
      this.weight === other.weight &&
      this.techLevel === other.techLevel &&
      this.portrait === other.portrait
    );
  }

  /**
   * Retorna uma representação em string do CharacterProfile
   * @returns String formatada com os dados principais do perfil
   */
  toString(): string {
    return `CharacterProfile{"${this.name}" por ${this.playerName}}`;
  }
}
