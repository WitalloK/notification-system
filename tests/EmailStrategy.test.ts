import { EmailStrategy } from "../src/core/strategies/EmailStrategy";

describe("EmailStrategy", () => {
  let emailStrategy: EmailStrategy;

  beforeEach(() => {
    emailStrategy = new EmailStrategy();
  });

  describe("send", () => {
    it("should return formatted email message", () => {
      const result = emailStrategy.send("Venda realizada");

      expect(result).toBe("Email enviado: Venda realizada");
    });

    it("should include the original message in the output", () => {
      const message = "Pedido #123 confirmado";
      const result = emailStrategy.send(message);

      expect(result).toContain(message);
    });

    it("should start with 'Email enviado:'", () => {
      const result = emailStrategy.send("qualquer mensagem");

      expect(result).toMatch(/^Email enviado:/);
    });

    it("should handle empty message", () => {
      const result = emailStrategy.send("");

      expect(result).toBe("Email enviado: ");
    });
  });
});
