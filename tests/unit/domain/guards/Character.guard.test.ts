import { isCharacter } from '../../../../src/domain/guards';
import { CharacterBasic } from '../../../../src/domain/models/CharacterBasic';
import { CharacterProfile } from '../../../../src/domain/models/CharacterProfile';
import { CharacterAttributes } from '../../../../src/domain/models/CharacterAttributes';

describe('isCharacter', () => {
  describe('objetos válidos', () => {
    it('deve retornar true para um personagem válido completo', () => {
      const basic = new CharacterBasic({
        version: 5,
        id: 'test-id',
        totalPoints: 150,
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-02',
      });

      const profile = new CharacterProfile({
        name: 'Test Character',
        playerName: 'Test Player',
      });

      const attributes = new CharacterAttributes({
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
      });

      const character = { basic, profile, attributes };

      expect(isCharacter(character)).toBe(true);
    });

    it('deve retornar true para personagem com dados mínimos', () => {
      const basic = new CharacterBasic({
        version: 5,
        id: 'min-id',
        totalPoints: 0,
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-01',
      });

      const profile = new CharacterProfile({
        name: 'Min Character',
        playerName: 'Min Player',
      });

      const attributes = new CharacterAttributes({
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
      });

      const character = { basic, profile, attributes };

      expect(isCharacter(character)).toBe(true);
    });
  });

  describe('campos faltando', () => {
    it('deve retornar false quando basic está ausente', () => {
      const profile = new CharacterProfile({
        name: 'Test Character',
        playerName: 'Test Player',
      });

      const attributes = new CharacterAttributes({
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
      });

      const character = { profile, attributes };

      expect(isCharacter(character)).toBe(false);
    });

    it('deve retornar false quando profile está ausente', () => {
      const basic = new CharacterBasic({
        version: 5,
        id: 'test-id',
        totalPoints: 150,
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-02',
      });

      const attributes = new CharacterAttributes({
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
      });

      const character = { basic, attributes };

      expect(isCharacter(character)).toBe(false);
    });

    it('deve retornar false quando attributes está ausente', () => {
      const basic = new CharacterBasic({
        version: 5,
        id: 'test-id',
        totalPoints: 150,
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-02',
      });

      const profile = new CharacterProfile({
        name: 'Test Character',
        playerName: 'Test Player',
      });

      const character = { basic, profile };

      expect(isCharacter(character)).toBe(false);
    });
  });

  describe('tipos errados', () => {
    it('deve retornar false quando basic não é CharacterBasic', () => {
      const profile = new CharacterProfile({
        name: 'Test Character',
        playerName: 'Test Player',
      });

      const attributes = new CharacterAttributes({
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
      });

      const character = { basic: 'invalid', profile, attributes };

      expect(isCharacter(character)).toBe(false);
    });

    it('deve retornar false quando profile não é CharacterProfile', () => {
      const basic = new CharacterBasic({
        version: 5,
        id: 'test-id',
        totalPoints: 150,
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-02',
      });

      const attributes = new CharacterAttributes({
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
      });

      const character = { basic, profile: 'invalid', attributes };

      expect(isCharacter(character)).toBe(false);
    });

    it('deve retornar false quando attributes não é CharacterAttributes', () => {
      const basic = new CharacterBasic({
        version: 5,
        id: 'test-id',
        totalPoints: 150,
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-02',
      });

      const profile = new CharacterProfile({
        name: 'Test Character',
        playerName: 'Test Player',
      });

      const character = { basic, profile, attributes: 'invalid' };

      expect(isCharacter(character)).toBe(false);
    });
  });

  describe('valores nulos/undefined', () => {
    it('deve retornar false quando character é null', () => {
      expect(isCharacter(null)).toBe(false);
    });

    it('deve retornar false quando character é undefined', () => {
      expect(isCharacter(undefined)).toBe(false);
    });

    it('deve retornar false quando basic é null', () => {
      const profile = new CharacterProfile({
        name: 'Test Character',
        playerName: 'Test Player',
      });

      const attributes = new CharacterAttributes({
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
      });

      const character = {
        basic: null as unknown as CharacterBasic,
        profile,
        attributes,
      };

      expect(isCharacter(character)).toBe(false);
    });

    it('deve retornar false quando profile é undefined', () => {
      const basic = new CharacterBasic({
        version: 5,
        id: 'test-id',
        totalPoints: 150,
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-02',
      });

      const attributes = new CharacterAttributes({
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
      });

      const character = {
        basic,
        profile: undefined as unknown as CharacterProfile,
        attributes,
      };

      expect(isCharacter(character)).toBe(false);
    });

    it('deve retornar false quando attributes é undefined', () => {
      const basic = new CharacterBasic({
        version: 5,
        id: 'test-id',
        totalPoints: 150,
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-02',
      });

      const profile = new CharacterProfile({
        name: 'Test Character',
        playerName: 'Test Player',
      });

      const character = {
        basic,
        profile,
        attributes: undefined as unknown as CharacterAttributes,
      };

      expect(isCharacter(character)).toBe(false);
    });
  });

  describe('casos limite', () => {
    it('deve retornar false para objeto vazio', () => {
      expect(isCharacter({})).toBe(false);
    });

    it('deve retornar false para string', () => {
      expect(isCharacter('invalid')).toBe(false);
    });

    it('deve retornar false para número', () => {
      expect(isCharacter(123)).toBe(false);
    });

    it('deve retornar false para array', () => {
      expect(isCharacter([])).toBe(false);
    });

    it('deve retornar true para objeto com propriedades extras', () => {
      const basic = new CharacterBasic({
        version: 5,
        id: 'test-id',
        totalPoints: 150,
        createdDate: '2023-01-01',
        modifiedDate: '2023-01-02',
      });

      const profile = new CharacterProfile({
        name: 'Test Character',
        playerName: 'Test Player',
      });

      const attributes = new CharacterAttributes({
        st: 10,
        dx: 10,
        iq: 10,
        ht: 10,
      });

      const character = { basic, profile, attributes, extra: 'field' };

      expect(isCharacter(character)).toBe(true); // Deve ser true, pois as propriedades extras não invalidam
    });
  });
});
