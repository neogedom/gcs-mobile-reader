import { CharacterProfile } from '../../../../src/domain/models/CharacterProfile';

describe('CharacterProfile', () => {
  describe('criação válida', () => {
    it('deve criar CharacterProfile com dados mínimos', () => {
      const data = {
        name: 'Edy Wilmont',
        playerName: 'Vinicius',
      };

      const profile = new CharacterProfile(data);

      expect(profile.name).toBe('Edy Wilmont');
      expect(profile.playerName).toBe('Vinicius');
      expect(profile.age).toBeNull();
      expect(profile.height).toBeNull();
      expect(profile.weight).toBeNull();
    });

    it('deve criar CharacterProfile com todos os dados', () => {
      const data = {
        name: 'Edy Wilmont',
        playerName: 'Vinicius',
        age: 25,
        birthday: 'January 20',
        eyes: 'Brown',
        hair: 'Black',
        skin: 'Freckled',
        handedness: 'Right',
        gender: 'Male',
        height: 165,
        weight: 70,
        techLevel: 3,
      };

      const profile = new CharacterProfile(data);

      expect(profile.name).toBe('Edy Wilmont');
      expect(profile.age).toBe(25);
      expect(profile.height).toBe(165);
      expect(profile.weight).toBe(70);
      expect(profile.techLevel).toBe(3);
    });

    it('deve congelar o objeto após criação', () => {
      const profile = new CharacterProfile({
        name: 'Test',
        playerName: 'Player',
      });

      expect(() => {
        (profile as any).name = 'Changed';
      }).toThrow();
    });
  });

  describe('validação de dados', () => {
    it('deve lançar erro com campos obrigatórios ausentes', () => {
      const invalidData = {
        name: '', // ❌ Inválido
        playerName: '', // ❌ Inválido
      };

      expect(() => new CharacterProfile(invalidData as any)).toThrow(
        'Erros de validação no perfil:\nCampo obrigatório ausente: name\nCampo obrigatório ausente: playerName'
      );
    });

    it('deve aceitar valores zero para campos numéricos', () => {
      const profile = new CharacterProfile({
        name: 'Test',
        playerName: 'Player',
        age: 0, // ✅ Válido
        height: 0, // ✅ Válido
        weight: 0, // ✅ Válido
      });

      expect(profile.age).toBe(0);
      expect(profile.height).toBe(0);
    });
  });
});
