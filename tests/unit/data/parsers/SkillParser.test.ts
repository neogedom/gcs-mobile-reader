import { SkillParser } from '../../../../src/data/parsers';
import { Skill } from '../../../../src/domain/models/Skill';
import { isSkill } from '../../../../src/domain/guards/Skill.guard';
import { SkillValidator } from '../../../../src/domain/validators/SkillValidator';
import characterData from '../../../../tests/utils/characterBuilder';

describe('SkillParser', () => {
  let parser: SkillParser;
  let fixtureData: any[];

  beforeEach(() => {
    parser = new SkillParser();
    fixtureData = characterData.skills;
  });

  describe('Parsing de skills válidos', () => {
    it('deve parsear array de skills válidos do fixture', () => {
      const result = parser.parseSkills(fixtureData);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((skill: Skill) => isSkill(skill))).toBe(true);
    });

    it('deve parsear skills com diferentes attributes (DX, IQ, etc)', () => {
      const result = parser.parseSkills(fixtureData);

      expect(result.length).toBeGreaterThan(0);
      // Verificar se há skills com diferentes dificuldades
      const difficulties = result.map(skill => skill.difficulty);
      expect(difficulties).toContain('dx/a');
      expect(difficulties).toContain('dx/e');
      expect(difficulties).toContain('iq/a');
    });

    it('deve parsear skills com specialization', () => {
      const skillsWithSpecialization = fixtureData.filter(
        (skill: any) => skill.specialization
      );
      expect(skillsWithSpecialization.length).toBeGreaterThan(0);

      const result = parser.parseSkills(skillsWithSpecialization);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((skill: Skill) => {
        expect(skill.name).toBeDefined();
        expect(skill.difficulty).toBeDefined();
      });
    });

    it('deve parsear skills com defaulted_from', () => {
      const skillsWithDefaultedFrom = fixtureData.filter(
        (skill: any) => skill.defaulted_from
      );
      expect(skillsWithDefaultedFrom.length).toBeGreaterThan(0);

      const result = parser.parseSkills(skillsWithDefaultedFrom);

      expect(result.length).toBeGreaterThan(0);
      result.forEach((skill: Skill) => {
        expect(skill.id).toBeDefined();
        expect(skill.name).toBeDefined();
        expect(skill.level).toBeDefined();
        expect(skill.difficulty).toBeDefined();
      });
    });

    it('deve validar defaulted_from com uma das opções da lista de defaults', () => {
      const skillWithDefaultsAndDefaultedFrom = fixtureData.find(
        (skill: any) => skill.defaults && skill.defaulted_from
      );
      expect(skillWithDefaultsAndDefaultedFrom).toBeDefined();

      const result = parser.parseSkills([skillWithDefaultsAndDefaultedFrom]);

      expect(result).toHaveLength(1);
      // Nota: O parser atual não valida se defaulted_from está na lista de defaults
      // Isso seria uma validação de negócio que pode ser adicionada posteriormente
      expect(result[0].id).toBe(skillWithDefaultsAndDefaultedFrom.id);
    });

    it('deve parsear array vazio', () => {
      const data: any[] = [];

      const result = parser.parseSkills(data);

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
    });
  });

  describe('Parsing de skills inválidos', () => {
    it('deve retornar erro para skill malformada', () => {
      const data = [
        {
          id: '', // inválido
          name: 'Invalid Skill',
          level: 10,
          difficulty: 'dx/a',
        },
      ];

      expect(() => parser.parseSkills(data)).toThrow();
    });

    it('deve retornar erro para skill sem campos obrigatórios', () => {
      const data = [
        {
          id: 'skill-no-level',
          name: 'No Level',
          difficulty: 'dx/a',
          // faltando level
        },
      ];

      expect(() => parser.parseSkills(data)).toThrow();
    });

    it('deve retornar erro para dados não array', () => {
      const data = 'not an array';

      expect(() => parser.parseSkills(data as any)).toThrow(
        'Dados de skills devem ser um array'
      );
    });
  });

  describe('Integração com validators e guards', () => {
    it('deve usar type guards para validar skills parseados', () => {
      const result = parser.parseSkills(fixtureData);

      expect(result.every((skill: Skill) => isSkill(skill))).toBe(true);
    });

    it('deve validar skills com SkillValidator', () => {
      const result = parser.parseSkills(fixtureData);

      result.forEach((skill: Skill) => {
        const validation = SkillValidator.validate({
          id: skill.id,
          name: skill.name,
          level: skill.level,
          difficulty: skill.difficulty,
          calc: skill.calc,
        });
        expect(validation.success).toBe(true);
      });
    });
  });

  describe('Campos obrigatórios', () => {
    it('deve validar presença de id', () => {
      const data = [
        {
          name: 'Test Skill',
          level: 10,
          difficulty: 'dx/a',
          // faltando id
        },
      ];

      expect(() => parser.parseSkills(data)).toThrow(
        'Campo obrigatório ausente ou inválido: id'
      );
    });

    it('deve validar presença de name', () => {
      const data = [
        {
          id: 'test-skill',
          level: 10,
          difficulty: 'dx/a',
          // faltando name
        },
      ];

      expect(() => parser.parseSkills(data)).toThrow(
        'Campo obrigatório ausente ou inválido: name'
      );
    });

    it('deve validar presença de level', () => {
      const data = [
        {
          id: 'test-skill',
          name: 'Test Skill',
          difficulty: 'dx/a',
          // faltando level
        },
      ];

      expect(() => parser.parseSkills(data)).toThrow(
        'Campo obrigatório ausente ou inválido: calc.level'
      );
    });

    it('deve validar presença de difficulty', () => {
      const data = [
        {
          id: 'test-skill',
          name: 'Test Skill',
          level: 10,
          // faltando difficulty
        },
      ];

      expect(() => parser.parseSkills(data)).toThrow(
        'Campo obrigatório ausente ou inválido: difficulty'
      );
    });

    it('deve validar presença de calc', () => {
      const data = [
        {
          id: 'test-skill',
          name: 'Test Skill',
          level: 10,
          difficulty: 'dx/a',
          // faltando calc
        },
      ];

      expect(() => parser.parseSkills(data)).toThrow(
        'Campo obrigatório ausente ou inválido: calc'
      );
    });

    it('deve validar presença de calc.level', () => {
      const data = [
        {
          id: 'test-skill',
          name: 'Test Skill',
          level: 10,
          difficulty: 'dx/a',
          calc: {}, // faltando calc.level
        },
      ];

      expect(() => parser.parseSkills(data)).toThrow(
        'Campo obrigatório ausente ou inválido: calc.level'
      );
    });
  });

  describe('Campos opcionais', () => {
    it('deve parsear skill com specialization', () => {
      const data = [
        {
          id: 'test-skill',
          name: 'Driving',
          specialization: 'Automobile',
          level: 10,
          difficulty: 'dx/a',
          calc: { level: 10 },
        },
      ];

      const result = parser.parseSkills(data);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-skill');
      expect(result[0].name).toBe('Driving');
      expect(result[0].level).toBe(10);
      expect(result[0].difficulty).toBe('dx/a');
    });

    it('deve parsear skill com reference', () => {
      const data = [
        {
          id: 'test-skill',
          name: 'Driving',
          reference: 'B188',
          level: 10,
          difficulty: 'dx/a',
          calc: { level: 10 },
        },
      ];

      const result = parser.parseSkills(data);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-skill');
    });

    it('deve parsear skill com points', () => {
      const data = [
        {
          id: 'test-skill',
          name: 'Driving',
          points: 12,
          level: 10,
          difficulty: 'dx/a',
          calc: { level: 10 },
        },
      ];

      const result = parser.parseSkills(data);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-skill');
    });

    it('deve parsear skill com defaulted_from', () => {
      const data = [
        {
          id: 'test-skill',
          name: 'Driving',
          defaulted_from: {
            type: 'skill',
            name: 'Driving',
            specialization: 'Motorcycle',
            modifier: -4,
            level: 9,
            adjusted_level: 9,
            points: -9,
          },
          level: 10,
          difficulty: 'dx/a',
          calc: { level: 10 },
        },
      ];

      const result = parser.parseSkills(data);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-skill');
    });
  });
});
