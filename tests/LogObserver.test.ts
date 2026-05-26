import { LogObserver } from "../src/core/observers/LogObserver";
import { NotificationStrategy } from "../src/core/strategies/NotificationStrategy";
import { EventTypes } from "../src/core/events/EventTypes";

describe("LogObserver", () => {
  let mockStrategy: jest.Mocked<NotificationStrategy>;
  let logObserver: LogObserver;

  beforeEach(() => {
    mockStrategy = {
      send: jest.fn().mockReturnValue("Log registrado: mensagem"),
    };
    logObserver = new LogObserver(mockStrategy);
  });

  describe("update", () => {
    it("should call strategy.send with the formatted message", () => {
      const saleData = { id: 3, customer: "Pedro", total: 200 };

      logObserver.update(EventTypes.SALE_CREATED, saleData);

      expect(mockStrategy.send).toHaveBeenCalledTimes(1);

      const expectedMessage = `Evento recebido: ${EventTypes.SALE_CREATED}. Dados: ${JSON.stringify(saleData)}`;
      expect(mockStrategy.send).toHaveBeenCalledWith(expectedMessage);
    });

    it("should handle different event types", () => {
      logObserver.update("ERROR_OCCURRED", { code: 500 });

      const expectedMessage = `Evento recebido: ERROR_OCCURRED. Dados: ${JSON.stringify({ code: 500 })}`;
      expect(mockStrategy.send).toHaveBeenCalledWith(expectedMessage);
    });

    it("should handle null data", () => {
      logObserver.update(EventTypes.SALE_CREATED, null);

      const expectedMessage = `Evento recebido: ${EventTypes.SALE_CREATED}. Dados: null`;
      expect(mockStrategy.send).toHaveBeenCalledWith(expectedMessage);
    });

    it("should log the result from the strategy", () => {
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      mockStrategy.send.mockReturnValue("Log registrado: teste");
      logObserver.update(EventTypes.SALE_CREATED, {});

      expect(consoleSpy).toHaveBeenCalledWith("Log registrado: teste");

      consoleSpy.mockRestore();
    });
  });
});
