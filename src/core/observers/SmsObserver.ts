import { Observer } from "./Observer";
import { NotificationStrategy } from "../strategies/NotificationStrategy";

export class SmsObserver implements Observer {
  constructor(private readonly notificationStrategy: NotificationStrategy) {}

  update(event: string, data: unknown): void {
    const message = this.createMessage(event, data);

    const result = this.notificationStrategy.send(message);

    console.log(result);
  }

  private createMessage(event: string, data: unknown): string {
    return `Evento recebido: ${event}. Dados: ${JSON.stringify(data)}`;
  }
}
