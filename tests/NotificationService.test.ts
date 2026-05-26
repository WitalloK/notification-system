import { NotificationService } from "../src/services/NotificationService";
import { NotificationStrategy } from "../src/core/strategies/NotificationStrategy";
import { EmailStrategy } from "../src/core/strategies/EmailStrategy";

describe("NotificationService", () => {
  let mockStrategy: jest.Mocked<NotificationStrategy>;
  let service: NotificationService;

  beforeEach(() => {
    mockStrategy = {
      send: jest.fn().mockReturnValue("enviado"),
    };
    service = new NotificationService(mockStrategy);
  });

  describe("notify", () => {
    it("should delegate to the strategy's send method", () => {
      service.notify("Teste de notificação");

      expect(mockStrategy.send).toHaveBeenCalledWith("Teste de notificação");
    });

    it("should return the result from the strategy", () => {
      mockStrategy.send.mockReturnValue("Email enviado: Teste");

      const result = service.notify("Teste");

      expect(result).toBe("Email enviado: Teste");
    });

    it("should call strategy exactly once per notify call", () => {
      service.notify("msg1");
      service.notify("msg2");

      expect(mockStrategy.send).toHaveBeenCalledTimes(2);
    });
  });

  describe("changeStrategy", () => {
    it("should change the active strategy", () => {
      const newStrategy: jest.Mocked<NotificationStrategy> = {
        send: jest.fn().mockReturnValue("SMS enviado: teste"),
      };

      service.changeStrategy(newStrategy);
      service.notify("teste");

      expect(newStrategy.send).toHaveBeenCalledWith("teste");
      expect(mockStrategy.send).not.toHaveBeenCalled();
    });

    it("should use the new strategy after change", () => {
      const emailStrategy = new EmailStrategy();

      service.changeStrategy(emailStrategy);
      const result = service.notify("Olá");

      expect(result).toBe("Email enviado: Olá");
    });
  });

  describe("getCurrentStrategyName", () => {
    it("should return the class name of the current strategy", () => {
      const emailStrategy = new EmailStrategy();
      const emailService = new NotificationService(emailStrategy);

      expect(emailService.getCurrentStrategyName()).toBe("EmailStrategy");
    });

    it("should return updated name after changing strategy", () => {
      const emailStrategy = new EmailStrategy();

      service.changeStrategy(emailStrategy);

      expect(service.getCurrentStrategyName()).toBe("EmailStrategy");
    });
  });
});
