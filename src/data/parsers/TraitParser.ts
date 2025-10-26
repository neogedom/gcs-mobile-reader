import { Trait } from '../../domain/models/Trait';
import { isTrait } from '../../domain/guards/Trait.guard';
import { TraitValidator } from '../../domain/validators/TraitValidator';

/**
 * Parser para traits de GURPS
 * Responsabilidade: Parsear dados de traits de arquivos .gcs
 */
export class TraitParser {
  /**
   * Parseia um array de traits
   * @param data Dados a serem parseados
   * @returns Array de Trait válidos
   * @throws Error se dados inválidos
   */
  parseTraits(data: unknown): Trait[] {
    if (!Array.isArray(data)) {
      throw new Error('Dados de traits devem ser um array');
    }

    const traits: Trait[] = [];

    for (const item of data) {
      const trait = this.parseTrait(item);
      if (trait) {
        traits.push(trait);
      }
    }

    return traits;
  }

  /**
   * Parseia um trait individual
   * @param data Dados do trait
   * @returns Trait válido ou null se inválido
   */
  private parseTrait(data: unknown): Trait | null {
    if (typeof data !== 'object' || data === null) {
      return null;
    }

    const traitData = data as Record<string, unknown>;

    // Campos obrigatórios
    const id = traitData.id as string;
    const name = traitData.name as string;
    const basePoints = traitData.base_points as number | undefined;
    const calc = traitData.calc as { points: number };
    const tags = traitData.tags as string[];

    if (!id || typeof id !== 'string') {
      throw new Error('Campo obrigatório ausente ou inválido: id');
    }

    if (!name || typeof name !== 'string') {
      throw new Error('Campo obrigatório ausente ou inválido: name');
    }

    if (basePoints !== undefined && typeof basePoints !== 'number') {
      throw new Error('Campo base_points deve ser number se presente');
    }

    if (!calc || typeof calc.points !== 'number') {
      throw new Error('Campo obrigatório ausente ou inválido: calc.points');
    }

    if (tags !== undefined && !Array.isArray(tags)) {
      throw new Error('Campo tags deve ser array se presente');
    }

    // Validar replacements se nome tem @
    const hasAtSymbol = name.includes('@');
    const replacements = traitData.replacements as Record<string, string> | undefined;

    if (hasAtSymbol && (!replacements || Object.keys(replacements).length === 0)) {
      throw new Error('Trait com @ no nome deve ter replacements');
    }

    if (!hasAtSymbol && replacements) {
      throw new Error('Trait sem @ no nome não deve ter replacements');
    }

    // Validar advantage/disadvantage
    const isAdvantage = tags && tags.includes('Advantage');
    const isDisadvantage = tags && tags.includes('Disadvantage');

    if (isAdvantage && isDisadvantage) {
      throw new Error('Trait não pode ser Advantage e Disadvantage ao mesmo tempo');
    }

    // Nota: Não validar strictly advantage/disadvantage points, pois dados reais podem variar

    // Campos opcionais
    const description = traitData.description as string | undefined;
    const reference = traitData.reference as string | undefined;
    const localNotes = traitData.local_notes as string | undefined;
    const prereqs = traitData.prereqs;
    const modifiers = traitData.modifiers;
    const canLevel = traitData.can_level as boolean | undefined;
    const pointsPerLevel = traitData.points_per_level as number | undefined;
    const levels = traitData.levels as number | undefined;

    // Validar level fields
    if (canLevel) {
      if (pointsPerLevel === undefined || levels === undefined) {
        throw new Error('Trait com can_level=true deve ter points_per_level e levels');
      }
    }

    // Criar Trait
    const trait = new Trait({
      id,
      name,
      basePoints: basePoints,
      calc,
      tags,
      description,
      reference,
      replacements,
      localNotes,
      prereqs,
      modifiers,
      canLevel,
      pointsPerLevel,
      levels
    });

    // Validar com guard e validator
    if (!isTrait(trait)) {
      throw new Error('Trait parseado não passou na validação do guard');
    }

    const validation = TraitValidator.validate({
      id: trait.id,
      name: trait.name,
      basePoints: trait.basePoints,
      calc: trait.calc,
      tags: trait.tags,
      description: trait.description,
      reference: trait.reference,
      replacements: trait.replacements,
      localNotes: trait.localNotes,
      prereqs: trait.prereqs,
      modifiers: trait.modifiers,
      canLevel: trait.canLevel,
      pointsPerLevel: trait.pointsPerLevel,
      levels: trait.levels
    });

    if (!validation.success) {
      throw new Error(`Trait inválido: ${validation.errors.join(', ')}`);
    }

    return trait;
  }
}