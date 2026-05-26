import { SmsStrategy } from "../src/core/strategies/SmsStrategy";

describe("SmsStrategy", () => {
  let smsStrategy: SmsStrategy;

  beforeEach(() => {
    smsStrategy = new SmsStrategy();
  });

  describe("send", () => {
    it("should return formatted SMS message", () => {
      const result = smsStrategy.send("Venda realizada");

      expect(result).toBe("SMS enviado: Venda realizada");
    });

    it("should include the original message in the output", () => {
      const message = "Pedido #456 confirmado";
      const result = smsStrategy.send(message);

      expect(result).toContain(message);
    });

    it("should start with 'SMS enviado:'", () => {
      const result = smsStrategy.send("qualquer mensagem");

      expect(result).toMatch(/^SMS enviado:/);
    });

    it("should handle empty message", () => {
      const result = smsStrategy.send("");

      expect(result).toBe("SMS enviado: ");
    });
  });
});
