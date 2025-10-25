import { Character } from '../../domain/models/Character';
import { CharacterBasic } from '../../domain/models/CharacterBasic';
import { CharacterProfile } from '../../domain/models/CharacterProfile';
import { CharacterAttributes } from '../../domain/models/CharacterAttributes';

/**
 * Parser para dados de personagem GCS
 * Responsabilidade: Converter dados brutos em objetos Character válidos
 *
 * Suporta parsing de:
 * - CharacterBasic (versão, ID, pontos totais, datas)
 * - CharacterProfile (nome, jogador, etc.)
 * - CharacterAttributes (ST, DX, IQ, HT e derivados)
 */
export class CharacterParser {
  /**
   * Parseia dados brutos de personagem e retorna um Character completo
   * @param data Dados brutos do personagem (JSON do GCS)
   * @returns Character válido com basic, profile e attributes
   * @throws Error quando dados são inválidos ou parsing falha
   */
  public parseCharacter(data: unknown): Character {
    if (!data || typeof data !== 'object') {
      throw new Error('Dados de personagem inválidos: deve ser um objeto');
    }

    const characterData = data as Record<string, unknown>;

    // Parseia CharacterBasic
    const basic = this.parseCharacterBasic(characterData);

    // Parseia CharacterProfile
    const profile = this.parseCharacterProfile(characterData.profile);

    // Parseia CharacterAttributes
    const attributes = this.parseCharacterAttributes(characterData.attributes);

    return {
      basic,
      profile,
      attributes,
    };
  }

  /**
   * Parseia dados básicos do personagem
   */
  private parseCharacterBasic(data: Record<string, unknown>): CharacterBasic {
    const version = this.extractNumber(data.version, 'version');
    const id = this.extractString(data.id, 'id');
    const totalPoints = this.extractNumber(data.total_points, 'total_points');
    const createdDate = this.extractString(data.created_date, 'created_date');
    const modifiedDate = this.extractString(data.modified_date, 'modified_date');

    return new CharacterBasic({
      version,
      id,
      totalPoints,
      createdDate,
      modifiedDate,
    });
  }

  /**
   * Parseia dados de perfil do personagem
   */
  private parseCharacterProfile(profileData: unknown): CharacterProfile {
    if (!profileData || typeof profileData !== 'object') {
      throw new Error('Dados de perfil inválidos: deve ser um objeto');
    }

    const profile = profileData as Record<string, unknown>;

    const name = this.extractString(profile.name, 'profile.name');
    const playerName = this.extractString(profile.player_name, 'profile.player_name');
    const age = this.extractOptionalNumber(profile.age, 'profile.age') || undefined;
    const birthday = this.extractOptionalString(profile.birthday, 'profile.birthday') || undefined;
    const eyes = this.extractOptionalString(profile.eyes, 'profile.eyes') || undefined;
    const hair = this.extractOptionalString(profile.hair, 'profile.hair') || undefined;
    const skin = this.extractOptionalString(profile.skin, 'profile.skin') || undefined;
    const handedness = this.extractOptionalString(profile.handedness, 'profile.handedness') || undefined;
    const gender = this.extractOptionalString(profile.gender, 'profile.gender') || undefined;
    const height = this.extractOptionalNumber(profile.height, 'profile.height') || undefined;
    const weight = this.extractOptionalNumber(profile.weight, 'profile.weight') || undefined;
    const techLevel = this.extractOptionalNumber(profile.tech_level, 'profile.tech_level') || undefined;
    const portrait = this.extractOptionalString(profile.portrait, 'profile.portrait') || undefined;

    // Construir objeto condicionalmente para evitar undefined com exactOptionalPropertyTypes
    const profileObj: Record<string, any> = {
      name,
      playerName,
    };

    if (age !== undefined) profileObj.age = age;
    if (birthday !== undefined) profileObj.birthday = birthday;
    if (eyes !== undefined) profileObj.eyes = eyes;
    if (hair !== undefined) profileObj.hair = hair;
    if (skin !== undefined) profileObj.skin = skin;
    if (handedness !== undefined) profileObj.handedness = handedness;
    if (gender !== undefined) profileObj.gender = gender;
    if (height !== undefined) profileObj.height = height;
    if (weight !== undefined) profileObj.weight = weight;
    if (techLevel !== undefined) profileObj.techLevel = techLevel;
    if (portrait !== undefined) profileObj.portrait = portrait;

    return new CharacterProfile(profileObj as any);
  }

  /**
   * Parseia dados de atributos do personagem
   */
  private parseCharacterAttributes(attributesData: unknown): CharacterAttributes {
    if (!attributesData || !Array.isArray(attributesData)) {
      throw new Error('Dados de atributos inválidos: deve ser um array');
    }

    const attributes = attributesData as Array<Record<string, unknown>>;

    // Extrai valores básicos
    const st = this.extractAttributeValue(attributes, 'st');
    const dx = this.extractAttributeValue(attributes, 'dx');
    const iq = this.extractAttributeValue(attributes, 'iq');
    const ht = this.extractAttributeValue(attributes, 'ht');

    // Atributos secundários (opcionais, com defaults)
    const will = this.extractOptionalAttributeValue(attributes, 'will') || iq;
    const per = this.extractOptionalAttributeValue(attributes, 'per') || iq;

    // Atributos derivados (opcionais)
    const basicSpeed = this.extractOptionalAttributeValue(attributes, 'basic_speed');
    const basicMove = this.extractOptionalAttributeValue(attributes, 'basic_move');
    const hitPoints = this.extractOptionalAttributeValue(attributes, 'hp') || st;
    const fatiguePoints = this.extractOptionalAttributeValue(attributes, 'fp') || ht;
    const magicPoints = this.extractOptionalAttributeValue(attributes, 'magic_points');

    // Construir objeto condicionalmente para evitar undefined com exactOptionalPropertyTypes
    const attributesObj: Record<string, any> = {
      st,
      dx,
      iq,
      ht,
      will,
      per,
      hitPoints,
      fatiguePoints,
    };

    if (basicSpeed !== undefined) attributesObj.basicSpeed = basicSpeed;
    if (basicMove !== undefined) attributesObj.basicMove = basicMove;
    if (magicPoints !== undefined) attributesObj.magicPoints = magicPoints;

    return new CharacterAttributes(attributesObj as any);
  }

  /**
   * Extrai valor de atributo do array de attributes
   */
  private extractAttributeValue(attributes: Array<Record<string, unknown>>, attrId: string): number {
    const attr = attributes.find(a => a.attr_id === attrId);
    if (!attr || !attr.calc || typeof attr.calc !== 'object') {
      throw new Error(`Atributo ${attrId} não encontrado ou inválido`);
    }

    const calc = attr.calc as Record<string, unknown>;
    const value = this.extractNumber(calc.value, `attributes.${attrId}.calc.value`);
    return value;
  }

  /**
   * Extrai valor de atributo opcional do array de attributes
   */
  private extractOptionalAttributeValue(attributes: Array<Record<string, unknown>>, attrId: string): number | undefined {
    const attr = attributes.find(a => a.attr_id === attrId);
    if (!attr || !attr.calc || typeof attr.calc !== 'object') {
      return undefined;
    }

    const calc = attr.calc as Record<string, unknown>;
    const value = this.extractNumber(calc.value, `attributes.${attrId}.calc.value`);
    return value;
  }

  /**
   * Extrai string obrigatória
   */
  private extractString(value: unknown, field: string): string {
    if (typeof value !== 'string' || value.trim() === '') {
      throw new Error(`Campo obrigatório ausente ou inválido: ${field}`);
    }
    return value.trim();
  }

  /**
   * Extrai string opcional
   */
  private extractOptionalString(value: unknown, field: string): string | null {
    if (value === undefined || value === null) {
      return null;
    }
    if (typeof value !== 'string') {
      throw new Error(`Campo ${field} deve ser string ou null`);
    }
    return value.trim() || null;
  }

  /**
   * Extrai número obrigatório
   */
  private extractNumber(value: unknown, field: string): number {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(`Campo obrigatório numérico inválido: ${field} (recebido: ${typeof value})`);
    }
    return value;
  }

  /**
   * Extrai número opcional
   */
  private extractOptionalNumber(value: unknown, field: string): number | null {
    if (value === undefined || value === null) {
      return null;
    }
    if (typeof value === 'string') {
      // Para height, converte de pés e polegadas para metros (aproximado)
      if (field.includes('height')) {
        const match = value.match(/(\d+)'(\d*\.?\d*)/);
        if (match) {
          const feet = parseFloat(match[1]);
          const inches = parseFloat(match[2] || '0');
          return feet * 0.3048 + inches * 0.0254; // Conversão para metros
        }
      }
      // Para weight, converte de lb para kg
      if (field.includes('weight')) {
        const match = value.match(/(\d+)/);
        if (match) {
          const pounds = parseFloat(match[1]);
          return pounds * 0.453592; // Conversão para kg
        }
      }
      // Para outros campos, remove unidades e converte
      const cleanValue = value.replace(/[^\d.-]/g, '');
      const parsed = parseFloat(cleanValue);
      if (isNaN(parsed)) {
        throw new Error(`Campo ${field} não é um número válido: ${value}`);
      }
      return parsed;
    }
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(`Campo ${field} deve ser número ou null`);
    }
    return value;
  }
}