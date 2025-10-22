/**
 * Index para TypeGuards do domínio
 * Responsabilidade: Exportar todos os guards disponíveis
 */

export { isCharacter } from './Character.guard';
export { isTrait } from './Trait.guard';
export { isSkill } from './Skill.guard';
export { isSpell } from './Spell.guard';
export { isEquipment } from './Equipment.guard';

// Re-export types if needed
export type { Character } from '../models/Character';
