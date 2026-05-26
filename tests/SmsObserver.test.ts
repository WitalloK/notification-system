import { SmsObserver } from "../src/core/observers/SmsObserver";
import { NotificationStrategy } from "../src/core/strategies/NotificationStrategy";
import { EventTypes } from "../src/core/events/EventTypes";

describe("SmsObserver", () => {
  let mockStrategy: jest.Mocked<NotificationStrategy>;
  let smsObserver: SmsObserver;

  beforeEach(() => {
    mockStrategy = {
      send: jest.fn().mockReturnValue("SMS enviado: mensagem"),
    };
    smsObserver = new SmsObserver(mockStrategy);
  });

  describe("update", () => {
    it("should call strategy.send with the formatted message", () => {
      const saleData = { id: 1, customer: "Ana", total: 99.90 };

      smsObserver.update(EventTypes.SALE_CREATED, saleData);

      expect(mockStrategy.send).toHaveBeenCalledTimes(1);

      const expectedMessage = `Evento recebido: ${EventTypes.SALE_CREATED}. Dados: ${JSON.stringify(saleData)}`;
      expect(mockStrategy.send).toHaveBeenCalledWith(expectedMessage);
    });

    it("should handle different event types", () => {
      smsObserver.update("ORDER_SHIPPED", { orderId: 42 });

      const expectedMessage = `Evento recebido: ORDER_SHIPPED. Dados: ${JSON.stringify({ orderId: 42 })}`;
      expect(mockStrategy.send).toHaveBeenCalledWith(expectedMessage);
    });

    it("should handle null data", () => {
      smsObserver.update(EventTypes.SALE_CREATED, null);

      const expectedMessage = `Evento recebido: ${EventTypes.SALE_CREATED}. Dados: null`;
      expect(mockStrategy.send).toHaveBeenCalledWith(expectedMessage);
    });

    it("should log the result from the strategy", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      mockStrategy.send.mockReturnValue("SMS enviado: teste");
      smsObserver.update(EventTypes.SALE_CREATED, {});

      expect(consoleSpy).toHaveBeenCalledWith("SMS enviado: teste");

      consoleSpy.mockRestore();
    });
  });
});
