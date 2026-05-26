import { EventManager } from "./core/events/EventManager";
import { EventTypes } from "./core/events/EventTypes";
import { EmailObserver } from "./core/observers/EmailObserver";
import { EmailStrategy } from "./core/strategies/EmailStrategy";
import { SmsStrategy } from "./core/strategies/SmsStrategy";
import { LogStrategy } from "./core/strategies/LogStrategy";
import { NotificationService } from "./services/NotificationService";

export function app(): void {
  const emailStrategy = new EmailStrategy();
  const smsStrategy = new SmsStrategy();
  const logStrategy = new LogStrategy();

  console.log("1. Disparando evento SALE_CREATED");

  const eventManager = new EventManager();

  const emailObserver = new EmailObserver(emailStrategy);
  const smsObserver = new EmailObserver(smsStrategy);
  const logObserver = new EmailObserver(logStrategy);

  eventManager.subscribe(emailObserver);
  eventManager.subscribe(smsObserver);
  eventManager.subscribe(logObserver);

  console.log(`Observers registrados: ${eventManager.getObserversCount()}`);

  const saleData = {
    id: 1,
    customer: "Lila Baka",
    total: 67.89,
  };

  eventManager.notify(EventTypes.SALE_CREATED, saleData);

  console.log("\n2. Removendo observer de SMS");

  eventManager.unsubscribe(smsObserver);
  console.log(`Observers restantes: ${eventManager.getObserversCount()}`);

  const saleData2 = {
    id: 2,
    customer: "Icro Aranha",
    total: 150.0,
  };

  eventManager.notify(EventTypes.SALE_CREATED, saleData2);

  console.log("\n3. Trocando strategy em runtime");

  const notificationService = new NotificationService(emailStrategy);
  console.log(
    `Strategy atual: ${notificationService.getCurrentStrategyName()}`,
  );
  console.log(notificationService.notify("Pedido #1 confirmado."));

  notificationService.changeStrategy(smsStrategy);
  console.log(
    `\nStrategy atual: ${notificationService.getCurrentStrategyName()}`,
  );
  console.log(notificationService.notify("Pedido #1 confirmado."));

  notificationService.changeStrategy(logStrategy);
  console.log(
    `\nStrategy atual: ${notificationService.getCurrentStrategyName()}`,
  );
  console.log(notificationService.notify("Pedido #1 confirmado."));
}
