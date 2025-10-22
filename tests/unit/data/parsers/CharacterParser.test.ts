import { CharacterParser } from '../../../../src/data/parsers/CharacterParser';
import { Character } from '../../../../src/domain/models/Character';
import { CharacterBasic } from '../../../../src/domain/models/CharacterBasic';
import { CharacterProfile } from '../../../../src/domain/models/CharacterProfile';
import { CharacterAttributes } from '../../../../src/domain/models/CharacterAttributes';

describe('CharacterParser', () => {
  let parser: CharacterParser;

  beforeEach(() => {
    parser = new CharacterParser();
  });

  describe('Parsing de personagem completo', () => {
    it('deve parsear personagem completo com todos os campos', () => {
      const data = {
        version: 5,
        id: 'A_DARLDjFPJ62fz2I',
        total_points: 300,
        created_date: '2025-06-12T18:27:42-03:00',
        modified_date: '2025-06-28T16:13:15-03:00',
        profile: {
          name: 'Edy Wilmont (MotorFace)',
          age: '229',
          birthday: 'January 20',
          eyes: 'Brown',
          hair: 'Black',
          skin: 'Freckled',
          handedness: 'Right',
          gender: 'Male',
          height: '5\'1.2"',
          weight: '140 lb',
          player_name: 'Vinícius Gomes Ferreira',
          tech_level: '3',
          portrait: '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'
        },
        attributes: [
          {
            attr_id: 'st',
            adj: 2,
            calc: {
              value: 12,
              points: 20
            }
          },
          {
            attr_id: 'dx',
            adj: 3,
            calc: {
              value: 13,
              points: 60
            }
          },
          {
            attr_id: 'iq',
            adj: 2,
            calc: {
              value: 12,
              points: 40
            }
          },
          {
            attr_id: 'ht',
            adj: 3,
            calc: {
              value: 13,
              points: 30
            }
          },
          {
            attr_id: 'will',
            adj: 0,
            calc: {
              value: 12,
              points: 0
            }
          },
          {
            attr_id: 'per',
            adj: 0,
            calc: {
              value: 12,
              points: 0
            }
          },
          {
            attr_id: 'basic_speed',
            adj: 0,
            calc: {
              value: 6.5,
              points: 0
            }
          },
          {
            attr_id: 'basic_move',
            adj: 0,
            calc: {
              value: 6,
              points: 0
            }
          },
          {
            attr_id: 'fp',
            adj: 0,
            calc: {
              value: 13,
              current: 13,
              points: 0
            }
          },
          {
            attr_id: 'hp',
            adj: 0,
            calc: {
              value: 12,
              current: 12,
              points: 0
            }
          }
        ]
      };

      const result = parser.parseCharacter(data);

      expect(result).toBeInstanceOf(Object); // Assuming it returns Character
      expect(result.basic).toBeInstanceOf(CharacterBasic);
      expect(result.profile).toBeInstanceOf(CharacterProfile);
      expect(result.attributes).toBeInstanceOf(CharacterAttributes);

      expect(result.basic.version).toBe(5);
      expect(result.basic.id).toBe('A_DARLDjFPJ62fz2I');
      expect(result.basic.totalPoints).toBe(300);
      expect(result.basic.createdDate).toBe('2025-06-12T18:27:42-03:00');
      expect(result.basic.modifiedDate).toBe('2025-06-28T16:13:15-03:00');

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
      const data = {
        version: 5,
        id: 'min-id',
        total_points: 0,
        created_date: '2025-01-01T00:00:00Z',
        modified_date: '2025-01-01T00:00:00Z',
        profile: {
          name: 'Minimal Character',
          player_name: 'Player'
        },
        attributes: [
          {
            attr_id: 'st',
            adj: 0,
            calc: {
              value: 10,
              points: 0
            }
          },
          {
            attr_id: 'dx',
            adj: 0,
            calc: {
              value: 10,
              points: 0
            }
          },
          {
            attr_id: 'iq',
            adj: 0,
            calc: {
              value: 10,
              points: 0
            }
          },
          {
            attr_id: 'ht',
            adj: 0,
            calc: {
              value: 10,
              points: 0
            }
          }
        ]
      };

      const result = parser.parseCharacter(data);

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
      const data = {
        version: 5,
        id: 'attr-id',
        total_points: 100,
        created_date: '2025-01-01T00:00:00Z',
        modified_date: '2025-01-01T00:00:00Z',
        profile: {
          name: 'Attribute Test',
          player_name: 'Player'
        },
        attributes: [
          {
            attr_id: 'st',
            adj: 1,
            calc: {
              value: 11,
              points: 10
            }
          },
          {
            attr_id: 'dx',
            adj: 2,
            calc: {
              value: 12,
              points: 40
            }
          },
          {
            attr_id: 'iq',
            adj: 1,
            calc: {
              value: 11,
              points: 20
            }
          },
          {
            attr_id: 'ht',
            adj: 1,
            calc: {
              value: 11,
              points: 10
            }
          },
          {
            attr_id: 'will',
            adj: 1,
            calc: {
              value: 11,
              points: 5
            }
          },
          {
            attr_id: 'per',
            adj: 1,
            calc: {
              value: 11,
              points: 5
            }
          },
          {
            attr_id: 'basic_speed',
            adj: 0,
            calc: {
              value: 5.75,
              points: 0
            }
          },
          {
            attr_id: 'basic_move',
            adj: 0,
            calc: {
              value: 5,
              points: 0
            }
          },
          {
            attr_id: 'hp',
            adj: 0,
            calc: {
              value: 11,
              current: 11,
              points: 0
            }
          },
          {
            attr_id: 'fp',
            adj: 0,
            calc: {
              value: 11,
              current: 11,
              points: 0
            }
          }
        ]
      };

      const result = parser.parseCharacter(data);

      expect(result.attributes.st).toBe(11);
      expect(result.attributes.dx).toBe(12);
      expect(result.attributes.iq).toBe(11);
      expect(result.attributes.ht).toBe(11);
      expect(result.attributes.will).toBe(11);
      expect(result.attributes.per).toBe(11);
      expect(result.attributes.basicSpeed).toBe(5.75);
      expect(result.attributes.basicMove).toBe(5);
      expect(result.attributes.hitPoints).toBe(11);
      expect(result.attributes.fatiguePoints).toBe(11);
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
          player_name: ''
        },
        attributes: []
      };

      expect(() => parser.parseCharacter(invalidData as any)).toThrow();
    });
  });
});