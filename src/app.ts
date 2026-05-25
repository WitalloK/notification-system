import { EventManager } from "./core/events/EventManager";
import { EventTypes } from "./core/events/EventTypes";
import { EmailObserver } from "./core/observers/EmailObserver";
import { EmailStrategy } from "./core/strategies/EmailStrategy";
import { NotificationService } from "./services/NotificationService";

export function app(): void {
  const eventManager = new EventManager();

  const emailStrategy = new EmailStrategy();

  const emailObserver = new EmailObserver(emailStrategy);

  eventManager.subscribe(emailObserver);

  const saleData = {
    id: 1,
    customer: "Lila Baka",
    total: 67.89,
  };

  eventManager.notify(EventTypes.SALE_CREATED, saleData);

  const notificationService = new NotificationService(emailStrategy);

  const result = notificationService.notify(
    "Venda realizada com sucesso."
  );

  console.log(result);
}