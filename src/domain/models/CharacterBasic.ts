/**
 * Modelo básico do personagem - contém apenas campos essenciais
 * Responsabilidade: Version, ID, Total Points, Created Date, Modified Date
 *
 * Este modelo representa os campos mínimos necessários de um personagem GCS
 * e serve como base para construção dos outros componentes modulares.
 */

import { CharacterBasicValidator } from '../validators/CharacterBasicValidator';

export class CharacterBasic {
  public readonly version: number;
  public readonly id: string;
  public readonly totalPoints: number;
  public readonly createdDate: string;
  public readonly modifiedDate: string;

  /**
   * Cria uma nova instância de CharacterBasic
   * @param data Dados básicos do personagem
   * @throws Error quando campos obrigatórios estão ausentes ou inválidos
   */
  constructor(data: {
    version: number;
    id: string;
    totalPoints: number;
    createdDate: string;
    modifiedDate: string;
  }) {
    const result = CharacterBasicValidator.validate(data);

    if (!result.success) {
      throw new Error(`Erros de validação:\n${result.errors.join('\n')}`);
    }

    this.version = data.version;
    this.id = data.id;
    this.totalPoints = data.totalPoints;
    this.createdDate = data.createdDate;
    this.modifiedDate = data.modifiedDate;

    Object.freeze(this);
  }

  /**
   * Verifica se dois CharacterBasic são iguais
   * @param other Outro CharacterBasic para comparar
   * @returns true se forem iguais
   */
  equals(other: CharacterBasic): boolean {
    if (!other) return false;

    return (
      this.version === other.version &&
      this.id === other.id &&
      this.totalPoints === other.totalPoints &&
      this.createdDate === other.createdDate &&
      this.modifiedDate === other.modifiedDate
    );
  }

  /**
   * Retorna uma representação em string do CharacterBasic
   * @returns String formatada com os dados básicos
   */
  toString(): string {
    return `CharacterBasic{v${this.version} "${this.id}" - ${this.totalPoints}pts}`;
  }
}
