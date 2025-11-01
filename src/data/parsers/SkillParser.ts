import { Skill } from '../../domain/models/Skill';
import { isSkill } from '../../domain/guards/Skill.guard';
import { SkillValidator } from '../../domain/validators/SkillValidator';

/**
 * Parser para skills de GURPS
 * Responsabilidade: Parsear dados de skills de arquivos .gcs
 */
export class SkillParser {
  /**
   * Parseia um array de skills
   * @param data Dados a serem parseados
   * @returns Array de Skill válidos
   * @throws Error se dados inválidos
   */
  parseSkills(data: unknown): Skill[] {
    if (!Array.isArray(data)) {
      throw new Error('Dados de skills devem ser um array');
    }

    const skills: Skill[] = [];

    for (const item of data) {
      const skill = this.parseSkill(item);
      if (skill) {
        skills.push(skill);
      }
    }

    return skills;
  }

  /**
   * Parseia uma skill individual
   * @param data Dados da skill
   * @returns Skill válido ou null se inválido
   */
  private parseSkill(data: unknown): Skill | null {
    if (typeof data !== 'object' || data === null) {
      return null;
    }

    const skillData = data as Record<string, unknown>;

    // Campos obrigatórios
    const id = skillData.id as string;
    const name = skillData.name as string;
    const difficulty = skillData.difficulty as string;
    const calc = skillData.calc as { level: number };

    if (!id || typeof id !== 'string') {
      throw new Error('Campo obrigatório ausente ou inválido: id');
    }

    if (!name || typeof name !== 'string') {
      throw new Error('Campo obrigatório ausente ou inválido: name');
    }

    if (!difficulty || typeof difficulty !== 'string') {
      throw new Error('Campo obrigatório ausente ou inválido: difficulty');
    }

    if (!calc || typeof calc.level !== 'number') {
      throw new Error('Campo obrigatório ausente ou inválido: calc.level');
    }

    // O level vem de calc.level
    const level = calc.level;

    // Campos opcionais
    const specialization = skillData.specialization as string | undefined;
    const reference = skillData.reference as string | undefined;
    const tags = skillData.tags as string[] | undefined;
    const defaults = skillData.defaults as unknown[] | undefined;
    const techLevel = skillData.tech_level as string | undefined;
    const points = skillData.points as number | undefined;
    const defaultedFrom = skillData.defaulted_from as unknown | undefined;

    // Criar Skill
    const skill = new Skill({
      id,
      name,
      level,
      difficulty,
      specialization,
      reference,
      tags,
      defaults,
      techLevel,
      points,
      calc,
      defaultedFrom,
    });

    // Validar com guard e validator
    if (!isSkill(skill)) {
      throw new Error('Skill parseado não passou na validação do guard');
    }

    const validation = SkillValidator.validate({
      id: skill.id,
      name: skill.name,
      level: skill.level,
      difficulty: skill.difficulty,
      specialization: skill.specialization,
      reference: skill.reference,
      tags: skill.tags,
      defaults: skill.defaults,
      techLevel: skill.techLevel,
      points: skill.points,
      calc: skill.calc,
      defaultedFrom: skill.defaultedFrom,
    });

    if (!validation.success) {
      throw new Error(`Skill inválido: ${validation.errors.join(', ')}`);
    }

    return skill;
  }
}
