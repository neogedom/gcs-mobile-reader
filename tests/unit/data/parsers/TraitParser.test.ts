import { TraitParser } from '../../../../src/data/parsers';
import { Trait } from '../../../../src/domain/models/Trait';
import { isTrait } from '../../../../src/domain/guards/Trait.guard';
import { TraitValidator } from '../../../../src/domain/validators/TraitValidator';
import characterData from '../../../../tests/utils/characterBuilder';

describe('TraitParser', () => {
  let parser: TraitParser;
  let fixtureData: any[];

  beforeEach(() => {
    parser = new TraitParser();
    fixtureData = characterData.traits;
  });

  describe('Parsing de traits válidos', () => {
    it('deve parsear array de traits válidos do fixture', () => {
      const result = parser.parseTraits(fixtureData);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((trait: Trait) => isTrait(trait))).toBe(true);
    });

    it('deve parsear trait com replacements quando nome tem @', () => {
      const data = fixtureData.filter((trait: any) => trait.name.includes('@'));
      expect(data.length).toBeGreaterThan(0);

      const result = parser.parseTraits(data);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((trait: Trait) => {
        if (trait.name.includes('@')) {
          expect(trait.replacements).toBeDefined();
          expect(Object.keys(trait.replacements!)).toHaveLength(1);
        }
      });
    });

    it('deve parsear disadvantage com points negativos', () => {
      const data = fixtureData.filter(
        (trait: any) => trait.tags && trait.tags.includes('Disadvantage')
      );
      expect(data.length).toBeGreaterThan(0);

      const result = parser.parseTraits(data);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((trait: Trait) => {
        if (trait.basePoints !== undefined) {
          expect(trait.basePoints).toBeLessThan(0);
        }
        expect(trait.calc.points).toBeLessThan(0);
        expect(trait.tags).toContain('Disadvantage');
      });
    });

    it('deve parsear advantage com points positivos', () => {
      const data = fixtureData.filter(
        (trait: any) => trait.tags && trait.tags.includes('Advantage')
      );
      expect(data.length).toBeGreaterThan(0);

      const result = parser.parseTraits(data);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((trait: Trait) => {
        if (trait.basePoints !== undefined) {
          expect(trait.basePoints).toBeGreaterThan(0);
        }
        // Language é considerada advantage e tem calc.points negativo
        // expect(trait.calc.points).toBeGreaterThan(0);
        expect(trait.tags).toContain('Advantage');
      });
    });

    it('deve parsear trait com level', () => {
      const data = fixtureData.filter((trait: any) => trait.can_level);
      expect(data.length).toBeGreaterThan(0);

      const result = parser.parseTraits(data);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((trait: Trait) => {
        expect(trait.canLevel).toBe(true);
        expect(trait.pointsPerLevel).toBeDefined();
        expect(trait.levels).toBeDefined();
      });
    });

    //TODO: Criar parser de children
    it('deve parsear trait container com children', () => {
      const data = fixtureData.filter((trait: any) => trait.children);
      expect(data.length).toBeGreaterThan(0);

      const result = parser.parseTraits(data);

      expect(result.length).toBeGreaterThan(0);
      // Nota: O parser atual não processa children, mas deve parsear o trait principal
      result.forEach((trait: Trait) => {
        expect(trait.id).toBeDefined();
        expect(trait.name).toBeDefined();
      });
    });

    it('deve parsear array vazio', () => {
      const data: any[] = [];

      const result = parser.parseTraits(data);

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
    });
  });

  describe('Parsing de traits inválidos', () => {
    it('deve retornar erro para trait malformado', () => {
      const data = [
        {
          id: '', // inválido
          name: 'Invalid Trait',
          base_points: 5,
          calc: { points: 5 },
          tags: ['Advantage'],
        },
      ];

      expect(() => parser.parseTraits(data)).toThrow();
    });

    it('deve retornar erro para trait sem calc.points', () => {
      const data = [
        {
          id: 'trait-no-calc',
          name: 'No Calc',
          base_points: 5,
          calc: {}, // inválido
          tags: ['Advantage'],
        },
      ];

      expect(() => parser.parseTraits(data)).toThrow();
    });

    it('deve retornar erro para trait com replacements mas sem @ no nome', () => {
      const data = [
        {
          id: 'trait-no-at',
          name: 'No At Symbol',
          base_points: 5,
          calc: { points: 5 },
          tags: ['Advantage'],
          replacements: { Substance: 'test' },
        },
      ];

      // O parser deve validar se há @ no nome quando há replacements
      expect(() => parser.parseTraits(data)).toThrow();
    });
  });

  describe('Integração com validators e guards', () => {
    it('deve usar type guards para validar traits parseados', () => {
      const result = parser.parseTraits(fixtureData);

      expect(result.every((trait: Trait) => isTrait(trait))).toBe(true);
    });

    it('deve validar traits com TraitValidator', () => {
      const result = parser.parseTraits(fixtureData);

      result.forEach((trait: Trait) => {
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
          canLevel: trait.canLevel,
          pointsPerLevel: trait.pointsPerLevel,
          levels: trait.levels,
        });
        expect(validation.success).toBe(true);
      });
    });
  });
});
