import { EmailObserver } from "../src/core/observers/EmailObserver";
import { NotificationStrategy } from "../src/core/strategies/NotificationStrategy";
import { EventTypes } from "../src/core/events/EventTypes";

describe("EmailObserver", () => {
  let mockStrategy: jest.Mocked<NotificationStrategy>;
  let emailObserver: EmailObserver;

  beforeEach(() => {
    mockStrategy = {
      send: jest.fn().mockReturnValue("Email enviado: mensagem"),
    };
    emailObserver = new EmailObserver(mockStrategy);
  });

  describe("update", () => {
    it("should call strategy.send with the formatted message", () => {
      const saleData = { id: 1, customer: "Maria", total: 50 };

      emailObserver.update(EventTypes.SALE_CREATED, saleData);

      expect(mockStrategy.send).toHaveBeenCalledTimes(1);

      const expectedMessage = `Evento recebido: ${EventTypes.SALE_CREATED}. Dados: ${JSON.stringify(saleData)}`;
      expect(mockStrategy.send).toHaveBeenCalledWith(expectedMessage);
    });

    it("should handle different event types", () => {
      emailObserver.update("CUSTOM_EVENT", { key: "value" });

      const expectedMessage = `Evento recebido: CUSTOM_EVENT. Dados: ${JSON.stringify({ key: "value" })}`;
      expect(mockStrategy.send).toHaveBeenCalledWith(expectedMessage);
    });

    it("should handle null data", () => {
      emailObserver.update(EventTypes.SALE_CREATED, null);

      const expectedMessage = `Evento recebido: ${EventTypes.SALE_CREATED}. Dados: null`;
      expect(mockStrategy.send).toHaveBeenCalledWith(expectedMessage);
    });

    it("should log the result from the strategy", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      mockStrategy.send.mockReturnValue("Email enviado: teste");
      emailObserver.update(EventTypes.SALE_CREATED, {});

      expect(consoleSpy).toHaveBeenCalledWith("Email enviado: teste");

      consoleSpy.mockRestore();
    });
  });
});
