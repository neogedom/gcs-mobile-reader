import { CharacterParser } from '../../../../src/data/parsers';
import { CharacterBasic } from '../../../../src/domain/models/CharacterBasic';
import { CharacterProfile } from '../../../../src/domain/models/CharacterProfile';
import { CharacterAttributes } from '../../../../src/domain/models/CharacterAttributes';
import characterData from '../../../../tests/utils/characterBuilder';

describe('CharacterParser', () => {
  let parser: CharacterParser;

  beforeEach(() => {
    parser = new CharacterParser();
  });

  describe('Parsing de personagem completo', () => {
    it('deve parsear personagem completo com todos os campos', () => {
      const result = parser.parseCharacter(characterData);

      expect(result).toBeInstanceOf(Object); // Assuming it returns Character
      expect(result.basic).toBeInstanceOf(CharacterBasic);
      expect(result.profile).toBeInstanceOf(CharacterProfile);
      expect(result.attributes).toBeInstanceOf(CharacterAttributes);

      expect(result.basic.version).toBe(5);
      expect(result.basic.id).toBe('A_DARLDjFPJ62fz2I');
      expect(result.basic.totalPoints).toBe(300);
      expect(result.basic.createdDate).toBe('2025-06-12T18:27:42-03:00');
      expect(result.basic.modifiedDate).toBe('2025-10-28T20:26:24-03:00');

      expect(result.profile.name).toBe('Edy Wilmont (MotorFace)');
      expect(result.profile.playerName).toBe('Vinícius Gomes Ferreira');
      expect(result.profile.age).toBe(229);
      expect(result.profile.height).toBeCloseTo(1.55, 1);
      expect(result.profile.weight).toBeCloseTo(63.5, 1);
      expect(result.profile.techLevel).toBe(3);

      expect(result.attributes.st).toBe(12);
      expect(result.attributes.dx).toBe(13);
      expect(result.attributes.iq).toBe(12);
      expect(result.attributes.ht).toBe(13);
    });

    it('deve parsear personagem mínimo com campos obrigatórios', () => {
      const minimalData = {
        version: 5,
        id: 'min-id',
        total_points: 0,
        created_date: '2025-01-01T00:00:00Z',
        modified_date: '2025-01-01T00:00:00Z',
        profile: {
          name: 'Minimal Character',
          player_name: 'Player',
        },
        attributes: [
          {
            attr_id: 'st',
            adj: 0,
            calc: {
              value: 10,
              points: 0,
            },
          },
          {
            attr_id: 'dx',
            adj: 0,
            calc: {
              value: 10,
              points: 0,
            },
          },
          {
            attr_id: 'iq',
            adj: 0,
            calc: {
              value: 10,
              points: 0,
            },
          },
          {
            attr_id: 'ht',
            adj: 0,
            calc: {
              value: 10,
              points: 0,
            },
          },
        ],
      };

      const result = parser.parseCharacter(minimalData);

      expect(result.basic.version).toBe(5);
      expect(result.basic.id).toBe('min-id');
      expect(result.basic.totalPoints).toBe(0);
      expect(result.profile.name).toBe('Minimal Character');
      expect(result.attributes.st).toBe(10);
      expect(result.attributes.dx).toBe(10);
      expect(result.attributes.iq).toBe(10);
      expect(result.attributes.ht).toBe(10);
    });

    it('deve parsear personagem com attributes', () => {
      const result = parser.parseCharacter(characterData);

      expect(result.attributes.st).toBe(12);
      expect(result.attributes.dx).toBe(13);
      expect(result.attributes.iq).toBe(12);
      expect(result.attributes.ht).toBe(13);
      expect(result.attributes.will).toBe(12);
      expect(result.attributes.per).toBe(12);
      expect(result.attributes.basicSpeed).toBe(6.5);
      expect(result.attributes.basicMove).toBe(6);
      expect(result.attributes.hitPoints).toBe(12);
      expect(result.attributes.fatiguePoints).toBe(13);
    });

    it('deve lançar erro para dados inválidos', () => {
      const invalidData = {
        version: 'invalid',
        id: null,
        total_points: -1,
        created_date: '',
        modified_date: '',
        profile: {
          name: '',
          player_name: '',
        },
        attributes: [],
      };

      expect(() => parser.parseCharacter(invalidData as any)).toThrow();
    });
  });

  describe('Parsing de personagem inválido', () => {
    it('deve lançar erro se atributos negativos', () => {
      const invalidData = {
        version: 5,
        id: 'invalid-id',
        profile: {
          name: 'Invalid Character',
          player_name: 'Player',
        },
        attributes: [
          {
            attr_id: 'st',
            adj: 0,
            calc: {
              value: -10,
              points: 0,
            },
          },
          {
            attr_id: 'dx',
            adj: 0,
            calc: {
              value: 10,
              points: 0,
            },
          },
          {
            attr_id: 'iq',
            adj: 0,
            calc: {
              value: 10,
              points: 0,
            },
          },
          {
            attr_id: 'ht',
            adj: 0,
            calc: {
              value: 10,
              points: 0,
            },
          },
        ],
      };
      expect(() => parser.parseCharacter(invalidData as any)).toThrow();
    });
  });
});
