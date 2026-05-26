import { EventManager } from "../src/core/events/EventManager";
import { Observer } from "../src/core/observers/Observer";
import { EventTypes } from "../src/core/events/EventTypes";

describe("EventManager", () => {
  let eventManager: EventManager;

  beforeEach(() => {
    eventManager = new EventManager();
  });

  describe("subscribe", () => {
    it("should add an observer", () => {
      const observer: Observer = { update: jest.fn() };

      eventManager.subscribe(observer);

      expect(eventManager.getObserversCount()).toBe(1);
    });

    it("should add multiple observers", () => {
      const observer1: Observer = { update: jest.fn() };
      const observer2: Observer = { update: jest.fn() };

      eventManager.subscribe(observer1);
      eventManager.subscribe(observer2);

      expect(eventManager.getObserversCount()).toBe(2);
    });
  });

  describe("unsubscribe", () => {
    it("should remove a subscribed observer", () => {
      const observer: Observer = { update: jest.fn() };

      eventManager.subscribe(observer);
      eventManager.unsubscribe(observer);

      expect(eventManager.getObserversCount()).toBe(0);
    });

    it("should only remove the specified observer", () => {
      const observer1: Observer = { update: jest.fn() };
      const observer2: Observer = { update: jest.fn() };

      eventManager.subscribe(observer1);
      eventManager.subscribe(observer2);
      eventManager.unsubscribe(observer1);

      expect(eventManager.getObserversCount()).toBe(1);
    });

    it("should do nothing when removing an observer that was not subscribed", () => {
      const observer1: Observer = { update: jest.fn() };
      const observer2: Observer = { update: jest.fn() };

      eventManager.subscribe(observer1);
      eventManager.unsubscribe(observer2);

      expect(eventManager.getObserversCount()).toBe(1);
    });
  });

  describe("notify", () => {
    it("should call update on all subscribed observers", () => {
      const observer1: Observer = { update: jest.fn() };
      const observer2: Observer = { update: jest.fn() };

      eventManager.subscribe(observer1);
      eventManager.subscribe(observer2);

      const saleData = { id: 1, customer: "João", total: 100 };
      eventManager.notify(EventTypes.SALE_CREATED, saleData);

      expect(observer1.update).toHaveBeenCalledWith(EventTypes.SALE_CREATED, saleData);
      expect(observer2.update).toHaveBeenCalledWith(EventTypes.SALE_CREATED, saleData);
    });

    it("should call update exactly once per observer", () => {
      const observer: Observer = { update: jest.fn() };

      eventManager.subscribe(observer);
      eventManager.notify(EventTypes.SALE_CREATED, {});

      expect(observer.update).toHaveBeenCalledTimes(1);
    });

    it("should not call update on unsubscribed observers", () => {
      const observer: Observer = { update: jest.fn() };

      eventManager.subscribe(observer);
      eventManager.unsubscribe(observer);
      eventManager.notify(EventTypes.SALE_CREATED, {});

      expect(observer.update).not.toHaveBeenCalled();
    });

    it("should not throw when notifying with no observers", () => {
      expect(() => {
        eventManager.notify(EventTypes.SALE_CREATED, {});
      }).not.toThrow();
    });
  });

  describe("getObserversCount", () => {
    it("should return 0 when no observers are subscribed", () => {
      expect(eventManager.getObserversCount()).toBe(0);
    });

    it("should return correct count after subscribing and unsubscribing", () => {
      const observer1: Observer = { update: jest.fn() };
      const observer2: Observer = { update: jest.fn() };

      eventManager.subscribe(observer1);
      eventManager.subscribe(observer2);
      expect(eventManager.getObserversCount()).toBe(2);

      eventManager.unsubscribe(observer1);
      expect(eventManager.getObserversCount()).toBe(1);
    });
  });
});
