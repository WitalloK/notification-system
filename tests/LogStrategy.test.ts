import { LogStrategy } from "../src/core/strategies/LogStrategy";

describe("LogStrategy", () => {
  let logStrategy: LogStrategy;

  beforeEach(() => {
    logStrategy = new LogStrategy();
  });

  describe("send", () => {
    it("should return formatted log message", () => {
      const result = logStrategy.send("Venda realizada");

      expect(result).toBe("Log registrado: Venda realizada");
    });

    it("should include the original message in the output", () => {
      const message = "Erro no processamento";
      const result = logStrategy.send(message);

      expect(result).toContain(message);
    });

    it("should start with 'Log registrado:'", () => {
      const result = logStrategy.send("qualquer mensagem");

      expect(result).toMatch(/^Log registrado:/);
    });

    it("should handle empty message", () => {
      const result = logStrategy.send("");

      expect(result).toBe("Log registrado: ");
    });
  });
});
