import { CharacterAttributes } from '../../../../src/domain/models/CharacterAttributes';

describe('CharacterAttributes', () => {
  // ✅ Testes de criação válida
  describe('criação válida', () => {
    it('deve criar CharacterAttributes com dados básicos válidos', () => {
      const data = {
        st: 10,
        dx: 12,
        iq: 14,
        ht: 11
      };

      const attributes = new CharacterAttributes(data);

      expect(attributes.st).toBe(10);
      expect(attributes.dx).toBe(12);
      expect(attributes.iq).toBe(14);
      expect(attributes.ht).toBe(11);
      expect(attributes.will).toBe(14); // Deve ser igual ao IQ por padrão
      expect(attributes.per).toBe(14);  // Deve ser igual ao IQ por padrão
    });

    it('deve criar CharacterAttributes com todos os dados', () => {
      const data = {
        st: 15,
        dx: 13,
        iq: 12,
        ht: 14,
        will: 15,
        per: 16,
        basicSpeed: 6.75,
        basicMove: 6,
        hitPoints: 18,
        fatiguePoints: 16,
        magicPoints: 8
      };

      const attributes = new CharacterAttributes(data);

      expect(attributes.st).toBe(15);
      expect(attributes.dx).toBe(13);
      expect(attributes.iq).toBe(12);
      expect(attributes.ht).toBe(14);
      expect(attributes.will).toBe(15);
      expect(attributes.per).toBe(16);
      expect(attributes.basicSpeed).toBe(6.75);
      expect(attributes.basicMove).toBe(6);
      expect(attributes.hitPoints).toBe(18);
      expect(attributes.fatiguePoints).toBe(16);
      expect(attributes.magicPoints).toBe(8);
    });

    it('deve calcular atributos derivados automaticamente', () => {
      const data = {
        st: 10,
        dx: 12,
        iq: 14,
        ht: 11
      };

      const attributes = new CharacterAttributes(data);

      // Basic Speed = (DX + HT) / 4 = (12 + 11) / 4 = 5.75
      expect(attributes.basicSpeed).toBe(5.75);
      // Basic Move = floor(Basic Speed) = 5
      expect(attributes.basicMove).toBe(5);
      // Hit Points = ST = 10
      expect(attributes.hitPoints).toBe(10);
      // Fatigue Points = HT = 11
      expect(attributes.fatiguePoints).toBe(11);
    });

    it('deve congelar o objeto após criação', () => {
      const attributes = new CharacterAttributes({
        st: 10,
        dx: 12,
        iq: 14,
        ht: 11
      });

      expect(() => {
        (attributes as any).st = 20;
      }).toThrow();
    });
  });

  // ✅ Testes de validação
  describe('validação de dados', () => {
    it('deve lançar erro com atributos básicos inválidos', () => {
      const invalidData = {
        st: 0,     // ❌ Inválido - deve ser > 0
        dx: -1,    // ❌ Inválido - deve ser > 0
        iq: 0,     // ❌ Inválido - deve ser > 0
        ht: -5     // ❌ Inválido - deve ser > 0
      };

      expect(() => new CharacterAttributes(invalidData as any)).toThrow();
    });

    it('deve aceitar valor mínimo válido (1) para atributos básicos', () => {
      const attributes = new CharacterAttributes({
        st: 1,
        dx: 1,
        iq: 1,
        ht: 1
      });

      expect(attributes.st).toBe(1);
      expect(attributes.dx).toBe(1);
      expect(attributes.iq).toBe(1);
      expect(attributes.ht).toBe(1);
    });

    it('deve aceitar atributos secundários válidos', () => {
      const attributes = new CharacterAttributes({
        st: 10,
        dx: 12,
        iq: 14,
        ht: 11,
        will: 16,
        per: 13
      });

      expect(attributes.will).toBe(16);
      expect(attributes.per).toBe(13);
    });

    it('deve aceitar atributos derivados válidos', () => {
      const attributes = new CharacterAttributes({
        st: 10,
        dx: 12,
        iq: 14,
        ht: 11,
        basicSpeed: 6.0,
        basicMove: 6,
        hitPoints: 15,
        fatiguePoints: 12
      });

      expect(attributes.basicSpeed).toBe(6.0);
      expect(attributes.basicMove).toBe(6);
      expect(attributes.hitPoints).toBe(15);
      expect(attributes.fatiguePoints).toBe(12);
    });
  });

  // ✅ Testes dos métodos auxiliares
  describe('métodos auxiliares', () => {
    const attributes1 = new CharacterAttributes({
      st: 15,
      dx: 13,
      iq: 12,
      ht: 14,
      will: 15,
      per: 16
    });

    const attributes2 = new CharacterAttributes({
      st: 15,
      dx: 13,
      iq: 12,
      ht: 14,
      will: 15,
      per: 16
    });

    const attributes3 = new CharacterAttributes({
      st: 14,
      dx: 12,
      iq: 13,
      ht: 15
    });

    it('deve identificar atributos iguais', () => {
      expect(attributes1.equals(attributes2)).toBe(true);
    });

    it('deve identificar atributos diferentes', () => {
      expect(attributes1.equals(attributes3)).toBe(false);
      expect(attributes1.equals(null as any)).toBe(false);
      expect(attributes1.equals(undefined as any)).toBe(false);
    });

    it('deve gerar representação em string correta', () => {
      const attributes = new CharacterAttributes({
        st: 15,
        dx: 13,
        iq: 12,
        ht: 14,
        magicPoints: 8
      });

      expect(attributes.toString()).toBe('Attributes{ST:15 DX:13 IQ:12 HT:14 HP:15 FP:14 MP:8}');
    });

    it('deve gerar representação sem magic points quando não definido', () => {
      const attributes = new CharacterAttributes({
        st: 10,
        dx: 12,
        iq: 14,
        ht: 11
      });

      expect(attributes.toString()).toBe('Attributes{ST:10 DX:12 IQ:14 HT:11 HP:10 FP:11}');
    });
  });

  // ✅ Testes de casos extremos
  describe('casos extremos', () => {
    it('deve aceitar atributos com valores altos', () => {
      const attributes = new CharacterAttributes({
        st: 50,
        dx: 50,
        iq: 50,
        ht: 50
      });

      expect(attributes.st).toBe(50);
      expect(attributes.dx).toBe(50);
      expect(attributes.iq).toBe(50);
      expect(attributes.ht).toBe(50);
      expect(attributes.stModifier).toBe(20);
      expect(attributes.basicSpeed).toBe(25);
    });

    it('deve aceitar atributos com valores baixos válidos', () => {
      const attributes = new CharacterAttributes({
        st: 1,
        dx: 1,
        iq: 1,
        ht: 1
      });

      expect(attributes.st).toBe(1);
      expect(attributes.dx).toBe(1);
      expect(attributes.iq).toBe(1);
      expect(attributes.ht).toBe(1);
      expect(attributes.stModifier).toBe(-5); // floor((1-10)/2) = floor(-4.5) = -5
    });
  });
});