import { CharacterBasic } from '../../../../src/domain/models/CharacterBasic';

describe('CharacterBasic', () => {
  // ✅ Testes de criação válida
  describe('criação válida', () => {
    it('deve criar CharacterBasic com dados válidos', () => {
      const data = {
        version: 5,
        id: 'test-id-123',
        totalPoints: 150,
        createdDate: '2025-01-01T10:00:00Z',
        modifiedDate: '2025-01-02T10:00:00Z',
      };

      const character = new CharacterBasic(data);

      expect(character.version).toBe(5);
      expect(character.id).toBe('test-id-123');
      expect(character.totalPoints).toBe(150);
      expect(character.createdDate).toBe('2025-01-01T10:00:00Z');
      expect(character.modifiedDate).toBe('2025-01-02T10:00:00Z');
    });

    it('deve congelar o objeto após criação', () => {
      const character = new CharacterBasic({
        version: 5,
        id: 'test-id',
        totalPoints: 100,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      });

      expect(() => {
        (character as any).version = 10;
      }).toThrow();
    });
  });

  // ✅ Testes de validação
  describe('validação de dados', () => {
    it('deve lançar erro com múltiplos campos inválidos', () => {
      const invalidData = {
        version: -1, // ❌ Inválido
        id: '', // ❌ Inválido
        totalPoints: -10, // ❌ Inválido
        createdDate: '', // ❌ Inválido
        modifiedDate: '', // ❌ Inválido
      };

      expect(() => new CharacterBasic(invalidData as any)).toThrow(
        'Erros de validação:\nCampo version deve ser um número positivo, recebido: -1\nCampo obrigatório ausente: id\nCampo totalPoints deve ser um número não negativo, recebido: -10\nCampo obrigatório ausente: createdDate\nCampo obrigatório ausente: modifiedDate'
      );
    });

    it('deve aceitar zero pontos', () => {
      const character = new CharacterBasic({
        version: 5,
        id: 'zero-points',
        totalPoints: 0, // ✅ Válido
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      });

      expect(character.totalPoints).toBe(0);
    });
  });

  // ✅ Testes dos métodos auxiliares
  describe('métodos auxiliares', () => {
    const character1 = new CharacterBasic({
      version: 5,
      id: 'test-id',
      totalPoints: 150,
      createdDate: '2025-01-01T00:00:00Z',
      modifiedDate: '2025-01-01T00:00:00Z',
    });

    const character2 = new CharacterBasic({
      version: 5,
      id: 'test-id',
      totalPoints: 150,
      createdDate: '2025-01-01T00:00:00Z',
      modifiedDate: '2025-01-01T00:00:00Z',
    });

    const character3 = new CharacterBasic({
      version: 4,
      id: 'different-id',
      totalPoints: 200,
      createdDate: '2025-01-01T00:00:00Z',
      modifiedDate: '2025-01-01T00:00:00Z',
    });

    it('deve identificar personagens iguais', () => {
      expect(character1.equals(character2)).toBe(true);
    });

    it('deve identificar personagens diferentes', () => {
      expect(character1.equals(character3)).toBe(false);
      expect(character1.equals(null as any)).toBe(false);
      expect(character1.equals(undefined as any)).toBe(false);
    });

    it('deve gerar representação em string correta', () => {
      expect(character1.toString()).toBe(
        'CharacterBasic{v5 "test-id" - 150pts}'
      );
    });
  });

  // ✅ Testes de casos extremos
  describe('casos extremos', () => {
    it('deve validar tipos extremos de ID', () => {
      const character = new CharacterBasic({
        version: 5,
        id: 'a', // ✅ ID mínimo válido
        totalPoints: 100,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      });

      expect(character.id).toBe('a');
    });

    it('deve aceitar ID com caracteres especiais', () => {
      const character = new CharacterBasic({
        version: 5,
        id: 'test_id-123.456',
        totalPoints: 100,
        createdDate: '2025-01-01T00:00:00Z',
        modifiedDate: '2025-01-01T00:00:00Z',
      });

      expect(character.id).toBe('test_id-123.456');
    });
  });
});
